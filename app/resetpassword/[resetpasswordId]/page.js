"use client";
import { useState } from "react";
export default function Page({ params }) {
  const token = params.resetPasswordId;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Check match
  const isMatch = confirmPassword === password && confirmPassword !== "";
  async function handleSubmit(e) {
    e.preventDefault();

    if (!isMatch) return;

    await fetch("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, newPassword: password }),
    });
  }
  return (
    <div className="mx-auto max-w-[45rem] bg-primary-700 shadow-xl shadow-black/10 p-12 rounded-md mt-20">
      <h2 className="text-center text-[2.4rem] mb-8 font-bold text-accent-500">
        Please reset your password
      </h2>

      <form onSubmit={handleSubmit}>
        {/* PASSWORD */}
        <div className="mb-10">
          <label className="block text-[1.6rem] font-bold mb-3">Password</label>
          <input
            name="newPassword"
            type="password"
            placeholder="••••••••"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full bg-[#f2f2f2] text-gray-900 text-[1.5rem]
              px-7 py-5 rounded-md border-transparent border-t-[3px] border-b-[3px]
              focus:outline-none focus:border-b-[#55c57a] transition-all"
          />
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="mb-10">
          <label className="block text-[1.6rem] font-bold mb-3">
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`block w-full bg-[#f2f2f2] text-gray-900 text-[1.5rem]
              px-7 py-5 rounded-md border-transparent border-t-[3px] border-b-[3px]
              focus:outline-none transition-all

              ${
                confirmPassword === ""
                  ? "border-b-gray-300"
                  : isMatch
                  ? "border-b-[#55c57a]"
                  : "border-b-[#ff7730]"
              }
            `}
          />
        </div>

        <button
          disabled={!isMatch}
          className={`w-full py-4 text-[1.6rem] rounded-md transition
            ${
              isMatch
                ? "bg-accent-500 text-white hover:bg-accent-600"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }
          `}
        >
          Reset password
        </button>
      </form>
    </div>
  );
}
