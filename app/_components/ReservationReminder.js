"use client";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { useReservation } from "./ReservationContext";

function ReservationReminder() {
  const { range, resetRange } = useReservation();

  if (!range.from || !range.to) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full py-6 px-4 bg-accent-500 text-primary-800 font-semibold shadow-[0_-4px_20px_rgba(0,0,0,0.25)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <button
        className="rounded-full p-2 hover:bg-accent-600 transition-all sm:order-2 self-end sm:self-auto"
        onClick={resetRange}
      >
        <XMarkIcon className="h-6 w-6" />
      </button>

      <div className="text-center leading-tight sm:order-1 flex-1">
        <p>
          <span>👋</span> Don&apos;t forget to reserve your dates
        </p>
        <p>
          from {format(new Date(range.from), "MMM dd yyyy")} to{" "}
          {format(new Date(range.to), "MMM dd yyyy")}
        </p>
      </div>
    </div>
  );
}

export default ReservationReminder;
