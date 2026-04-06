import { Resend } from "resend";
import { ContactEmail } from "@/components/emails/ContactEmail";
import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Simple in-memory rate limiting (1 request per 60 seconds per IP)
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_MS = 60 * 1000;

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const now = Date.now();
    const lastRequest = rateLimitMap.get(ip);

    if (lastRequest && now - lastRequest < RATE_LIMIT_MS) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute." },
        { status: 429 }
      );
    }
    rateLimitMap.set(ip, now);

    if (!resend) {
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const body = await req.json();
    const { name, email, selectedOpt, project, user_comment_id } = body;

    // 🛡️ HONEYPOT CHECK (Bot protection)
    if (user_comment_id) {
      console.warn("Honeypot triggered — rejecting bot submission.");
      return NextResponse.json({ success: true });
    }

    // Constraints to prevent payload-based DoS
    const MAX_NAME_LENGTH = 100;
    const MAX_EMAIL_LENGTH = 100;
    const MAX_PROJECT_LENGTH = 5000;

    // Basic Validation
    if (!name || !email || !selectedOpt || !project) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (name.length > MAX_NAME_LENGTH || email.length > MAX_EMAIL_LENGTH || project.length > MAX_PROJECT_LENGTH) {
      return NextResponse.json({ error: "Input too long. Please shorten your message." }, { status: 400 });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "JSX Studios Portfolio <onboarding@resend.dev>", // Replace with verified domain for production
      to: ["jaskirat06jan@gmail.com"],
      subject: `New Inquiry: ${selectedOpt} from ${name}`,
      react: ContactEmail({ 
        name, 
        email, 
        services: [selectedOpt], 
        message: project 
      }),
    });

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 400 });
    }

    // Log contact to Supabase (non-blocking — don't fail the request if this errors)
    const db = getSupabase();
    if (db) {
      const { error: dbError } = await db
        .from("contacts")
        .insert({ 
          name: name.slice(0, MAX_NAME_LENGTH), 
          email: email.slice(0, MAX_EMAIL_LENGTH), 
          type: selectedOpt, 
          message: project.slice(0, MAX_PROJECT_LENGTH) 
        } as never);
      if (dbError) console.error("Supabase log error:", dbError);
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
