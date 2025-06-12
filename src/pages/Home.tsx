import { useEffect, useRef } from "react";
import { Controls } from "../components/Controls";
import { Maze } from "../components/Maze";
import { useAdvancedSettings } from "../store/useAdvancedSettings";
import { useMazeStore } from "../store/useMazeStore";
import { doQLearningStep } from "../utils/qLearning";

export default function Home() {
  const { isLearning } = useMazeStore();
  const intervalRef = useRef<number | null>(null);
  const { stepDelayMs } = useAdvancedSettings();

  useEffect(() => {
    if (isLearning) {
      intervalRef.current = window.setInterval(() => {
        doQLearningStep();
      }, stepDelayMs);
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isLearning, stepDelayMs]);

  return (
    <div className="p-4 max-w-screen-sm mx-auto">
      <h1 className="text-xl font-bold text-center mb-4">
        TP : Agent Q-Learning dans un Labyrinthe
      </h1>
      <Controls />
      <Maze />
    </div>
  );
}
