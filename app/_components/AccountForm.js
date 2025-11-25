"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Button from "./Button";
import { UpdateInfo } from "../_lib/actions";
import { useSession } from "next-auth/react";

export default function AccountForm({ session }) {
  const [photoPreview, setPhotoPreview] = useState(session?.user?.image);
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    startTransition(async () => {
      // 1) UPDATE DATABASE (server action)
      const updatedUser = await UpdateInfo(formData);

      // 2) REFRESH NEXTAUTH SESSION IMMEDIATELY
      await update({
        name: updatedUser.fullName,
        image: updatedUser.image,
      });

      // 3) FORCE RELOAD ENTIRE PAGE (fresh SSR session)
      setTimeout(() => {
        window.location.reload();
      }, 50);
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-primary-900 py-8 px-12 text-lg flex flex-col gap-6"
    >
      {/* FULL NAME */}
      <div className="space-y-2">
        <label className="text-primary-200">Full name</label>
        <input
          name="fullName"
          defaultValue={session?.user?.name}
          className="w-full px-5 py-3 bg-primary-200 text-primary-800 rounded-sm shadow-sm focus:outline-none focus:border-b-2 focus:border-accent-500 transition"
        />
      </div>

      {/* EMAIL */}
      <div className="space-y-2">
        <label className="text-primary-200">Email address</label>
        <input
          disabled
          defaultValue={session?.user?.email}
          className="w-full px-5 py-3 bg-primary-200 text-primary-800 rounded-sm shadow-sm disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
        />
      </div>

      {/* PROFILE PHOTO */}
      <div className="space-y-2">
        <label className="text-primary-200">Profile photo</label>

        <div className="flex items-center gap-4">
          <Image
            src={photoPreview || "/default.jpg"}
            width={60}
            height={60}
            alt="User photo"
            className="h-16 w-16 rounded-full object-cover shadow-sm"
          />

          <div>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setPhotoPreview(URL.createObjectURL(file));
              }}
            />

            <label
              htmlFor="photo"
              className="text-accent-500 border-b border-accent-500 pb-[2px] cursor-pointer hover:text-accent-300 hover:border-accent-300 transition"
            >
              Choose new photo
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button pendingLabel="Updating" disabled={isPending}>
          Update profile
        </Button>
      </div>
    </form>
  );
}
