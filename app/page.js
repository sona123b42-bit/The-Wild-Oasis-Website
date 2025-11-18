import photo from "@/public/bg.png";
import Image from "next/image";
import Link from "next/link";
export default function Page() {
  return (
    <main className="mt-24">
      <Image
        src={photo}
        alt="Mountains and forests with two cabins"
        fill
        className="object-cover object-top"
        placeholder="blur"
        quality={80}
      />

      <div className="relative z-10 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>

        <Link
          href="/cabins"
          className="bg-accent-500 px-6 py-4 sm:px-8 sm:py-6 text-base sm:text-lg text-primary-800 font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
