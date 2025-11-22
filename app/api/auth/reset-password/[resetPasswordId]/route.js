import supabase from "@/app/_lib/supabase";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { token, newPassword } = await req.json();

  // 1. Verify token
  const { data: record } = await supabase
    .from("password_reset_tokens")
    .select("*")
    .eq("token", token)
    .single();

  if (!record)
    return Response.json(
      { error: "Invalid or expired token" },
      { status: 400 }
    );

  if (record.expires_at < new Date())
    return Response.json({ error: "Token expired" }, { status: 400 });

  // 2. Hash new password
  const hashed = await bcrypt.hash(newPassword, 10);

  // 3. Update guest password
  await supabase
    .from("guests")
    .update({ password: hashed })
    .eq("email", record.email);

  // 4. Delete token
  await supabase.from("password_reset_tokens").delete().eq("token", token);

  return Response.json({ success: true });
}
