"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "./Header";
import { ReservationProvider } from "./ReservationContext";

export default function ClientLayout({ session, children }) {
  const router = useRouter();

  const rawPathname = usePathname() || "";
  const pathname = rawPathname.toLowerCase();

  const authRoutes = ["/login", "/signup", "/forgotpassword", "/resetpassword"];

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  useEffect(() => {
    // ⛔ session is ALWAYS truthy
    // ⭕ session.user is ONLY truthy when logged in
    if (session?.user && isAuthRoute) {
      router.replace("/");
    }
  }, [session, pathname, isAuthRoute, router]);

  const hideHeader = isAuthRoute;

  return (
    <>
      {!hideHeader && <Header session={session} />}

      <div className="flex-1 px-2 py-4 sm:px-8 sm:py-12 grid">
        <main className="max-w-7xl mx-auto w-full">
          <ReservationProvider>{children}</ReservationProvider>
        </main>
      </div>
    </>
  );
}
