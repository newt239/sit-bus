type NextBusProps = {
  label: string;
  time: string;
  text1: string;
  text2: string;
};

const NextBus: React.FC<NextBusProps> = ({ label, time, text1, text2 }) => {
  return (
    <div className="flex flex-col items-center">
      <div>{label}</div>
      <div className="text-5xl sm:text-6xl lg:text-8xl">
        {text1 === "" ? time : text1}
      </div>
      <div className="min-h-6">{text2}</div>
    </div>
  );
};

export default NextBus;
