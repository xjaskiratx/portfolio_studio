import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";
import * as React from "react";

interface ContactEmailProps {
  name: string;
  email: string;
  services: string[];
  message: string;
}

export const ContactEmail = ({
  name,
  email,
  services,
  message,
}: ContactEmailProps) => (
  <Html>
    <Head />
    <Preview>New Inquiry from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Project Inquiry</Heading>
        <Text style={text}>
          <strong>Client Name:</strong> {name}
        </Text>
        <Text style={text}>
          <strong>Email:</strong> {email}
        </Text>
        <Text style={text}>
          <strong>Services Requested:</strong> {services.join(", ")}
        </Text>
        <Hr style={hr} />
        <Text style={text}>
          <strong>Message:</strong>
        </Text>
        <Section style={section}>
          <Text style={messageText}>{message}</Text>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>
          JSX Studios Portfolio Form Submission
        </Text>
      </Container>
    </Body>
  </Html>
);

export default ContactEmail;

const main = {
  backgroundColor: "#060608",
  fontFamily: 'monospace',
  color: "#ede9df",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
};

const h1 = {
  color: "#c8ff00",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "30px 0",
  padding: "0",
  textTransform: "uppercase" as const,
  letterSpacing: "0.1em",
};

const text = {
  fontSize: "14px",
  lineHeight: "24px",
  margin: "16px 0",
};

const section = {
  padding: "24px",
  backgroundColor: "#111111",
  border: "1px solid #222222",
  borderRadius: "4px",
};

const messageText = {
  fontSize: "14px",
  lineHeight: "24px",
  color: "#ede9df",
  margin: "0",
};

const hr = {
  borderColor: "#222222",
  margin: "20px 0",
};

const footer = {
  color: "#666666",
  fontSize: "10px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.1em",
};
