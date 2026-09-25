import { useState } from "react";
import { Hero, PageHeader, Seg } from "../components/UI";
import { TARIFFS } from "../data";
import { usd, useApp } from "../store";

type Mode = "weight" | "volume";

const PRESETS: Record<Mode, number[]> = {
  weight: [1, 5, 10, 20, 50],
  volume: [0.05, 0.1, 0.5, 1],
};

export default function Calculator() {
  const { t } = useApp();
  const [mode, setMode] = useState<Mode>("weight");
  const [value, setValue] = useState("");
  const vol = mode === "volume";
  const unit = vol ? "м³" : "кг";
  const rate = vol ? TARIFFS.volume[0].price : TARIFFS.weight[0].price;

  // price updates live as the user types
  const v = parseFloat(value.replace(",", "."));
  const result = v > 0 ? +(v * rate).toFixed(2) : null;

  const switchMode = (m: Mode) => {
    setMode(m);
    setValue("");
  };

  return (
    <div className="scroll cx">
      <PageHeader title={t("quick_calc")} />
      <Hero icon="calculator" title={t("calc_title")} sub={t("calc_sub")} />

      <div style={{ height: 14 }} />
      <Seg
        value={mode}
        onChange={switchMode}
        items={[
          { id: "weight", label: t("by_weight"), icon: "scale" },
          { id: "volume", label: t("by_volume"), icon: "cube" },
        ]}
      />

      <div className="cx-card">
        <div className="cx-label">{vol ? t("volume_of_cargo") : t("weight_of_cargo")}</div>
        <label className="cx-field">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value.replace(/[^\d.,]/g, ""))}
            placeholder="0"
            inputMode="decimal"
          />
          <span>{unit}</span>
        </label>
        <div className="cx-label" style={{ marginTop: 14 }}>
          {t("cx_presets")}
        </div>
        <div className="cx-presets">
          {PRESETS[mode].map((p) => (
            <button key={p} className={String(p) === value ? "on" : ""} onClick={() => setValue(String(p))}>
              {p} {unit}
            </button>
          ))}
        </div>
      </div>

      <section className={`cx-result ${result === null ? "empty" : ""}`}>
        <div className="cx-result-top">
          <span>{t("result")}</span>
          <span className="cx-rate">
            ${usd(rate)} / {unit}
          </span>
        </div>
        {result === null ? (
          <p>{t("cx_empty")}</p>
        ) : (
          <>
            <div className="cx-sum">${usd(result)}</div>
            <div className="cx-break">
              {value} {unit} × ${usd(rate)} = ${usd(result)}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
