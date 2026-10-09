"use client";

import { useRouter } from "next/navigation";

type DateTimePickerProps = {
  date: string;
  time: string;
  basePath?: string;
};

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  date,
  time,
  basePath = "",
}) => {
  const router = useRouter();

  const navigate = (nextDate: string, nextTime: string) => {
    if (nextDate === "" || nextTime === "") return;
    router.push(`${basePath}/${nextDate}T${nextTime}:00`);
  };

  return (
    <div className="flex items-center justify-center gap-2 px-4 pt-[calc(env(safe-area-inset-top)+2.5rem)] pb-4">
      <input
        type="date"
        aria-label="日付"
        defaultValue={date}
        onChange={(e) => navigate(e.target.value, time)}
        className="rounded border border-[#0f4e3c] px-2 py-1"
      />
      <input
        type="time"
        aria-label="時刻"
        defaultValue={time}
        onChange={(e) => navigate(date, e.target.value)}
        className="rounded border border-[#0f4e3c] px-2 py-1"
      />
    </div>
  );
};

export default DateTimePicker;
