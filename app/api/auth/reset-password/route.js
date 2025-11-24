import supabase from "@/app/_lib/supabase";
import { hash } from "bcryptjs";

export async function POST(req) {
  const { token, password } = await req.json();

  // 1. Find matching token
  const { data: tokenRow } = await supabase
    .from("password_reset_tokens")
    .select("*")
    .eq("token", token)
    .single();

  if (!tokenRow)
    return Response.json(
      { error: "Invalid or expired token" },
      { status: 400 }
    );

  // 2. Check expiration
  if (new Date(tokenRow.expires_at) < new Date())
    return Response.json({ error: "Token expired" }, { status: 400 });

  // 3. Hash new password
  const hashed = await hash(password, 10);

  // 4. Update guest's password
  await supabase
    .from("guests")
    .update({ password: hashed })
    .eq("email", tokenRow.email);

  // 5. Delete used token
  await supabase.from("password_reset_tokens").delete().eq("token", token);

  return Response.json({ success: true });
}
