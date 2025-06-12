import { useMazeStore } from "../store/useMazeStore";
import { generateMaze } from "../utils/mazeGenerator";
import { doQLearningStep } from "../utils/qLearning";

export const Controls: React.FC = () => {
  const {
    isLearning,
    toggleLearning,
    resetQTable,
    setMaze,
    size,
    setAgentPos,
    setGoalPos,
    setStartPos,
  } = useMazeStore();

  const { episodeCount } = useMazeStore();

  const { stopAtGoal, setStopAtGoal } = useMazeStore();

  const handleReset = () => {
    const newMaze = generateMaze(size, size);
    setMaze(newMaze);

    // Recherche des positions start et goal dans la grille
    for (let y = 0; y < newMaze.length; y++) {
      for (let x = 0; x < newMaze[y].length; x++) {
        if (newMaze[y][x] === "start") {
          setAgentPos({ x, y });
          setStartPos({ x, y }); // <-- mémorise la position de départ
        }
        if (newMaze[y][x] === "goal") setGoalPos({ x, y });
      }
    }

    resetQTable();
  };

  const handleStep = () => {
    doQLearningStep();
  };

  return (
    <div className="my-4 flex flex-wrap items-center justify-center gap-2">
      <button
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        onClick={toggleLearning}
      >
        {isLearning ? "⏸️ Pause" : "▶️ Démarrer"}
      </button>

      <button
        className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        onClick={handleStep}
      >
        🐾 Pas à pas
      </button>

      <button
        className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
        onClick={handleReset}
      >
        🔄 Nouveau labyrinthe
      </button>
      <div className="mt-2 text-center text-sm text-gray-600">
        Épisodes terminés :{" "}
        <span className="font-semibold">{episodeCount}</span>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={stopAtGoal}
          onChange={(e) => setStopAtGoal(e.target.checked)}
          id="auto-stop"
        />
        <label htmlFor="auto-stop">Arrêt automatique à la sortie</label>
      </div>
    </div>
  );
};
