"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import { createBooking } from "../_lib/actions";
import Button from "./Button";

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();
  // CHANGE
  const { maxCapacity, regularPrice, discount, id } = cabin;
  const startDate = range.from;
  const endDate = range.to;
  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);
  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };
  const createBookingWithDate = createBooking.bind(null, bookingData);
  return (
    <div className="scale-[1.01]">
      {/* TOP BAR */}
      <div className="bg-primary-800 text-primary-300 px-6 sm:px-16 py-2 flex justify-between items-center">
        <p className="text-sm sm:text-base">Logged in as</p>

        <div className="flex gap-2 sm:gap-4 items-center">
          <img
            referrerPolicy="no-referrer"
            className="h-6 sm:h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p className="text-sm sm:text-base">{user.name}</p>
        </div>
      </div>

      {/* FORM */}
      <form
        className="bg-primary-900 py-6 sm:py-10 px-6 sm:px-16 text-base sm:text-lg flex flex-col gap-4 sm:gap-5"
        action={async (formData) => {
          await createBookingWithDate(formData);
          resetRange();
        }}
      >
        {/* NUM GUESTS */}
        <div className="space-y-1 sm:space-y-2">
          <label htmlFor="numGuests" className="text-sm sm:text-base">
            How many guests?
          </label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-4 py-2 sm:px-5 sm:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm text-sm sm:text-base"
            required
          >
            <option value="">Select number of guests...</option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        {/* OBSERVATIONS */}
        <div className="space-y-1 sm:space-y-2">
          <label htmlFor="observations" className="text-sm sm:text-base">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-4 py-2 sm:px-5 sm:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm text-sm sm:text-base"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        {/* BUTTON */}
        <div className="flex justify-end items-center gap-4 sm:gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-xs sm:text-base">
              Start by selecting dates
            </p>
          ) : (
            <Button pendingLabel="Reserving..." size="small">
              Reserve now
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
