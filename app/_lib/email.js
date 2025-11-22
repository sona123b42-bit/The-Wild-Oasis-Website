import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function sendResetEmail(to, resetUrl) {
  try {
    console.log("🟢 EMAIL FUNCTION TRIGGERED");
    console.log("→ FROM:", process.env.EMAIL_FROM);
    console.log("→ TO:", to);
    console.log("→ RESET URL:", resetUrl);

    const response = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to,
      subject: "Reset Your Wild Oasis Password",
      html: `
        <p>Hello,</p>
        <p>You requested a password reset.</p>
        <a href="${resetUrl}">Reset Password</a>
      `,
    });

    console.log("🟢 EMAIL SENT RESPONSE:", response);
    return { success: true };
  } catch (error) {
    console.error("🔴 EMAIL ERROR:", error);
    return { success: false, error };
  }
}
