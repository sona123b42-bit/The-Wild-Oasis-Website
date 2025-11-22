"use client";

import { useSession } from "next-auth/react";
import Spinner from "../_components/Spinner";
import AccountForm from "../_components/AccountForm";

export default function AccountPage() {
  const { data: session, status } = useSession();

  // While session loads → show spinner only for the form
  if (status === "loading") {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <AccountForm session={session} />
    </div>
  );
}
