import { useMazeStore } from "../store/useMazeStore";
import { QValuePanel } from "./QValuePanel";
import React, { useState } from "react";

const cellColors: Record<string, string> = {
  wall: "#1f2937", // gris foncé
  empty: "#e5e7eb", // gris clair
  start: "#10b981", // vert
  goal: "#ef4444", // rouge
};

const CELL_SIZE = 20; // pixels (modifiable)

export const Maze: React.FC = () => {
  const { maze, agentPos } = useMazeStore();
  const [selectedCell, setSelectedCell] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const width = maze[0]?.length ?? 0;
  const height = maze.length;

  return (
    <div>
      <div className="relative overflow-auto rounded border border-gray-300 bg-white p-2 shadow">
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
                  onClick={() => setSelectedCell({ x, y })}
                  className="cursor-pointer"
                />
              );
            }),
          )}
        </svg>
      </div>
      <div className="mt-4">
        {selectedCell ? (
          <QValuePanel x={selectedCell.x} y={selectedCell.y} />
        ) : (
          <div className="rounded border bg-white p-4 text-sm shadow">
            Cliquez sur une case pour afficher les Q-values
          </div>
        )}
      </div>
    </div>
  );
};
