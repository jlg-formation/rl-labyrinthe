import { useAdvancedSettings } from "../store/useAdvancedSettings";
import { useEffect, useState } from "react";

export default function Advanced() {
  const settings = useAdvancedSettings();
  const [local, setLocal] = useState({ ...settings });

  useEffect(() => {
    settings.loadFromSession();
    setLocal({ ...useAdvancedSettings.getState() });
  }, []);

  const handleChange = (key: keyof typeof local, value: any) => {
    setLocal({ ...local, [key]: value });
  };

  const handleApply = () => {
    Object.entries(local).forEach(([key, value]) => {
      if (typeof settings.set === "function") {
        settings.set(key as any, value);
      }
    });
    alert("✅ Paramètres appliqués.");
  };

  const handleReset = () => {
    settings.reset();
    setLocal({ ...useAdvancedSettings.getState() });
    alert("🔄 Paramètres réinitialisés.");
  };

  return (
    <div className="mx-auto max-w-screen-md p-4">
      <h1 className="mb-6 text-2xl font-bold">Paramètres avancés</h1>

      <div className="grid gap-4">
        <Field
          label="Taux d'apprentissage (alpha)"
          min={0}
          max={1}
          step={0.01}
          value={local.alpha}
          onChange={(v) => handleChange("alpha", v)}
        />
        <Field
          label="Facteur de réduction (gamma)"
          min={0}
          max={1}
          step={0.01}
          value={local.gamma}
          onChange={(v) => handleChange("gamma", v)}
        />
        <Field
          label="Exploration initiale (epsilon)"
          min={0}
          max={1}
          step={0.01}
          value={local.epsilon}
          onChange={(v) => handleChange("epsilon", v)}
        />

        <div>
          <label className="mb-1 block font-medium">
            Mode de décroissance de ε
          </label>
          <select
            className="w-full rounded border p-2"
            value={local.epsilonDecay}
            onChange={(e) => handleChange("epsilonDecay", e.target.value)}
          >
            <option value="fixed">Fixe</option>
            <option value="linear">Linéaire</option>
            <option value="exponential">Exponentielle</option>
          </select>
        </div>

        <Field
          label="Délai entre les pas (ms)"
          min={10}
          max={1000}
          step={10}
          value={local.stepDelayMs}
          onChange={(v) => handleChange("stepDelayMs", v)}
        />
        <Field
          label="Récompense sortie"
          min={0}
          max={500}
          step={10}
          value={local.rewardGoal}
          onChange={(v) => handleChange("rewardGoal", v)}
        />
        <Field
          label="Pénalité mur"
          min={-100}
          max={0}
          step={1}
          value={local.rewardWall}
          onChange={(v) => handleChange("rewardWall", v)}
        />
        <Field
          label="Pénalité déplacement"
          min={-10}
          max={0}
          step={0.5}
          value={local.rewardStep}
          onChange={(v) => handleChange("rewardStep", v)}
        />
        <Field
          label="Taille du labyrinthe"
          min={5}
          max={31}
          step={2}
          value={local.mazeSize}
          onChange={(v) => handleChange("mazeSize", v)}
        />

        <div className="mt-6 flex gap-4">
          <button
            onClick={handleApply}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            ✅ Appliquer
          </button>
          <button
            onClick={handleReset}
            className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
          >
            🔄 Réinitialiser
          </button>
        </div>
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
};

const Field = ({ label, value, min, max, step, onChange }: FieldProps) => (
  <div>
    <label className="mb-1 block font-medium">{label}</label>
    <div className="flex items-center gap-4">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="flex-1"
      />
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-20 rounded border p-1"
      />
    </div>
  </div>
);
