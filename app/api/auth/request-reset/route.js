import supabase from "@/app/_lib/supabase";
import { randomUUID } from "crypto";
import { sendResetEmail } from "@/app/_lib/email";
export async function POST(req) {
  const { email } = await req.json();

  // 1. Check if guest exists
  const { data: guest } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  if (!guest)
    return Response.json({ error: "Email not found" }, { status: 400 });

  if (!guest.password)
    return Response.json(
      { error: "Account uses Google login, cannot reset password." },
      { status: 400 }
    );

  // 2. Create reset token
  const token = randomUUID();

  await supabase.from("password_reset_tokens").insert([
    {
      token,
      email,
      expires_at: new Date(Date.now() + 15 * 60 * 1000),
    },
  ]);

  // 3. Build reset URL
  const resetUrl = `${process.env.NEXTAUTH_URL}/resetpassword/${token}`;

  // ⭐ 4. Send email through Brevo
  await sendResetEmail(email, resetUrl);

  return Response.json({ success: true });
}
