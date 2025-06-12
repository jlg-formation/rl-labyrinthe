import { useMazeStore } from "../store/useMazeStore";
import { generateMaze } from "../utils/mazeGenerator";

export const Controls: React.FC = () => {
  const {
    isLearning,
    toggleLearning,
    resetQTable,
    setMaze,
    size,
    setAgentPos,
    setGoalPos,
  } = useMazeStore();

  const handleReset = () => {
    const newMaze = generateMaze(size, size);
    setMaze(newMaze);

    // Recherche des positions start et goal dans la grille
    for (let y = 0; y < newMaze.length; y++) {
      for (let x = 0; x < newMaze[y].length; x++) {
        if (newMaze[y][x] === "start") setAgentPos({ x, y });
        if (newMaze[y][x] === "goal") setGoalPos({ x, y });
      }
    }

    resetQTable();
  };

  const handleStep = () => {
    // À implémenter : une étape de Q-learning
    console.log("Un pas d’apprentissage");
  };

  return (
    <div className="flex flex-wrap gap-2 items-center justify-center my-4">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={toggleLearning}
      >
        {isLearning ? "⏸️ Pause" : "▶️ Démarrer"}
      </button>

      <button
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={handleStep}
      >
        🐾 Pas à pas
      </button>

      <button
        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        onClick={handleReset}
      >
        🔄 Nouveau labyrinthe
      </button>
    </div>
  );
};
