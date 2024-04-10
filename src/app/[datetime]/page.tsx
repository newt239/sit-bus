import { getNextBus } from "#/utils/functions";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

type Params = {
  datetime: string;
};

dayjs.locale("ja");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

export default async function Page({ params }: { params: Params }) {
  const datetime = dayjs(params.datetime.replaceAll("%3A", ":")).tz(
    "Asia/Tokyo"
  );
  const nextBus = await getNextBus(datetime);

  if (!nextBus) {
    return (
      <main className="flex h-screen flex-col items-center justify-between">
        <p>
          バス情報を取得できませんでした。
          <a
            href="http://bus.shibaura-it.ac.jp/ts/today_sheet.php"
            className=" text-blue-500 hover:underline"
          >
            公式の時刻表
          </a>
          をご確認ください。
        </p>
      </main>
    );
  }

  return (
    <>
      <div className="h-1/6 w-full flex items-center justify-center">
        <h2>芝浦 次の学バス {datetime.format("HH:mm")}</h2>
      </div>
      <div className="h-5/6 flex flex-col justify-between">
        <div className="flex flex-col items-center">
          <div>大学行</div>
          <div className="text-8xl">{nextBus.left.time}</div>
          <div>{nextBus.left.text}</div>
          {nextBus.left.text !== "" && (
            <div>
              <a
                href={`${nextBus.date}T${nextBus.left.time}:00`}
                className=" text-blue-500 hover:underline"
              >
                次のバス
              </a>
            </div>
          )}
        </div>
        <div className="h-2/5 flex flex-col items-center">
          <div>東大宮駅行</div>
          <div className="text-8xl">{nextBus.right.time}</div>
          <div>{nextBus.right.text}</div>
          {nextBus.right.text !== "" && (
            <div>
              <a
                href={`${nextBus.date}T${nextBus.right.time}:00`}
                className=" text-blue-500 hover:underline"
              >
                次のバス
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
