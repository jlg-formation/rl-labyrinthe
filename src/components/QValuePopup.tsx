import { useMazeStore } from "../store/useMazeStore";
import { useEffect, useState } from "react";

type Props = {
  x: number;
  y: number;
  onClose: () => void;
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

  return (
    <div className="absolute z-50 bg-white border shadow-lg rounded p-4 text-sm">
      <h2 className="font-semibold mb-2">
        Q-values ({x}, {y})
      </h2>
      <div className="grid grid-cols-3 gap-1 text-center">
        <div></div>
        <div className="text-blue-600">↑</div>
        <div></div>
        <div className="text-blue-600">←</div>
        <div>{values.up.toFixed(2)}</div>
        <div className="text-blue-600">→</div>
        <div></div>
        <div className="text-blue-600">↓</div>
        <div></div>
      </div>
      <div className="grid grid-cols-2 mt-2 gap-2">
        <div className="text-xs text-gray-500 text-left">
          L: {values.left.toFixed(2)} <br />
          R: {values.right.toFixed(2)}
        </div>
        <div className="text-xs text-gray-500 text-right">
          D: {values.down.toFixed(2)}
        </div>
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
