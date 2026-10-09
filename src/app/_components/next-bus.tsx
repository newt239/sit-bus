import dayjs from "dayjs";
import Link from "next/link";

type NextBusProps = {
  label: string;
  date: string;
  time: string;
  text1: string;
  text2: string;
  basePath?: string;
};

const NextBus: React.FC<NextBusProps> = ({
  label,
  date,
  time,
  text1,
  text2,
  basePath = "",
}) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center">
        <div>{label}</div>
        <div className="text-5xl sm:text-6xl lg:text-8xl">
          {text1 === "" ? time : text1}
        </div>
        <div className="min-h-6">{text2}</div>
      </div>
      <div className="flex min-h-6">
        {text2 !== "" && (
          <Link
            href={`${basePath}/${dayjs(`${date}T${time}:00`)
              .add(1, "minute")
              .format("YYYY-MM-DDTHH:mm:ss")}`}
            className="text-[#0f4e3c] underline underline-offset-4 hover:no-underline"
          >
            次のバスを見る
          </Link>
        )}
      </div>
    </div>
  );
};

export default NextBus;
