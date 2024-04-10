import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { BusAPIResponse, Direction, List } from "./types";

dayjs.locale("ja");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

export const getNextBus = async () => {
  try {
    const res = await fetch("http://bus.shibaura-it.ac.jp/db/bus_data.json");
    const data: BusAPIResponse = await res.json();
    const current = dayjs().tz("Asia/Tokyo");
    const day = current.format("D");
    const hour = parseInt(current.format("H"));
    const minute = parseInt(current.format("m"));
    const ts_id = data.calendar[0].list.find((item) => item.day === day)?.ts_id;
    const current_timesheet = data.timesheet.find(
      (item) => item.ts_id === ts_id
    );
    if (!current_timesheet) return null;

    const leftBuses = getBusTimes("left", current_timesheet.list);
    let nextLeftBus = {
      time: "",
      left: 0,
    };
    for (const bus of leftBuses) {
      if (bus.hour > hour || (bus.hour === hour && bus.minute >= minute)) {
        nextLeftBus = {
          time: `${zeroPadding(bus.hour)}:${zeroPadding(bus.minute)}`,
          left: bus.minute - minute + (bus.hour - hour) * 60,
        };
        break;
      }
    }

    const rightBuses = getBusTimes("right", current_timesheet.list);
    let nextRightBus = {
      time: "",
      left: 0,
    };
    for (const bus of rightBuses) {
      if (bus.hour > hour || (bus.hour === hour && bus.minute >= minute)) {
        nextRightBus = {
          time: `${zeroPadding(bus.hour)}:${zeroPadding(bus.minute)}`,
          left: bus.minute - minute + (bus.hour - hour) * 60,
        };
        break;
      }
    }

    return { nextLeftBus, nextRightBus };
  } catch (error) {
    console.error(error);
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
