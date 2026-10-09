import type { Dayjs } from "dayjs";
import type { BusAPIResponse, Direction, List, Route } from "./types";

const API_URLS: Record<Route, string> = {
  higashiomiya: "http://bus.shibaura-it.ac.jp/db/bus_data.json",
  iwatsuki: "http://bus.shibaura-it.ac.jp/iwatsuki/db/bus_data.json",
};

export type UpcomingBus = ReturnType<typeof findUpcomingBuses>[number];

// 次のバスを特定
export const getNextBus = async (datetime: Dayjs, route: Route) => {
  const result = await getUpcomingBuses(datetime, route, 1);
  if (!result) return null;

  return {
    left: result.left.at(0),
    right: result.right.at(0),
    date: result.date,
  };
};

export const getUpcomingBuses = async (
  datetime: Dayjs,
  route: Route,
  count: number,
) => {
  try {
    const res = await fetch(API_URLS[route]);
    const data: BusAPIResponse = await res.json();
    const ts_id = detectTimesheetId(datetime, data);
    const current_timesheet = data.timesheet.find(
      (item) => item.ts_id === ts_id,
    );
    if (!current_timesheet) return null;

    const hour = parseInt(datetime.format("H"));
    const minute = parseInt(datetime.format("m"));
    return {
      left: findUpcomingBuses(
        getBusTimes("left", current_timesheet.list),
        hour,
        minute,
        count,
      ),
      right: findUpcomingBuses(
        getBusTimes("right", current_timesheet.list),
        hour,
        minute,
        count,
      ),
      date: datetime.format("YYYY-MM-DD"),
    };
  } catch (e) {
    console.error(e);
    return null;
  }
};

const findUpcomingBuses = (
  buses: ReturnType<typeof getBusTimes>,
  hour: number,
  minute: number,
  count: number,
) => {
  return buses
    .filter(
      (bus) => bus.hour > hour || (bus.hour === hour && bus.minute >= minute),
    )
    .slice(0, count)
    .map((bus) => ({
      time: `${zeroPadding(bus.hour)}:${zeroPadding(bus.minute)}`,
      text1: bus.minute === 60 ? `${bus.hour}時台` : "",
      text2:
        bus.text || `あと${bus.minute - minute + (bus.hour - hour) * 60}分`,
      isRegular: bus.text === null,
      departure: `${zeroPadding(bus.hour)}:${zeroPadding(bus.minute === 60 ? 0 : bus.minute)}`,
    }));
};

// 今日の日付にもとづくtimesheet_idを取得
const detectTimesheetId = (datetime: Dayjs, data: BusAPIResponse) => {
  const year = datetime.format("YYYY");
  const month = datetime.format("MM");
  const day = datetime.format("D");
  const calender = data.calendar.find(
    (item) => item.year === year && item.month === month,
  );
  if (!calender) return undefined;
  const ts_id = calender.list.find((item) => item.day === day)?.ts_id;
  const dayTimesheet = data.timesheet.find((item) => item.ts_id === ts_id);
  return dayTimesheet?.ts_id;
};

// APIのレスポンスデータをもとに完全な配列形式のバス時刻一覧の配列を作成
const getBusTimes = (direction: Direction, list: List[]) => {
  //  その日来るすべてのバスが入る配列
  const buses = [];
  /*
    時刻表として表示する時に上から num1, memo1, num2, memo2 の順番で表示される。
    num2 に書き込んでいるのは memo1 に文字列が入っていた時にその下に表示するためだと考えられる。
  */
  for (const eachHour of list) {
    // num1, num2にその時間に来るバスの時刻がドット区切りで入っている
    if (eachHour[`bus_${direction}`].num1 !== "") {
      const eachHourBuses = eachHour[`bus_${direction}`].num1
        .split(".")
        .map((item) => {
          return {
            hour: parseInt(eachHour.time),
            minute: parseInt(item),
            text: null,
          };
        });
      buses.push(...eachHourBuses);
    }

    const memo = eachHour[`bus_${direction}`].memo1;
    if (memo === "間隔を狭めて運行" || memo === "適時運行") {
      buses.push({
        hour: parseInt(eachHour.time),
        minute: 60,
        text: memo,
      });
    } else if (memo !== "") {
      // 「より」「まで」が含まれる場合適時運行か間隔を狭めて運行
      if (memo.includes("より")) {
        const raw = parseInt(memo.replace(/.*\d{1,2}:(\d{1,2})より.*/, "$1"));
        const startMinute = isNaN(raw) ? null : raw;
        if (startMinute) {
          buses.push({
            hour: parseInt(eachHour.time),
            minute: startMinute,
            text: `から${
              memo.includes("運行") ? "適時運行" : "間隔を狭めて運行"
            }`,
          });
        }
      }
      if (memo.includes("まで")) {
        const raw = parseInt(memo.replace(/.*\d{1,2}:(\d{1,2})まで.*/, "$1"));
        const endMinute = isNaN(raw) ? null : raw;
        if (endMinute) {
          buses.push({
            hour: parseInt(eachHour.time),
            minute: endMinute,
            text: `まで${
              memo.includes("運行") ? "適時運行" : "間隔を狭めて運行"
            }`,
          });
        }
      }
    }

    if (eachHour[`bus_${direction}`].num2 !== "") {
      const eachHourBuses = eachHour[`bus_${direction}`].num2
        .split(".")
        .map((item) => {
          return {
            hour: parseInt(eachHour.time),
            minute: parseInt(item),
            text: null,
          };
        });
      buses.push(...eachHourBuses);
    }

    // memo2に値が入っているケースはいまのところない
  }
  return buses;
};

// 2桁のゼロ埋め
const zeroPadding = (num: number) => {
  return num < 10 ? `0${num}` : num;
};
