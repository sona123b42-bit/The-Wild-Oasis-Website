import { auth } from "../_lib/auth";
import AccountForm from "../_components/AccountForm";

export const metadata = {
  title: "Guest Area",
};

export default async function AccountPage() {
  const session = await auth();

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
