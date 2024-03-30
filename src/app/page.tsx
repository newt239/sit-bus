import { getNextBus } from "#/utils/functions";

export default async function Home() {
  const nextBus = await getNextBus();
  if (!nextBus)
    return (
      <div>
        <p>
          バス情報を取得できませんでした。
          <a href="http://bus.shibaura-it.ac.jp/ts/today_sheet.php">
            公式の時刻表
          </a>
          をご確認ください。
        </p>
      </div>
    );

  const leftBus =
    nextBus.nextLeftBus.time === "" ? "なし" : `${nextBus.nextLeftBus.time}`;
  const leftBusLeft =
    leftBus === "なし" ? "" : `あと${nextBus.nextLeftBus.left}分`;
  const rightBus =
    nextBus.nextRightBus.time === "" ? "なし" : `${nextBus.nextRightBus.time}`;
  const rightBusLeft =
    rightBus === "なし" ? "" : `あと${nextBus.nextRightBus.left}分`;

  return (
    <>
      <main className="flex h-screen flex-col items-center justify-between">
        <div className="flex h-5/6 flex-col items-center justify-between p-24">
          <div>
            <div>大学行</div>
            <div className="text-8xl">{leftBus}</div>
            <div>{leftBusLeft}</div>
          </div>
          <div>
            <div>東大宮駅行</div>
            <div className="text-8xl">{rightBus}</div>
            <div>{rightBusLeft}</div>
          </div>
        </div>
        <div className="flex h-1/6 items-center justify-center p-12">
          <a
            className="text-blue-500 hover:underline"
            href="http://bus.shibaura-it.ac.jp/ts/today_sheet.php"
            target="_blank"
          >
            公式の時刻表
          </a>
        </div>
      </main>
    </>
  );
}
