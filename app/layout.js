import Header from "./_components/Header";
import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ReservationProvider } from "./_components/ReservationContext";

import { auth } from "./_lib/auth";
import ClientLayout from "./_components/ClientLayout";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});
export const metadata = {
  title: {
    template: "The Wild Oasis | %s",
    default: "The Wild Oasis",
  },
  description:
    "Luxurious Cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};
export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col`}
      >
        <ClientLayout session={session}>{children}</ClientLayout>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "#fff",
              color: "#374151",
            },
          }}
        />
      </body>
    </html>
  );
}
