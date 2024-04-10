import { Direction } from "#/utils/types";

type Params = {
  direction: Direction;
  datetime: string;
};

export default function Page({ params }: { params: Params }) {
  return <div>direction: {params.direction}</div>;
}
