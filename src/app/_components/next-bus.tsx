import dayjs from "dayjs";

type NextBusProps = {
  direction: "left" | "right";
  date: string;
  time: string;
  text1: string;
  text2: string;
};

const NextBus: React.FC<NextBusProps> = ({
  direction,
  date,
  time,
  text1,
  text2,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div>{direction === "left" ? "大学行" : "東大宮駅行"}</div>
      <div className="text-7xl lg:text-9xl">{text1 === "" ? time : text1}</div>
      <div>{text2}</div>
      {text2 !== "" && (
        <div className="flex">
          <a
            href={dayjs(`${date}T${time}:00`)
              .add(1, "minute")
              .format("YYYY-MM-DDTHH:mm:ss")}
            className=" text-[#0f4e3c] hover:underline"
          >
            次のバス＞
          </a>
        </div>
      )}
    </div>
  );
};

export default NextBus;
