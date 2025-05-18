import FetchError from "#/app/_components/fetch-error";
import Footer from "#/app/_components/footer";
import Header from "#/app/_components/header";
import NextBus from "#/app/_components/next-bus";
import dayjs from "#/utils/dayjs";
import { getNextBus } from "#/utils/functions";

type Params = {
  datetime: string;
};

export default async function Page({ params }: { params: Params }) {
  const datetime = dayjs.tz(params.datetime.replaceAll("%3A", ":"));
  const nextBus = await getNextBus(datetime);

  if (!nextBus) return <FetchError />;

  return (
    <>
      <Header>
        {datetime.format("dddd")} {datetime.format("HH:mm")}
      </Header>
      <main className="flex h-5/6 flex-col lg:flex-row lg:w-full items-center justify-around p-12">
        <NextBus
          direction="left"
          date={nextBus.date}
          time={nextBus.left.time}
          text1={nextBus.left.text1}
          text2={nextBus.left.text2}
        />
        <NextBus
          direction="right"
          date={nextBus.date}
          time={nextBus.right.time}
          text1={nextBus.right.text1}
          text2={nextBus.right.text2}
        />
      </main>
      <Footer />
    </>
  );
}
