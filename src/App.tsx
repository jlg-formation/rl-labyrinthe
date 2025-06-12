import "./App.css";
import { Maze } from "./components/Maze";
import { useMazeStore } from "./store/useMazeStore";
import { generateMaze } from "./utils/mazeGenerator";

const maze = generateMaze(15, 15);
useMazeStore.getState().setMaze(maze);

function App() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold text-center mb-4">
        Labyrinthe Q-Learning
      </h1>
      <Maze />
    </div>
  );
}

export default App;
