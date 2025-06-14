import { create } from "zustand";

type Direction = "up" | "down" | "left" | "right";

type Position = { x: number; y: number };

type CellType = "wall" | "empty" | "start" | "goal";

type Maze = CellType[][];

type QTable = Record<string, Record<Direction, number>>;

interface MazeStore {
  maze: Maze;
  size: number;
  agentPos: Position;
  goalPos: Position;
  qTable: QTable;
  isLearning: boolean;

  setMaze: (maze: Maze) => void;
  setAgentPos: (pos: Position) => void;
  setGoalPos: (pos: Position) => void;
  resetQTable: () => void;
  setQValue: (pos: Position, dir: Direction, value: number) => void;
  getQValue: (pos: Position, dir: Direction) => number;
  toggleLearning: () => void;

  stopAtGoal: boolean;
  setStopAtGoal: (val: boolean) => void;

  episodeCount: number;
  incrementEpisode: () => void;
  resetEpisode: () => void;

  resetAgentPos: () => void;
  startPos: Position;
  setStartPos: (pos: Position) => void;
}

export const useMazeStore = create<MazeStore>((set, get) => ({
  maze: [],
  size: 15,
  agentPos: { x: 0, y: 0 },
  goalPos: { x: 9, y: 9 },
  qTable: {},
  isLearning: false,

  setMaze: (maze) => set({ maze }),
  setAgentPos: (pos) => set({ agentPos: pos }),
  setGoalPos: (pos) => set({ goalPos: pos }),
  toggleLearning: () => set((s) => ({ isLearning: !s.isLearning })),

  resetQTable: () => set({ qTable: {} }),

  setQValue: (pos, dir, value) => {
    const key = `${pos.x},${pos.y}`;
    const table = { ...get().qTable };
    if (!table[key]) table[key] = { up: 0, down: 0, left: 0, right: 0 };
    table[key][dir] = value;
    set({ qTable: table });
  },

  getQValue: (pos, dir) => {
    const key = `${pos.x},${pos.y}`;
    return get().qTable[key]?.[dir] ?? 0;
  },

  stopAtGoal: true,
  setStopAtGoal: (val) => set({ stopAtGoal: val }),

  episodeCount: 0,
  incrementEpisode: () => set((s) => ({ episodeCount: s.episodeCount + 1 })),
  resetEpisode: () => set({ episodeCount: 0 }),

  startPos: { x: 0, y: 0 },
  setStartPos: (pos) => set({ startPos: pos }),
  resetAgentPos: () => {
    const { startPos, setAgentPos } = get();
    setAgentPos(startPos);
  },
}));
