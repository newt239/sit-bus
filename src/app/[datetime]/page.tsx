import { getNextBus } from "#/utils/functions";
import dayjs from "dayjs";

type Params = {
  datetime: string;
};

export default async function Page({ params }: { params: Params }) {
  console.log(params.datetime);
  const nextBus = await getNextBus(
    dayjs(params.datetime.replaceAll("%3A", ":"))
  );

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
      <main className="flex h-screen flex-col items-center justify-between">
        <div className="flex h-5/6 flex-col items-center justify-between p-24">
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
          <div className="flex flex-col items-center">
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
      </main>
    </>
  );
}
