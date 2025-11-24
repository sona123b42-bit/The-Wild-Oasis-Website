import supabase from "@/app/_lib/supabase";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { token, password } = await req.json();

  console.log("BACKEND RECEIVED password:", password);

  if (!password) {
    return Response.json({ error: "Password is missing" }, { status: 400 });
  }

  // 1. Get token row
  const { data: tokenRow, error: tokenError } = await supabase
    .from("password_reset_tokens")
    .select("*")
    .eq("token", token)
    .single();

  if (!tokenRow) {
    return Response.json(
      { error: "Invalid or expired token" },
      { status: 400 }
    );
  }

  // 2. Validate expiration
  if (new Date(tokenRow.expires_at) < new Date()) {
    return Response.json({ error: "Token expired" }, { status: 400 });
  }

  // 3. Hash new password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 4. Update user’s password
  const { error: updateError } = await supabase
    .from("guests")
    .update({ password: hashedPassword })
    .eq("email", tokenRow.email);

  if (updateError) {
    console.log("UPDATE FAILED:", updateError);
    return Response.json(
      { error: "Failed to update password" },
      { status: 500 }
    );
  }

  // 5. Delete the used token
  await supabase.from("password_reset_tokens").delete().eq("token", token);

  return Response.json({ success: true });
}
