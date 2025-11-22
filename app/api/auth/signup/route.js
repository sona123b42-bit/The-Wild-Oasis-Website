import bcrypt from "bcryptjs";
import { createGuest, getGuest } from "@/app/_lib/data-service";
export async function POST(req) {
  try {
    const { fullName, email, password } = await req.json();

    if (!fullName || !email || !password) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // check if guest already exists
    const existing = await getGuest(email);
    if (existing) {
      return Response.json(
        { error: "Guest already exists. Try logging in." },
        { status: 400 }
      );
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create guest using your existing logic
    const guest = await createGuest({
      fullName,
      email,
      password: hashedPassword,
    });

    return Response.json({ success: true, guest });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
