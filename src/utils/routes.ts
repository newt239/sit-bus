import type { Route } from "./types";

export const routes: {
  route: Route;
  name: string;
  leftLabel: string;
  rightLabel: string;
  timetableUrl: string;
}[] = [
  {
    route: "higashiomiya",
    name: "東大宮便",
    leftLabel: "大学行",
    rightLabel: "東大宮駅行",
    timetableUrl: "http://bus.shibaura-it.ac.jp/today",
  },
  {
    route: "iwatsuki",
    name: "岩槻便",
    leftLabel: "大学行",
    rightLabel: "岩槻駅行",
    timetableUrl: "http://bus.shibaura-it.ac.jp/iwatsuki/today",
  },
];
