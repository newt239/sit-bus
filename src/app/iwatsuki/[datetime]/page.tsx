import type { Metadata } from "next";

import DateTimePicker from "#/app/_components/datetime-picker";
import Footer from "#/app/_components/footer";
import RouteBoard from "#/app/_components/route-board";
import dayjs from "#/utils/dayjs";

export const metadata: Metadata = {
  title: "岩槻便 | SIT Bus",
};

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
        basePath="/iwatsuki"
      />
      <RouteBoard route="iwatsuki" datetime={datetime} />
      <Footer />
    </>
  );
}
