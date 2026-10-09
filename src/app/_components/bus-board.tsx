import type { Dayjs } from "dayjs";
import Link from "next/link";

import FetchError from "#/app/_components/fetch-error";
import NextBus from "#/app/_components/next-bus";
import ServiceEnded from "#/app/_components/service-ended";
import { getNextBus } from "#/utils/functions";
import { routes } from "#/utils/routes";

type BusBoardProps = {
  datetime: Dayjs;
  datetimeSegment?: string;
};

const BusBoard: React.FC<BusBoardProps> = async ({
  datetime,
  datetimeSegment,
}) => {
  const results = await Promise.all(
    routes.map((item) => getNextBus(datetime, item.route)),
  );

  if (results.every((result) => result === null)) return <FetchError />;

  return (
    <main className="flex w-full max-w-5xl flex-1 flex-col gap-6 px-4">
      {routes.map((item, i) => {
        const nextBus = results[i];
        return (
          <section
            key={item.route}
            className="overflow-hidden rounded-lg border-2 border-[#0f4e3c]"
          >
            <h2 className="bg-[#0f4e3c] text-center text-lg text-white">
              <Link
                href={`/${item.route}${datetimeSegment ? `/${datetimeSegment}` : ""}`}
                className="block py-2 underline underline-offset-4 hover:no-underline"
              >
                {item.name}
              </Link>
            </h2>
            {nextBus ? (
              <div className="flex flex-row items-center justify-around gap-4 p-4">
                {nextBus.left ? (
                  <NextBus
                    label={item.leftLabel}
                    time={nextBus.left.time}
                    text1={nextBus.left.text1}
                    text2={nextBus.left.text2}
                  />
                ) : (
                  <ServiceEnded label={item.leftLabel} />
                )}
                {nextBus.right ? (
                  <NextBus
                    label={item.rightLabel}
                    time={nextBus.right.time}
                    text1={nextBus.right.text1}
                    text2={nextBus.right.text2}
                  />
                ) : (
                  <ServiceEnded label={item.rightLabel} />
                )}
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
