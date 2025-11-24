import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendEmail({ to, subject, html }) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  });
}

export async function sendResetEmail(to, resetUrl) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Reset your password - The Wild Oasis",
    html: `
      <h2>Reset Password</h2>
      <p>Click the button below to reset your password:</p>
      <a href="${resetUrl}" style="
        display:inline-block;
        padding: 12px 20px;
        background:#16a34a;
        color:white;
        text-decoration:none;
        border-radius:6px;
      ">Reset Password</a>
      <p>This link expires in 15 minutes.</p>
    `,
  });
}
