import Link from "next/link";

export default function Navigation({ session }) {
  return (
    <nav className="z-10 text-lg sm:text-xl">
      <ul className="flex gap-6 sm:gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>

        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>

        <li>
          {session?.user ? (
            <Link
              href="/account"
              className="flex items-center gap-2 sm:gap-4 hover:text-accent-400"
            >
              <img
                src={session.user.image || "/default.jpg"}
                className="h-6 w-6 sm:h-8 sm:w-8 rounded-full object-cover"
              />
              <span className="hidden sm:inline">{session.user.name}</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="hover:text-accent-400 transition-colors"
            >
              Log in
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
