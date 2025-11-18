import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10 flex-shrink-0">
      <Image
        src={logo}
        alt="The Wild Oasis logo"
        quality={100}
        className="w-10 h-10 sm:w-[60px] sm:h-[60px]"
      />
      <span className="hidden sm:inline text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
