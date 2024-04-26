const FetchError: React.FC = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-between">
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
    </div>
  );
};

export default FetchError;
