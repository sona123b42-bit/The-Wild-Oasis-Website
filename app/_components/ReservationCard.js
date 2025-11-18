import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";

import Image from "next/image";
import Link from "next/link";
import DeleteReservation from "./DeleteReservation";
export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

function ReservationCard({ booking, onDelete }) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    cabins: { name, image },
  } = booking;

  return (
    <div className="flex flex-col sm:flex-row border border-primary-800">
      {/* ⭐ IMAGE */}
      <div className="relative h-40 sm:h-32 w-full sm:w-auto aspect-square sm:aspect-square">
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          className="object-cover border-b sm:border-b-0 sm:border-r border-primary-800"
        />
      </div>

      {/* ⭐ CONTENT + MOBILE BUTTONS */}
      <div className="flex flex-col flex-grow px-4 py-3 sm:px-6 sm:py-4 gap-2">
        {/* TOP ROW */}
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-xl font-semibold">
            {numNights} nights in Cabin {name}
          </h3>

          {isPast(new Date(startDate)) ? (
            <span className="bg-yellow-800 text-yellow-200 h-6 px-2 sm:h-7 sm:px-3 uppercase text-[10px] sm:text-xs font-bold flex items-center rounded-sm">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 h-6 px-2 sm:h-7 sm:px-3 uppercase text-[10px] sm:text-xs font-bold flex items-center rounded-sm">
              upcoming
            </span>
          )}
        </div>

        {/* DATE */}
        <p className="text-sm sm:text-lg text-primary-300 leading-snug">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) — {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        {/* PRICE + GUESTS */}
        <div className="flex flex-wrap gap-3 sm:gap-5 mt-auto items-baseline">
          <p className="text-lg sm:text-xl font-semibold text-accent-400">
            ${totalPrice}
          </p>
          <p className="text-primary-300 text-sm sm:text-base">•</p>

          <p className="text-sm sm:text-lg text-primary-300">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>

          <p className="ml-auto text-xs sm:text-sm text-primary-400 whitespace-nowrap">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>

        {/* ⭐ MOBILE BUTTONS */}
        {!isPast(new Date(startDate)) && (
          <div className="sm:hidden grid grid-cols-2 h-[42px] border-t border-primary-800 mt-3">
            <Link
              href={`/account/reservations/edit/${id}`}
              className="flex items-center justify-center gap-2 uppercase text-[11px] font-bold text-primary-300 border-r border-primary-800 hover:bg-accent-600 hover:text-primary-900 transition-colors py-1"
            >
              <PencilSquareIcon className="h-5 w-5" />
              <span className="text-[12px] leading-none translate-y-[3px]">
                Edit
              </span>
            </Link>

            {/* FORCE CENTER FIX */}
            <div className="flex items-center justify-center">
              <DeleteReservation
                bookingId={Number(id)}
                onDelete={onDelete}
                className="uppercase text-[10px] font-bold hover:bg-red-700 hover:text-white transition-colors py-1"
              />
            </div>
          </div>
        )}
      </div>

      {/* ⭐ DESKTOP BUTTONS (right side) */}
      <div className="hidden sm:flex flex-col border-l border-primary-800 w-[100px]">
        {!isPast(new Date(startDate)) && (
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
            >
              <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800" />
              <span>Edit</span>
            </Link>

            {/* Desktop fix: make it grow equally */}
            <DeleteReservation
              bookingId={Number(id)}
              onDelete={onDelete}
              className="flex-grow"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default ReservationCard;
