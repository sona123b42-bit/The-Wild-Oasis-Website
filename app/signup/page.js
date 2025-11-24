"use client";
import { useRouter } from "next/navigation";
import { signUpAction, googleSignIn } from "../_lib/actions";
import { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import SpinnerMini from "../_components/SpinnerMini";
export default function SignupPage() {
  const [isPending, setIsPending] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const isMatch = passwordConfirm === password && passwordConfirm !== "";
  const router = useRouter();
  async function handleSubmit(e) {
    e.preventDefault();
    setIsPending(true);

    const form = new FormData(e.target);

    try {
      // 1️⃣ Create user in DB
      const { email, password } = await signUpAction(form);

      // 2️⃣ Auto-login instantly (same as login)
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Account created but auto-login failed");
        return;
      }

      toast.success("Account created successfully!");
      router.push("/");
    } catch (err) {
      toast.error("Signup failed");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div
      className="
    mx-auto 
    w-[90%] 
    max-w-[45rem]
    bg-primary-700 
    shadow-xl shadow-black/10 
    p-6 sm:p-10 lg:p-12 
    rounded-md 
    mt-10 sm:mt-16 lg:mt-20
  "
    >
      <h2
        className="
      text-center 
      text-2xl sm:text-3xl lg:text-[2.4rem] 
      mb-6 sm:mb-8 
      font-bold 
      text-accent-500
    "
      >
        Create Account
      </h2>

      <form onSubmit={handleSubmit}>
        {/* FULL NAME */}
        <div className="mb-6 sm:mb-8">
          <label
            className="
          block 
          text-[1.2rem] sm:text-[1.4rem] lg:text-[1.6rem] 
          font-bold 
          mb-2 sm:mb-3
        "
          >
            Full Name
          </label>
          <input
            name="fullName"
            type="text"
            placeholder="Your name"
            required
            disabled={isPending}
            className="
          block w-full 
          bg-[#f2f2f2] 
          text-gray-900 
          text-[1.2rem] sm:text-[1.4rem] lg:text-[1.5rem]
          px-5 sm:px-6 lg:px-7 
          py-3 sm:py-4 lg:py-5 
          rounded-md 
          border-transparent 
          border-t-[3px] border-b-[3px] 
          focus:outline-none 
          focus:border-b-[#55c57a] 
          focus:invalid:border-b-[#ff7730] 
          transition-all
        "
          />
        </div>

        {/* EMAIL */}
        <div className="mb-6 sm:mb-8">
          <label
            className="
          block 
          text-[1.2rem] sm:text-[1.4rem] lg:text-[1.6rem] 
          font-bold 
          mb-2 sm:mb-3
        "
          >
            Email
          </label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            disabled={isPending}
            className="
          block w-full 
          bg-[#f2f2f2] 
          text-gray-900 
          text-[1.2rem] sm:text-[1.4rem] lg:text-[1.5rem]
          px-5 sm:px-6 lg:px-7 
          py-3 sm:py-4 lg:py-5 
          rounded-md 
          border-transparent 
          border-t-[3px] border-b-[3px] 
          focus:outline-none 
          focus:border-b-[#55c57a] 
          focus:invalid:border-b-[#ff7730] 
          transition-all
        "
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-6 sm:mb-8">
          <label
            className="
          block 
          text-[1.2rem] sm:text-[1.4rem] lg:text-[1.6rem]
          font-bold 
          mb-2 sm:mb-3
        "
          >
            Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            required
            disabled={isPending}
            onChange={(e) => setPassword(e.target.value)}
            className="
          block w-full 
          bg-[#f2f2f2] 
          text-gray-900 
          text-[1.2rem] sm:text-[1.4rem] lg:text-[1.5rem]
          px-5 sm:px-6 lg:px-7 
          py-3 sm:py-4 lg:py-5 
          rounded-md 
          border-transparent 
          border-t-[3px] border-b-[3px] 
          focus:outline-none 
          focus:border-b-[#55c57a] 
          focus:invalid:border-b-[#ff7730] 
          transition-all
        "
          />
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="mb-6 sm:mb-8">
          <label
            className="
          block 
          text-[1.2rem] sm:text-[1.4rem] lg:text-[1.6rem]
          font-bold 
          mb-2 sm:mb-3
        "
          >
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            required
            disabled={isPending}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className={`
          block w-full 
          bg-[#f2f2f2] 
          text-gray-900 
          text-[1.2rem] sm:text-[1.4rem] lg:text-[1.5rem]
          px-5 sm:px-6 lg:px-7 
          py-3 sm:py-4 lg:py-5 
          rounded-md 
          border-transparent 
          border-t-[3px] border-b-[3px] 
          transition-all
          ${passwordConfirm !== "" && !isMatch ? "border-b-[#ff7730]" : ""}
          ${isMatch ? "border-b-[#55c57a]" : ""}
        `}
          />
        </div>

        {/* SIGNUP BUTTON */}
        <button
          className="
        w-full 
        bg-accent-500 
        text-white 
        py-3 sm:py-4 lg:py-4
        text-[1.3rem] sm:text-[1.5rem] lg:text-[1.6rem]
        rounded-md 
        hover:bg-accent-600 
        transition 
        flex items-center justify-center
      "
        >
          {!isPending ? "Sign up" : <SpinnerMini />}
        </button>
      </form>

      {/* SWITCH TO LOG IN */}
      <p className="text-center mt-6 sm:mt-8 text-sm sm:text-[1.3rem] lg:text-[1.4rem]">
        Already have an account?
        <a href="/login" className="font-bold text-accent-500 ml-1">
          Log in
        </a>
      </p>

      {/* OR DIVIDER */}
      <div className="flex items-center my-6 sm:my-8">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-3 sm:mx-4 text-gray-400 text-sm sm:text-[1.3rem]">
          or
        </span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* GOOGLE SIGNUP */}
      <button
        onClick={() => {
          if (!isPending) googleSignIn();
        }}
        className="
      w-full 
      mt-4 sm:mt-6 
      bg-gray-800 
      text-white 
      py-3 sm:py-4 lg:py-4
      text-[1.3rem] sm:text-[1.5rem] lg:text-[1.6rem] 
      rounded-md 
      hover:bg-gray-700 
      transition 
      flex items-center justify-center 
      gap-3 sm:gap-4 lg:gap-5
    "
      >
        {!isPending ? (
          <>
            <img
              src="https://authjs.dev/img/providers/google.svg"
              alt="Google logo"
              className="w-6 h-6 sm:w-9 sm:h-9 lg:w-11 lg:h-11"
            />
            <span>Sign up with Google</span>
          </>
        ) : (
          <SpinnerMini />
        )}
      </button>
    </div>
  );
}
