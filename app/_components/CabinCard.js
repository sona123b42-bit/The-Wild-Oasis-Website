import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
function CabinCard({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="flex border-primary-800 border flex-col sm:flex-row">
      {/* IMAGE */}
      <div className="relative w-full sm:flex-1 h-[200px] sm:h-auto">
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          className="object-cover border-b sm:border-b-0 sm:border-r border-primary-800"
        />
      </div>

      {/* CONTENT */}
      <div className="flex-grow">
        <div className="pt-4 pb-3 px-4 sm:pt-5 sm:pb-4 sm:px-7 bg-primary-950">
          <h3 className="text-accent-500 font-semibold text-lg sm:text-2xl mb-2 sm:mb-3">
            Cabin {name}
          </h3>

          <div className="flex gap-2 sm:gap-3 items-center mb-1 sm:mb-2">
            <UsersIcon className="h-3 w-3 sm:h-5 sm:w-5 text-primary-600" />
            <p className="text-xs sm:text-lg text-primary-200">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex gap-2 sm:gap-3 justify-end items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-lg sm:text-3xl font-[350]">
                  ${regularPrice - discount}
                </span>
                <span className="line-through text-xs sm:text-base font-semibold text-primary-600">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-lg sm:text-3xl font-[350]">
                ${regularPrice}
              </span>
            )}
            <span className="text-primary-200 text-xs sm:text-base">
              / night
            </span>
          </p>
        </div>

        <div className="bg-primary-950 border-t border-primary-800 text-right">
          <a
            href={`/cabins/${id}`}
            className="border-l border-primary-800 py-3 px-4 sm:py-4 sm:px-6 inline-block hover:bg-accent-600 transition-all hover:text-primary-900 text-sm sm:text-base"
          >
            Details & reservation &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
