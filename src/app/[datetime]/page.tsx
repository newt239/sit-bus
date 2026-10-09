import BusBoard from "#/app/_components/bus-board";
import DateTimePicker from "#/app/_components/datetime-picker";
import Footer from "#/app/_components/footer";
import dayjs from "#/utils/dayjs";

type Params = Promise<{
  datetime: string;
}>;

export default async function Page({ params }: { params: Params }) {
  const datetime = dayjs.tz((await params).datetime.replaceAll("%3A", ":"));

  return (
    <>
      <DateTimePicker
        key={datetime.format()}
        date={datetime.format("YYYY-MM-DD")}
        time={datetime.format("HH:mm")}
      />
      <BusBoard datetime={datetime} />
      <Footer />
    </>
  );
}
