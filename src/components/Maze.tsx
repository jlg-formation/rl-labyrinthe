import { useMazeStore } from "../store/useMazeStore";
import React from "react";

const cellColors: Record<string, string> = {
  wall: "#1f2937", // gris foncé
  empty: "#e5e7eb", // gris clair
  start: "#10b981", // vert
  goal: "#ef4444", // rouge
};

const CELL_SIZE = 20; // pixels (modifiable pour affichage)

export const Maze: React.FC = () => {
  const { maze, agentPos } = useMazeStore();

  const width = maze[0]?.length ?? 0;
  const height = maze.length;

  return (
    <div className="overflow-auto border border-gray-300 rounded shadow p-2 bg-white">
      <svg
        width={width * CELL_SIZE}
        height={height * CELL_SIZE}
        className="block"
      >
        {maze.map((row, y) =>
          row.map((cell, x) => {
            const isAgent = agentPos.x === x && agentPos.y === y;
            return (
              <rect
                key={`${x}-${y}`}
                x={x * CELL_SIZE}
                y={y * CELL_SIZE}
                width={CELL_SIZE}
                height={CELL_SIZE}
                fill={isAgent ? "#3b82f6" : cellColors[cell]}
                stroke="#ccc"
                strokeWidth={1}
              />
            );
          })
        )}
      </svg>
    </div>
  );
};
