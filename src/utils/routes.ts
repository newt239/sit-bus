import type { Route } from "./types";

export const routes: {
  route: Route;
  name: string;
  leftLabel: string;
  rightLabel: string;
}[] = [
  {
    route: "higashiomiya",
    name: "東大宮便",
    leftLabel: "大学行",
    rightLabel: "東大宮駅行",
  },
  {
    route: "iwatsuki",
    name: "岩槻便",
    leftLabel: "大学行",
    rightLabel: "岩槻駅行",
  },
];
