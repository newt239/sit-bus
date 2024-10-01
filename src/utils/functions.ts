import dayjs from "dayjs";
import { BusAPIResponse, Direction, List } from "./types";

export const getNextBus = async (datetime: dayjs.Dayjs) => {
  const res = await fetch("http://bus.shibaura-it.ac.jp/db/bus_data.json");
  const data: BusAPIResponse = await res.json();
  const ts_id = detectTimesheetId(datetime, data);
  const current_timesheet = data.timesheet.find((item) => item.ts_id === ts_id);
  if (!current_timesheet) return null;

  const hour = parseInt(datetime.format("H"));
  const minute = parseInt(datetime.format("m"));
  try {
    const leftBuses = getBusTimes("left", current_timesheet.list);
    let left = {
      time: "なし",
      text1: "",
      text2: "",
    };
    for (const bus of leftBuses) {
      if (bus.hour > hour || (bus.hour === hour && bus.minute >= minute)) {
        left = {
          time: `${zeroPadding(bus.hour)}:${zeroPadding(bus.minute)}`,
          text1: bus.minute === 60 ? `${bus.hour}時台` : "",
          text2:
            bus.text || `あと${bus.minute - minute + (bus.hour - hour) * 60}分`,
        };
        break;
      }
    }

    const rightBuses = getBusTimes("right", current_timesheet.list);
    let right = {
      time: "なし",
      text1: "",
      text2: "",
    };
    for (const bus of rightBuses) {
      if (bus.hour > hour || (bus.hour === hour && bus.minute >= minute)) {
        right = {
          time: `${zeroPadding(bus.hour)}:${zeroPadding(bus.minute)}`,
          text1: bus.minute === 60 ? `${bus.hour}時台` : "",
          text2:
            bus.text || `あと${bus.minute - minute + (bus.hour - hour) * 60}分`,
        };
        break;
      }
    }

    return { left, right, date: datetime.format("YYYY-MM-DD") };
  } catch (e) {
    console.error(e);
    return null;
  }
};

const detectTimesheetId = (datetime: dayjs.Dayjs, data: BusAPIResponse) => {
  const year = datetime.format("YYYY");
  const month = datetime.format("MM");
  const day = datetime.format("D");
  const calender = data.calendar.find(
    (item) => item.year === year && item.month === month
  );
  if (!calender) return undefined;
  const ts_id = calender.list.find((item) => item.day === day)?.ts_id;
  const dayTimesheet = data.timesheet.find((item) => item.ts_id === ts_id);
  return dayTimesheet?.ts_id;
};

const getBusTimes = (direction: Direction, list: List[]) => {
  const buses = [];
  for (const eachHour of list) {
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
    let startMinute: number | null = null;
    let endMinute: number | null = null;
    if (memo === "間隔を狭めて運行" || memo === "適時運行") {
      buses.push({
        hour: parseInt(eachHour.time),
        minute: 60,
        text: memo,
      });
    } else if (memo !== "") {
      if (memo.includes("より")) {
        const raw = parseInt(memo.replace(/.*\d{1,2}\:(\d{1,2})より.*/, "$1"));
        startMinute = isNaN(raw) ? null : raw;
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
        const raw = parseInt(memo.replace(/.*\d{1,2}\:(\d{1,2})まで.*/, "$1"));
        endMinute = isNaN(raw) ? null : raw;
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
  }
  return buses;
};

const zeroPadding = (num: number) => {
  return num < 10 ? `0${num}` : num;
};
