import BusBoard from "#/app/_components/bus-board";
import Footer from "#/app/_components/footer";
import dayjs from "#/utils/dayjs";

type Params = Promise<{
  datetime: string;
}>;

export default async function Page({ params }: { params: Params }) {
  const datetime = dayjs.tz((await params).datetime.replaceAll("%3A", ":"));

  return (
    <>
      <BusBoard datetime={datetime} />
      <Footer />
    </>
  );
}
