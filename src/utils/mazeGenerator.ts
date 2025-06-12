import { useAdvancedSettings } from "../store/useAdvancedSettings";

type CellType = "wall" | "empty" | "start" | "goal";
type Maze = CellType[][];

type Direction = [number, number];
const directions: Direction[] = [
  [0, -1], // haut
  [0, 1], // bas
  [-1, 0], // gauche
  [1, 0], // droite
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

/**
 * Génère un labyrinthe parfait (1 seul chemin entre chaque point)
 * de taille `width` x `height` (valeurs impaires recommandées)
 */
export function generateMaze(width: number, height: number): Maze {
  const size = useAdvancedSettings.getState().mazeSize;

  const maze: CellType[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => "wall"),
  );

  // Point de départ (coordonnées impaires)
  const startX = 1;
  const startY = 1;

  function carve(x: number, y: number) {
    maze[y][x] = "empty";

    for (const [dx, dy] of shuffle(directions)) {
      const nx = x + dx * 2;
      const ny = y + dy * 2;
      if (
        nx > 0 &&
        ny > 0 &&
        nx < width - 1 &&
        ny < height - 1 &&
        maze[ny][nx] === "wall"
      ) {
        maze[y + dy][x + dx] = "empty";
        carve(nx, ny);
      }
    }
  }

  carve(startX, startY);

  // Définir la case de départ et de sortie
  maze[startY][startX] = "start";
  maze[height - 2][width - 2] = "goal";

  return maze;
}
