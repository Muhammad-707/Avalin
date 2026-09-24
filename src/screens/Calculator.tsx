import { useState } from "react";
import Icon from "../components/Icon";
import { Hero, PageHeader, Seg } from "../components/UI";
import { TARIFFS } from "../data";
import { usd, useApp } from "../store";

export default function Calculator() {
  const { t } = useApp();
  const [mode, setMode] = useState<"weight" | "volume">("weight");
  const [value, setValue] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const vol = mode === "volume";
  const rate = vol ? TARIFFS.volume[0].price : TARIFFS.weight[0].price;

  const calc = () => {
    const v = parseFloat(value.replace(",", "."));
    if (!v || v <= 0) {
      setResult(null);
      return;
    }
    setResult(+(v * rate).toFixed(2));
  };

  const switchMode = (m: "weight" | "volume") => {
    setMode(m);
    setResult(null);
    setValue("");
  };

  return (
    <div className="scroll fade-in">
      <PageHeader title={t("quick_calc")} />
      <Hero icon="calculator" title={t("calc_title")} sub={t("calc_sub")} variant={vol ? "orange" : "blue"} />

      <div style={{ height: 14 }} />
      <Seg
        value={mode}
        onChange={switchMode}
        orangeOn="volume"
        items={[
          { id: "weight", label: t("by_weight"), icon: "scale" },
          { id: "volume", label: t("by_volume"), icon: "cube" },
        ]}
      />

      <div style={{ height: 14 }} />
      <div className="card" style={{ padding: 16 }}>
        <div className="field-label">{vol ? t("volume_of_cargo") : t("weight_of_cargo")}</div>
        <div className="input-wrap">
          <span className={`input-ic ${vol ? "orange" : ""}`}>
            <Icon name={vol ? "cube" : "scale"} size={16} />
          </span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value.replace(/[^\d.,]/g, ""))}
            placeholder={vol ? t("enter_volume") : t("enter_weight")}
            inputMode="decimal"
          />
          <span className="input-unit">{vol ? "м³" : "кг"}</span>
        </div>

        <button
          className={`btn ${vol ? "btn-orange" : "btn-primary"}`}
          style={{ marginTop: 14 }}
          onClick={calc}
          disabled={!value}
        >
          <Icon name="calculator" size={18} />
          {t("calculate")}
        </button>

        {result !== null && (
          <div
            className="between fade-in"
            style={{
              marginTop: 14,
              padding: "14px 16px",
              borderRadius: 14,
              background: vol ? "var(--orange-50)" : "var(--blue-50)",
            }}
          >
            <span>
              <span style={{ display: "block", fontSize: 12.5, color: "var(--muted)" }}>{t("result")}</span>
              <span style={{ display: "block", fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
                {t("rate")}: {usd(rate)} USD/{vol ? "м³" : "кг"}
              </span>
            </span>
            <span
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: vol ? "var(--orange-600)" : "var(--blue)",
                letterSpacing: -0.5,
              }}
            >
              {usd(result)} $
            </span>
          </div>
        )}
      </div>

      <div style={{ height: 14 }} />
      <div className="card" style={{ padding: 16 }}>
        <div className="row" style={{ gap: 8, marginBottom: 10 }}>
          <span style={{ color: vol ? "var(--orange)" : "var(--blue)", display: "grid" }}>
            <Icon name="ticket" size={17} />
          </span>
          <span style={{ fontSize: 15, fontWeight: 700 }}>{vol ? t("tariff_grid_v") : t("tariff_grid_w")}</span>
        </div>
        <div className="between" style={{ paddingTop: 8, borderTop: "1px solid var(--line)" }}>
          <span style={{ fontSize: 14, color: "var(--text-2)" }}>
            {t("from")} 0 {vol ? "м³" : "кг"}
          </span>
          <span style={{ fontSize: 15, fontWeight: 700, color: vol ? "var(--orange-600)" : "var(--blue)" }}>
            {usd(rate)} USD/{vol ? "м³" : "кг"}
          </span>
        </div>
      </div>
    </div>
  );
}
