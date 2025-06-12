import { create } from "zustand";

type DecayMode = "fixed" | "linear" | "exponential";

interface AdvancedSettings {
  alpha: number;
  gamma: number;
  epsilon: number;
  epsilonDecay: DecayMode;
  stepDelayMs: number;
  rewardGoal: number;
  rewardWall: number;
  rewardStep: number;
  mazeSize: number;

  set: <K extends keyof AdvancedSettings>(
    key: K,
    value: AdvancedSettings[K]
  ) => void;
  reset: () => void;
  loadFromSession: () => void;
}

const DEFAULTS: Omit<AdvancedSettings, "set" | "reset" | "loadFromSession"> = {
  alpha: 0.1,
  gamma: 0.95,
  epsilon: 0.2,
  epsilonDecay: "exponential",
  stepDelayMs: 50,
  rewardGoal: 100,
  rewardWall: -10,
  rewardStep: -1,
  mazeSize: 15,
};

export const useAdvancedSettings = create<AdvancedSettings>((set, get) => {
  const save = (values: Partial<AdvancedSettings>) => {
    const toSave = { ...get(), ...values };
    sessionStorage.setItem("advancedSettings", JSON.stringify(toSave));
  };

  const load = () => {
    const raw = sessionStorage.getItem("advancedSettings");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        set({ ...DEFAULTS, ...parsed });
      } catch (e) {
        set(DEFAULTS);
      }
    } else {
      set(DEFAULTS);
    }
  };

  return {
    ...DEFAULTS,

    set: (key, value) => {
      set({ [key]: value });
      save({ [key]: value });
    },

    reset: () => {
      set(DEFAULTS);
      sessionStorage.removeItem("advancedSettings");
    },

    loadFromSession: () => {
      load();
    },
  };
});
