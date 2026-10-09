import type { Dayjs } from "dayjs";

import FetchError from "#/app/_components/fetch-error";
import NextBus from "#/app/_components/next-bus";
import { getNextBus } from "#/utils/functions";
import { routes } from "#/utils/routes";

type BusBoardProps = {
  datetime: Dayjs;
};

const BusBoard: React.FC<BusBoardProps> = async ({ datetime }) => {
  const results = await Promise.all(
    routes.map((item) => getNextBus(datetime, item.route)),
  );

  if (results.every((result) => result === null)) return <FetchError />;

  return (
    <main className="flex w-full max-w-5xl flex-1 flex-col justify-center gap-6 px-4">
      {routes.map((item, i) => {
        const nextBus = results[i];
        return (
          <section
            key={item.route}
            className="overflow-hidden rounded-lg border-2 border-[#0f4e3c]"
          >
            <h2 className="bg-[#0f4e3c] py-2 text-center text-lg text-white">
              {item.name}
            </h2>
            {nextBus ? (
              <div className="flex flex-row items-center justify-around gap-4 p-4">
                <NextBus
                  label={item.leftLabel}
                  date={nextBus.date}
                  time={nextBus.left.time}
                  text1={nextBus.left.text1}
                  text2={nextBus.left.text2}
                />
                <NextBus
                  label={item.rightLabel}
                  date={nextBus.date}
                  time={nextBus.right.time}
                  text1={nextBus.right.text1}
                  text2={nextBus.right.text2}
                />
              </div>
            ) : (
              <p className="p-4 text-center">運行情報がありません。</p>
            )}
          </section>
        );
      })}
    </main>
  );
};

export default BusBoard;
