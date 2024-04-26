import { getNextBus } from "#/utils/functions";
import dayjs from "dayjs";
import "dayjs/locale/ja";

import FetchError from "#/app/_components/fetch-error";
import Footer from "#/app/_components/footer";
import Header from "#/app/_components/header";
import NextBus from "#/app/_components/next-bus";

export default async function Home() {
  dayjs.locale("ja");
  const current = dayjs();
  const nextBus = await getNextBus(current);

  if (!nextBus) return <FetchError />;

  return (
    <>
      <Header>
        {current.format("ddd")} {current.format("HH:mm")}
      </Header>
      <main className="flex h-5/6 flex-col lg:flex-row  lg:w-full items-center justify-around p-12">
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
