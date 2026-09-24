import { useState } from "react";
import { Hero, Note, PageHeader, Seg } from "../components/UI";
import { TARIFFS } from "../data";
import { usd, useApp } from "../store";

export default function Tariffs() {
  const { t } = useApp();
  const [mode, setMode] = useState<"weight" | "volume">("volume");
  const vol = mode === "volume";
  const rows = vol ? TARIFFS.volume : TARIFFS.weight;

  return (
    <div className="scroll fade-in">
      <PageHeader title={t("quick_tariffs")} />
      <Hero
        icon="chart"
        title={t("tariffs_title")}
        sub={t("tariffs_sub")}
        variant={vol ? "orange" : "blue"}
      />

      <div style={{ height: 14 }} />
      <Seg
        value={mode}
        onChange={setMode}
        orangeOn="volume"
        items={[
          { id: "weight", label: t("by_weight"), icon: "scale" },
          { id: "volume", label: t("by_volume"), icon: "cube" },
        ]}
      />

      <div style={{ height: 14 }} />
      <div className="stack" style={{ gap: 10 }}>
        {rows.map((r, i) => (
          <div
            key={i}
            className="row"
            style={{
              gap: 12,
              background: vol ? "var(--orange-50)" : "var(--blue-50)",
              borderRadius: "var(--r-md)",
              padding: 14,
            }}
          >
            <span
              style={{
                width: 30,
                height: 30,
                borderRadius: 10,
                background: vol ? "#F5D9A8" : "var(--blue-100)",
                color: vol ? "var(--orange-600)" : "var(--blue)",
                display: "grid",
                placeItems: "center",
                fontWeight: 800,
                fontSize: 13,
              }}
            >
              {i + 1}
            </span>
            <span className="grow">
              <span style={{ display: "block", fontSize: 15, fontWeight: 700 }}>
                {t("from")} {r.from} {vol ? "м³" : "кг"}
              </span>
              <span style={{ display: "block", fontSize: 12.5, color: "var(--muted)", marginTop: 2 }}>
                {vol ? t("per_m3") : t("per_kg")}
              </span>
            </span>
            <span style={{ textAlign: "right" }}>
              <span
                style={{
                  display: "block",
                  fontSize: 20,
                  fontWeight: 800,
                  color: vol ? "var(--orange-600)" : "var(--blue)",
                }}
              >
                {usd(r.price)}
              </span>
              <span style={{ display: "block", fontSize: 11.5, color: "var(--muted)" }}>USD</span>
            </span>
          </div>
        ))}
      </div>

      <div style={{ height: 14 }} />
      <Note>{t("tariff_note")}</Note>
    </div>
  );
}
