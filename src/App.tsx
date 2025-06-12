import "./App.css";
import { Controls } from "./components/Controls";
import { Maze } from "./components/Maze";
import { useMazeStore } from "./store/useMazeStore";
import { generateMaze } from "./utils/mazeGenerator";

const maze = generateMaze(15, 15);
useMazeStore.getState().setMaze(maze);

function App() {
  return (
    <div className="p-4 max-w-screen-sm mx-auto">
      <h1 className="text-xl font-bold text-center mb-4">
        Agent Q-Learning dans un Labyrinthe
      </h1>
      <Controls />
      <Maze />
    </div>
  );
}

export default App;
