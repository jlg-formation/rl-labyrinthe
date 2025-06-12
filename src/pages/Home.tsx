import { Maze } from "../components/Maze";
import { Controls } from "../components/Controls";

export default function Home() {
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
