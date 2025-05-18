import Link from "next/link";

const FetchError: React.FC = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center m-8">
      <p>バス情報を取得できませんでした。</p>
      <p>
        <Link
          href="http://bus.shibaura-it.ac.jp/ts/today_sheet.php"
          target="_blank"
          className=" text-blue-500 hover:underline"
        >
          公式の時刻表
        </Link>
        をご確認ください。
      </p>
    </div>
  );
};

export default FetchError;
