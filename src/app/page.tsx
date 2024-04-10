import { getNextBus } from "#/utils/functions";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.locale("ja");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

export default async function Home() {
  const current = dayjs().tz("Asia/Tokyo");
  const nextBus = await getNextBus(current);

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
        <div className="w-full p-4 border-2 border-solid border-black rounded-md tect-center">
          <h2>芝浦 次の学バス {current.format("HH:mm")}</h2>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div>大学行</div>
        <div className="text-8xl">{nextBus.left.time}</div>
        <div>{nextBus.left.text}</div>
        {nextBus.left.text !== "" && (
          <div>
            <a
              href={dayjs(`${nextBus.date}T${nextBus.left.time}:00`)
                .tz("Asia/Tokyo")
                .add(1, "minute")
                .format("YYYY-MM-DDTHH:mm:ss")}
              className=" text-blue-500 hover:underline"
            >
              次のバス
            </a>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center">
        <div>東大宮駅行</div>
        <div className="text-8xl">{nextBus.right.time}</div>
        <div>{nextBus.right.text}</div>
        {nextBus.right.text !== "" && (
          <div>
            <a
              href={dayjs(`${nextBus.date}T${nextBus.right.time}:00`)
                .tz("Asia/Tokyo")
                .add(1, "minute")
                .format("YYYY-MM-DDTHH:mm:ss")}
              className=" text-blue-500 hover:underline"
            >
              次のバス
            </a>
          </div>
        )}
      </div>
    </>
  );
}
