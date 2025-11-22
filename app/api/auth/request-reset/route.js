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

  // If guest uses Google/Facebook → no password to reset
  if (!guest.password)
    return Response.json(
      {
        error: "This account uses Google/Facebook and cannot reset password.",
      },
      { status: 400 }
    );

  // 2. Generate token
  const token = randomUUID();

  await supabase.from("password_reset_tokens").insert([
    {
      token,
      email,
      expires_at: new Date(Date.now() + 15 * 60 * 1000), // 15 min
    },
  ]);

  // 3. Build reset link
  const resetUrl = `${process.env.NEXT_PUBLIC_URL}/reset-password/${token}`;

  // TODO: SEND EMAIL HERE
  await sendResetEmail(email, resetUrl);

  return Response.json({ success: true });
}
