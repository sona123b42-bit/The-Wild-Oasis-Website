"use client";
import { useState } from "react";
import SpinnerMini from "../_components/SpinnerMini";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function Page() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  async function handleSubmit(e) {
    e.preventDefault();
    setIsPending(true);

    const email = e.target.email.value;
    try {
      const res = await fetch("/api/auth/request-reset", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      toast.success("Reset password url has been send to your email!");
      router.push("/");
    } catch {
      toast.error("Fail to send email");
    } finally {
      setIsPending(false);
    }
  }
  return (
    <div className="mx-auto max-w-[45rem] bg-primary-700 shadow-xl shadow-black/10 p-12 rounded-md mt-20">
      <h2 className="text-center text-[2.4rem] mb-8 font-bold text-accent-500">
        Please enter your email
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-10">
          <label className="block text-[1.6rem] font-bold mb-3">Email</label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            disabled={isPending}
            className="block w-full bg-[#f2f2f2] text-gray-900 text-[1.5rem] px-7 py-5 rounded-md border-transparent border-t-[3px] border-b-[3px] focus:outline-none focus:border-b-[#55c57a] focus:invalid:border-b-[#ff7730] transition-all"
          />
        </div>

        <button className="w-full bg-accent-500 text-white py-4 text-[1.6rem] rounded-md hover:bg-accent-600 transition flex items-center justify-center">
          {!isPending ? "Enter" : <SpinnerMini />}
        </button>
      </form>
    </div>
  );
}
