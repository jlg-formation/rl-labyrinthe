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
    <div className="mx-auto max-w-screen-sm p-4">
      <h1 className="mb-4 text-center text-xl font-bold">
        TP : Agent Q-Learning dans un Labyrinthe
      </h1>
      <Controls />
      <Maze />
    </div>
  );
}
