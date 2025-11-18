import Image from "next/image";
import TextExpander from "./TextExpander";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
export default function Cabin({ cabin }) {
  const { id, regularPrice, discount, image, name, description, maxCapacity } =
    cabin;
  return (
    <div className="max-w-7xl mx-auto border border-primary-800 py-6 px-3 sm:px-6 mb-24">
      <div className="grid grid-cols-1 xl:grid-cols-[3fr_4fr] gap-10 xl:gap-20">
        {/* IMAGE */}
        <div className="relative w-full h-[260px] xl:h-auto xl:aspect-[4/3]">
          <Image
            fill
            src={image}
            className="object-cover"
            alt={`Cabin ${name}`}
          />
        </div>

        {/* TEXT */}
        <div>
          <h3 className="text-3xl sm:text-6xl font-black text-accent-100 mb-4 sm:mb-6 bg-primary-950 px-4 py-3 sm:px-6 sm:py-4 inline-block">
            Cabin {name}
          </h3>

          <p className="text-base sm:text-lg text-primary-300 mb-6 sm:mb-10">
            <TextExpander>{description}</TextExpander>
          </p>

          <ul className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-7">
            <li className="flex gap-2 sm:gap-3 items-center">
              <UsersIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600" />
              <span className="text-sm sm:text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                guests
              </span>
            </li>

            <li className="flex gap-2 sm:gap-3 items-center">
              <MapPinIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600" />
              <span className="text-sm sm:text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>

            <li className="flex gap-2 sm:gap-3 items-center">
              <EyeSlashIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600" />
              <span className="text-sm sm:text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
