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
  const datetime = dayjs(params.datetime.replaceAll("%3A", ":"));
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
        <div className="w-full p-4 border-2 border-solid border-black rounded-md text-center">
          <h2 className="text-center">
            芝浦 {datetime.format("HH:mm")} 次の学バス
          </h2>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div>大学行</div>
        <div className="text-7xl">
          {nextBus.left.text1 === "" ? nextBus.left.time : nextBus.left.text1}
        </div>
        <div>{nextBus.left.text2}</div>
        {nextBus.left.text2 !== "" && (
          <div>
            <a
              href={dayjs(`${nextBus.date}T${nextBus.left.time}:00`)
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
        <div className="text-7xl">
          {nextBus.right.text1 === ""
            ? nextBus.right.time
            : nextBus.right.text1}
        </div>
        <div>{nextBus.right.text2}</div>
        {nextBus.right.text2 !== "" && (
          <div>
            <a
              href={dayjs(`${nextBus.date}T${nextBus.right.time}:00`)
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
