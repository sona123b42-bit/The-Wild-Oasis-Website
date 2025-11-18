"use client";

export default function Hamburger({ isOpen, toggle }) {
  return (
    <button
      onClick={toggle}
      aria-label="Menu"
      className="xl:hidden w-6 h-6 relative bg-transparent border-0 p-0 m-0 cursor-pointer"
    >
      <span
        className={`absolute left-0 top-0 w-full h-[3px] rounded-lg transition-all duration-300 ${
          isOpen
            ? "bg-primary-200 rotate-45 translate-y-[9px] translate-x-[3px]"
            : "bg-primary-100"
        }`}
      ></span>

      <span
        className={`absolute left-0 top-[9px] w-full h-[3px] rounded-lg transition-all duration-300 ${
          isOpen ? "opacity-0" : "opacity-100 bg-primary-100"
        }`}
      ></span>

      <span
        className={`absolute left-0 top-[18px] w-full h-[3px] rounded-lg transition-all duration-300 ${
          isOpen
            ? "bg-primary-200 -rotate-45 -translate-y-[9px] translate-x-[4px]"
            : "bg-primary-100"
        }`}
      ></span>
    </button>
  );
}
