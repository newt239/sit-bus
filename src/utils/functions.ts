import dayjs from "dayjs";
import { BusAPIResponse, Direction, List } from "./types";

export const getNextBus = async (datetime: dayjs.Dayjs) => {
  const res = await fetch("http://bus.shibaura-it.ac.jp/db/bus_data.json");
  const data: BusAPIResponse = await res.json();
  const day = datetime.format("D");
  const hour = parseInt(datetime.format("H"));
  const minute = parseInt(datetime.format("m"));
  const ts_id = data.calendar[0].list.find((item) => item.day === day)?.ts_id;
  const current_timesheet = data.timesheet.find((item) => item.ts_id === ts_id);
  if (!current_timesheet) return null;

  try {
    const leftBuses = getBusTimes("left", current_timesheet.list);
    let left = {
      time: "なし",
      text: "",
    };
    for (const bus of leftBuses) {
      if (bus.hour > hour || (bus.hour === hour && bus.minute >= minute)) {
        left = {
          time: `${zeroPadding(bus.hour)}:${zeroPadding(bus.minute)}`,
          text:
            bus.text || `あと${bus.minute - minute + (bus.hour - hour) * 60}分`,
        };
        break;
      }
    }

    const rightBuses = getBusTimes("right", current_timesheet.list);
    let right = {
      time: "なし",
      text: "",
    };
    for (const bus of rightBuses) {
      if (bus.hour > hour || (bus.hour === hour && bus.minute >= minute)) {
        right = {
          time: `${zeroPadding(bus.hour)}:${zeroPadding(bus.minute)}`,
          text:
            bus.text || `あと${bus.minute - minute + (bus.hour - hour) * 60}分`,
        };
        break;
      }
    }

    return { left, right };
  } catch (e) {
    console.error(e);
    return null;
  }
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
    if (memo !== "") {
      startMinute =
        parseInt(memo.replace(/\d{1,2}\:(\d{1,2})より.*/, "$1")) || null;
      if (startMinute) {
        buses.push({
          hour: parseInt(eachHour.time),
          minute: startMinute,
          text: "から間隔を狭めて運行",
        });
      }
      endMinute =
        parseInt(memo.replace(/.*\d{1,2}\:(\d{1,2})まで.*/, "$1")) || null;
      if (endMinute) {
        buses.push({
          hour: parseInt(eachHour.time),
          minute: endMinute,
          text: "まで間隔を狭めて運行",
        });
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
