"use client";

import Link from "next/link";
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
    <div className="flex flex-col items-center gap-2 px-4 pt-[calc(env(safe-area-inset-top)+2.5rem)] pb-4">
      <div className="flex items-center justify-center gap-2">
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
      <Link
        href={basePath || "/"}
        className="text-[#0f4e3c] underline underline-offset-4 hover:no-underline"
      >
        現在時刻で再検索
      </Link>
    </div>
  );
};

export default DateTimePicker;
