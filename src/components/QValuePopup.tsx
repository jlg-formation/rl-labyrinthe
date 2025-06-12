import { useMazeStore } from "../store/useMazeStore";
import { useEffect, useState } from "react";

type Props = {
  x: number;
  y: number;
  onClose: () => void;
};

const getColorForValue = (v: number) => {
  if (v > 50) return "bg-green-500 text-white";
  if (v > 0) return "bg-yellow-400 text-black";
  return "bg-red-500 text-white";
};

export const QValuePopup: React.FC<Props> = ({ x, y, onClose }) => {
  const { getQValue } = useMazeStore();
  const [values, setValues] = useState({
    up: 0,
    down: 0,
    left: 0,
    right: 0,
  });

  useEffect(() => {
    setValues({
      up: getQValue({ x, y }, "up"),
      down: getQValue({ x, y }, "down"),
      left: getQValue({ x, y }, "left"),
      right: getQValue({ x, y }, "right"),
    });
  }, [x, y, getQValue]);

  const bestDir = Object.entries(values).reduce(
    (best, [dir, val]) =>
      val > values[best as keyof typeof values]
        ? (dir as keyof typeof values)
        : best,
    "up" as keyof typeof values,
  );

  const arrowSymbols: Record<keyof typeof values, string> = {
    up: "↑",
    down: "↓",
    left: "←",
    right: "→",
  };

  return (
    <div className="absolute z-50 min-w-[120px] rounded border bg-white p-4 text-sm shadow-lg">
      <h2 className="mb-2 font-semibold">
        Q-values ({x}, {y})
      </h2>
      <div className="grid grid-cols-3 gap-1 text-center text-xs">
        <div></div>
        <div className={`rounded p-1 ${getColorForValue(values.up)}`}>
          ↑<br />
          {values.up.toFixed(2)}
        </div>
        <div></div>

        <div className={`rounded p-1 ${getColorForValue(values.left)}`}>
          ←<br />
          {values.left.toFixed(2)}
        </div>
        <div className="flex items-center justify-center font-bold text-blue-600">
          {arrowSymbols[bestDir]}
        </div>
        <div className={`rounded p-1 ${getColorForValue(values.right)}`}>
          →<br />
          {values.right.toFixed(2)}
        </div>

        <div></div>
        <div className={`rounded p-1 ${getColorForValue(values.down)}`}>
          ↓<br />
          {values.down.toFixed(2)}
        </div>
        <div></div>
      </div>

      <button
        onClick={onClose}
        className="mt-3 text-xs text-red-500 hover:underline"
      >
        Fermer
      </button>
    </div>
  );
};
