"use client";
import SideNavigation from "../_components/SideNavigation";
import Hamburger from "../_components/Hamburgur";
import { useState } from "react";
export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="xl:hidden relative h-full flex flex-col">
        <div className="flex items-center gap-4 px-4 py-4 border-b border-primary-900">
          <Hamburger isOpen={open} toggle={() => setOpen(!open)} />
          <div className="w-px h-6 bg-primary-900"></div>
          <p className="text-primary-200 font-semibold text-lg">Dashboard</p>
        </div>

        <div className="relative flex-1">
          <div className="py-4 px-4">{children}</div>

          <div
            className={`absolute top-0 left-0 h-full w-64 bg-primary-950 border-r border-primary-900 shadow-xl z-30 transform transition-transform duration-300 ${
              open ? "translate-x-0" : "-translate-x-[125%]"
            }`}
          >
            <SideNavigation closeNav={() => setOpen(false)} />
          </div>

          {open && (
            <div
              className="absolute inset-0 bg-black/40 z-20"
              onClick={() => setOpen(false)}
            />
          )}
        </div>
      </div>
    </>
  );
}
