import type { Metadata } from "next";

import DateTimePicker from "#/app/_components/datetime-picker";
import Footer from "#/app/_components/footer";
import RouteBoard from "#/app/_components/route-board";
import dayjs from "#/utils/dayjs";

export const metadata: Metadata = {
  title: "岩槻便 | SIT Bus",
};

export default async function Page() {
  const current = dayjs().tz();

  return (
    <>
      <DateTimePicker
        key={current.format()}
        date={current.format("YYYY-MM-DD")}
        time={current.format("HH:mm")}
        basePath="/iwatsuki"
      />
      <RouteBoard route="iwatsuki" datetime={current} />
      <Footer />
    </>
  );
}
