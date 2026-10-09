import type { Dayjs } from "dayjs";

import FetchError from "#/app/_components/fetch-error";
import NextBus from "#/app/_components/next-bus";
import ServiceEnded from "#/app/_components/service-ended";
import { getUpcomingBuses, type UpcomingBus } from "#/utils/functions";
import { routes } from "#/utils/routes";
import type { Route } from "#/utils/types";

const UPCOMING_COUNT = 5;

type RouteBoardProps = {
  route: Route;
  datetime: Dayjs;
};

const RouteBoard: React.FC<RouteBoardProps> = async ({ route, datetime }) => {
  const result = await getUpcomingBuses(datetime, route, UPCOMING_COUNT);
  const routeInfo = routes.find((item) => item.route === route);

  if (!result || !routeInfo) return <FetchError />;

  const columns = [
    { label: routeInfo.leftLabel, buses: result.left },
    { label: routeInfo.rightLabel, buses: result.right },
  ];

  return (
    <main className="flex w-full max-w-5xl flex-1 flex-col justify-center px-4">
      <section className="overflow-hidden rounded-lg border-2 border-[#0f4e3c]">
        <h1 className="bg-[#0f4e3c] py-2 text-center text-lg text-white">
          {routeInfo.name}
        </h1>
        <div className="grid gap-8 p-4 sm:grid-cols-2">
          {columns.map(({ label, buses }) => {
            const [first, ...rest] = buses;
            if (!first) {
              return <ServiceEnded key={label} label={label} />;
            }
            return (
              <div key={label} className="flex flex-col gap-4">
                <NextBus
                  label={label}
                  date={result.date}
                  time={first.time}
                  text1={first.text1}
                  text2={first.text2}
                  basePath={`/${route}`}
                />
                {rest.length > 0 && <UpcomingList buses={rest} />}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

const UpcomingList: React.FC<{ buses: UpcomingBus[] }> = ({ buses }) => {
  return (
    <ol className="divide-y divide-[#0f4e3c]/20 border-y border-[#0f4e3c]/20">
      {buses.map((bus, i) => (
        <li
          key={i}
          className={`flex items-center justify-between gap-4 px-3 py-2 ${
            bus.isRegular ? "" : "bg-[#0f4e3c]/10"
          }`}
        >
          <span className="text-2xl tabular-nums">
            {bus.text1 === "" ? bus.time : bus.text1}
          </span>
          <span className="text-sm">{bus.text2}</span>
        </li>
      ))}
    </ol>
  );
};

export default RouteBoard;
