"use server";
import { EmailTemplate } from "../components/emailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!); // Use the non-null assertion operator

export async function sendEmail(userEmail: string) {
  try {
    const emailContent = EmailTemplate({ firstName: "John" });

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: userEmail,
      subject: "You have a new message",
      react: emailContent,
    });

    if (error) {
      return { error: error.message };
    }

    return { data };
  } catch (error) {
    return { error: error.message };
  }
}
