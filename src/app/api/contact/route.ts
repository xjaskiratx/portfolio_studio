import { Resend } from "resend";
import { ContactEmail } from "@/components/emails/ContactEmail";
import { NextResponse } from "next/server";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: Request) {
  try {
    if (!resend) {
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const body = await req.json();
    const { name, email, selectedOpt, project } = body;

    // Basic Validation
    if (!name || !email || !selectedOpt || !project) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "JSX W&D Portfolio <onboarding@resend.dev>", // Replace with verified domain for production
      to: ["hello@jsxwd.com"],
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

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
