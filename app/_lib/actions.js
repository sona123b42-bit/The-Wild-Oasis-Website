"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import supabase from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";

export async function googleSignIn() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
export async function updateProfile(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");
  const updateData = {
    nationality,
    countryFlag,
    nationalID,
  };
  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  revalidatePath("/account/profile");
}
export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.include(bookingId))
    throw new Error("Not authorized to delete this booking");
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(
      "❌ Supabase delete error:",
      error.message,
      error.details,
      error.hint
    );
    throw error;
  }
  revalidatePath("/account/reservations");
}
export async function updateReservation(formData) {
  const bookingId = Number(formData.get("id")); // ✅ ensure bigint matches
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("Not authorized to delete this booking");

  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations").slice(0, 1000);

  const updateData = {
    numGuests: Number(numGuests), // ✅ cast to number for Supabase
    observations,
  };

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error("❌ Supabase update error:", error);
    throw new Error("Booking could not be updated");
  }
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");
  // ✅ send guest back to reservations page
  redirect("/account/reservations");
}
export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");
  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };
  const { error } = await supabase.from("bookings").insert([newBooking]);
  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

// sign up manually
export async function signUpAction(formData) {
  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const password = formData.get("password");

  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/signup`, {
    method: "POST",
    body: JSON.stringify({ fullName, email, password }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || "Signup failed");

  // Return credentials to client
  return { email, password };
}
export async function UpdateInfo(formData) {
  const session = await auth();
  if (!session) throw new Error("User not authenticated");

  const userId = session.user.guestId;
  const fullName = formData.get("fullName");
  const photoFile = formData.get("photo");

  let updateData = {};

  // UPDATE NAME
  if (fullName && fullName.trim().length > 0) {
    updateData.fullName = fullName;
  }

  // UPDATE PHOTO
  if (photoFile && photoFile.size > 0) {
    const fileName = `avatar-${randomUUID()}`;

    const { error: uploadErr } = await supabase.storage
      .from("avatars")
      .upload(fileName, photoFile, { upsert: false });

    if (uploadErr) throw new Error(uploadErr.message);

    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName);

    updateData.image = urlData.publicUrl;
  }

  // UPDATE GUEST ROW
  await supabase.from("guests").update(updateData).eq("id", userId);

  // REFRESH ONLY ACCOUNT PAGE
  revalidatePath("/account");

  redirect("/account");
}
