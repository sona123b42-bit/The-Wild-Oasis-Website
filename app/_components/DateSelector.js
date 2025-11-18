"use client";
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ settings, cabin, bookedDates }) {
  const { range, setRange, resetRange } = useReservation();
  const { regularPrice, discount } = cabin;
  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;
  // CHANGE
  const numNights = differenceInDays(displayRange.to, displayRange.from);
  const cabinPrice = numNights * (regularPrice - discount);

  // SETTINGS
  const { miniBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between min-w-0">
      <DayPicker
        className="pt-12 place-self-center max-w-full"
        mode="range"
        onSelect={(range) => setRange(range)}
        selected={displayRange}
        min={miniBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
      />

      <div className="flex items-center justify-between px-4 sm:px-8 bg-accent-500 text-primary-800 h-[60px] sm:h-[72px]">
        <div className="flex items-baseline gap-3 sm:gap-6">
          <p className="flex gap-1 sm:gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-lg sm:text-2xl">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-primary-700 text-xs sm:text-base">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-lg sm:text-2xl">${regularPrice}</span>
            )}
            <span className="text-xs sm:text-base">/night</span>
          </p>

          {numNights ? (
            <>
              <p className="bg-accent-600 px-2 py-1 sm:px-3 sm:py-2 text-lg sm:text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>

              <p className="text-xs sm:text-base">
                <span className="font-bold uppercase">Total </span>
                <span className="text-lg sm:text-2xl font-semibold">
                  ${cabinPrice}
                </span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-1 px-3 sm:py-2 sm:px-4 text-xs sm:text-sm font-semibold"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
