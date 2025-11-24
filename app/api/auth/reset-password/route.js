import supabase from "@/app/_lib/supabase";
import bcrypt from "bcryptjs";

export async function POST(req) {
  // Get JSON body
  const { token, password } = await req.json();

  if (!token || !password) {
    console.log("❌ Missing token or password");
    return Response.json(
      { error: "Missing token or password" },
      { status: 400 }
    );
  }

  // 1. Look up token row
  const { data: tokenRow, error: tokenError } = await supabase
    .from("password_reset_tokens")
    .select("*")
    .eq("token", token)
    .single();

  console.log("TOKEN ROW:", tokenRow);
  console.log("TOKEN ERROR:", tokenError);

  if (!tokenRow) {
    console.log("❌ Token not found");
    return Response.json(
      { error: "Invalid or expired token" },
      { status: 400 }
    );
  }

  // 2. Check expiration safely (UTC)
  const expires = new Date(tokenRow.expires_at).getTime();
  const now = Date.now();
  const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

  if (now - expires > TWENTY_FOUR_HOURS) {
    console.log("❌ TOKEN EXPIRED (24hr window)");
    return Response.json({ error: "Token expired" }, { status: 400 });
  }

  // 3. Hash new password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 4. Update user's password
  console.log("Updating email:", tokenRow.email);

  const { data: updated, error: updateError } = await supabase
    .from("guests")
    .update({ password: hashedPassword })
    .eq("email", tokenRow.email);

  if (updateError) {
    console.log("❌ PASSWORD UPDATE FAILED");
    return Response.json(
      { error: "Failed to update password" },
      { status: 500 }
    );
  }

  // 5. Delete the token
  const { error: deleteError } = await supabase
    .from("password_reset_tokens")
    .delete()
    .eq("token", token);

  console.log("DELETE ERROR:", deleteError);

  if (deleteError) {
    console.log("⚠️ TOKEN DELETE FAILED (non-blocking)");
  }

  console.log("🎉 PASSWORD RESET SUCCESS");
  return Response.json({ success: true });
}
