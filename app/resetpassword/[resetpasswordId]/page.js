"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SpinnerMini from "../_components/SpinnerMini";
export default function Page({ params }) {
  const token = params.resetPasswordId;
  const [isPending, setIsPending] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  // Check match
  const isMatch = confirmPassword === password;
  async function handleSubmit(e) {
    e.preventDefault();
    setIsPending(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      toast.success("Password changed successully!");
      router.push("/");
    } catch (err) {
      toast.error(err.message || "Signup failed");
    } finally {
      setIsPending(false);
    }
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
            name="password"
            type="password"
            placeholder="••••••••"
            required
            disabled={isPending}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full bg-[#f2f2f2] text-gray-900 text-[1.5rem] px-7 py-5 rounded-md border-transparent border-t-[3px] border-b-[3px] focus:outline-none focus:border-b-[#55c57a] focus:invalid:border-b-[#ff7730] transition-all"
          />
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="mb-10">
          <label className="block text-[1.6rem] font-bold mb-3">Password</label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            required
            disabled={isPending}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`block w-full bg-[#f2f2f2] text-gray-900 text-[1.5rem] px-7 py-5 rounded-md border-transparent border-t-[3px] border-b-[3px] transition-all ${
              confirmPassword !== "" && !isMatch ? "border-b-[#ff7730]" : ""
            } ${isMatch ? "border-b-[#55c57a]" : ""}`}
          />
        </div>

        <button className="w-full bg-accent-500 text-white py-4 text-[1.6rem] rounded-md hover:bg-accent-600 transition flex items-center justify-center">
          {!isPending ? "Reset Password" : <SpinnerMini />}
        </button>
      </form>
    </div>
  );
}
