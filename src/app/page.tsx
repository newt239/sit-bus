import BusBoard from "#/app/_components/bus-board";
import DateTimePicker from "#/app/_components/datetime-picker";
import Footer from "#/app/_components/footer";
import dayjs from "#/utils/dayjs";

export default async function Home() {
  const current = dayjs().tz();

  return (
    <>
      <DateTimePicker
        key={current.format()}
        date={current.format("YYYY-MM-DD")}
        time={current.format("HH:mm")}
      />
      <BusBoard datetime={current} />
      <Footer />
    </>
  );
}
