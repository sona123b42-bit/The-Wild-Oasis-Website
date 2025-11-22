import Image from "next/image";
import TextExpander from "@/app/_components/TextExpander";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";

function Cabin({ cabin }) {
  const { name, maxCapacity, image, description } = cabin;

  return (
    <div className="max-w-7xl mx-auto border border-primary-800 py-10 px-4 sm:px-6 mb-24">
      <div className="grid grid-cols-1 xl:grid-cols-[3fr_4fr] gap-10 xl:gap-20">
        {/* IMAGE */}
        <div className="relative w-full aspect-[5/4] xl:aspect-auto xl:h-full xl:min-h-[380px]">
          <Image
            src={image}
            fill
            className="object-cover"
            alt={`Cabin ${name}`}
          />
        </div>

        {/* TEXT */}
        <div>
          <h3
            className="
            text-3xl sm:text-6xl font-black text-accent-100 mb-4 sm:mb-6 
            bg-primary-950 px-4 py-3 sm:px-6 sm:py-4 xl:inline-block
            xl:text-7xl xl:px-6 xl:py-4 xl:mb-6 xl:translate-x-[-30px] xl:w-[150%] translate-x-[-15px]
          "
          >
            Cabin {name}
          </h3>

          <TextExpander className="text-base sm:text-lg text-primary-300 mb-6 sm:mb-10">
            {description || ""}
          </TextExpander>

          <ul className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-7 mt-6">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <span className="text-sm sm:text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>
                guests
              </span>
            </li>

            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-sm sm:text-lg">
                Located in the heart of the
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>

            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600" />
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

export default Cabin;
