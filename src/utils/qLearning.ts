import { useMazeStore } from "../store/useMazeStore";
import { useAdvancedSettings } from "../store/useAdvancedSettings";

type Direction = "up" | "down" | "left" | "right";
type Position = { x: number; y: number };

const directions: Record<Direction, [number, number]> = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
};

function isValidMove(maze: string[][], x: number, y: number): boolean {
  return (
    y >= 0 &&
    y < maze.length &&
    x >= 0 &&
    x < maze[0].length &&
    maze[y][x] !== "wall"
  );
}

function getReward(cell: string): number {
  const { rewardGoal, rewardWall, rewardStep } = useAdvancedSettings.getState();
  if (cell === "goal") return rewardGoal;
  if (cell === "wall") return rewardWall;
  return rewardStep;
}

/**
 * Un pas de Q-learning sur l’état courant.
 */
export function doQLearningStep() {
  const {
    maze,
    agentPos,
    setAgentPos,
    getQValue,
    setQValue,
    goalPos,
    isLearning,
    toggleLearning,
    stopAtGoal,
    incrementEpisode,
  } = useMazeStore.getState();

  const { alpha, gamma, epsilon } = useAdvancedSettings.getState();

  const state = agentPos;
  const actions: Direction[] = ["up", "down", "left", "right"];

  // 1. Choix de l’action (ε-greedy)
  const action =
    Math.random() < epsilon
      ? actions[Math.floor(Math.random() * actions.length)]
      : actions.reduce(
          (best, a) =>
            getQValue(state, a) > getQValue(state, best) ? a : best,
          actions[0],
        );

  const [dx, dy] = directions[action];
  const newX = state.x + dx;
  const newY = state.y + dy;

  const nextPos: Position = { x: newX, y: newY };
  const valid = isValidMove(maze, newX, newY);
  const nextCell = valid ? maze[newY][newX] : "wall";
  const reward = getReward(nextCell);

  // 2. Mise à jour de Q(s, a)
  const nextState = valid ? nextPos : state;
  const maxNextQ = Math.max(...actions.map((a) => getQValue(nextState, a)));
  const oldQ = getQValue(state, action);
  const newQ = oldQ + alpha * (reward + gamma * maxNextQ - oldQ);

  setQValue(state, action, newQ);

  // 3. Mise à jour de l’état si déplacement valide
  if (valid) setAgentPos(nextPos);

  // 4. Réduction progressive de epsilon (exploration diminue)
  // epsilon = Math.max(0.01, epsilon * 0.995);

  if (valid && nextPos.x === goalPos.x && nextPos.y === goalPos.y) {
    incrementEpisode();

    if (stopAtGoal && isLearning) {
      toggleLearning();
      console.log("🎯 Sortie atteinte, apprentissage arrêté.");
    } else {
      // Continue l'apprentissage : recommence depuis le départ
      useMazeStore.getState().resetAgentPos();
    }
  }
}
