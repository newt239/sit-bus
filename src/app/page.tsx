import FetchError from "#/app/_components/fetch-error";
import Footer from "#/app/_components/footer";
import Header from "#/app/_components/header";
import NextBus from "#/app/_components/next-bus";
import dayjs from "#/utils/dayjs";
import { getNextBus } from "#/utils/functions";

export default async function Home() {
  const current = dayjs().tz();
  const nextBus = await getNextBus(current);

  if (!nextBus) return <FetchError />;

  return (
    <>
      <Header>
        {current.format("dddd")} {current.format("HH:mm")}
      </Header>
      <main className="flex h-5/6 flex-col items-center justify-around p-12 lg:w-full lg:flex-row">
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
