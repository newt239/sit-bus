import BusBoard from "#/app/_components/bus-board";
import Footer from "#/app/_components/footer";
import dayjs from "#/utils/dayjs";

export default async function Home() {
  const current = dayjs().tz();

  return (
    <>
      <BusBoard datetime={current} />
      <Footer />
    </>
  );
}
