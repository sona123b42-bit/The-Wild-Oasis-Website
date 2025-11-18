import { auth } from "../_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

export default async function Reservation({ cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  const sesson = await auth();
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 min-h-[350px] xl:min-h-[400px]">
      <div className="border border-primary-800">
        <DateSelector
          settings={settings}
          bookedDates={bookedDates}
          cabin={cabin}
        />
      </div>

      <div className="border border-primary-800">
        {sesson?.user ? (
          <ReservationForm cabin={cabin} user={sesson.user} />
        ) : (
          <LoginMessage />
        )}
      </div>
    </div>
  );
}
