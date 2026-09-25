import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import { Note, PageHeader } from "../components/UI";
import { TARIFFS } from "../data";
import { usd, useApp } from "../store";

type Mode = "weight" | "volume";

export default function Tariffs() {
  const nav = useNavigate();
  const { t } = useApp();
  const [mode, setMode] = useState<Mode>("weight");
  const rows = mode === "volume" ? TARIFFS.volume : TARIFFS.weight;
  const unit = (m: Mode) => (m === "volume" ? "м³" : "кг");

  return (
    <div className="scroll tf">
      <PageHeader title={t("quick_tariffs")} />

      <section className="tf-hero">
        <div className="tf-hero-head">
          <span className="tf-hero-ic">
            <Icon name="chart" size={21} />
          </span>
          <span>
            <b>{t("tariffs_title")}</b>
            <small>{t("tariffs_sub")}</small>
          </span>
        </div>
        <div className="tf-prices">
          {(["weight", "volume"] as const).map((m) => (
            <button key={m} className={`tf-price ${mode === m ? "on" : ""}`} onClick={() => setMode(m)}>
              <span className="tf-price-top">
                <Icon name={m === "volume" ? "cube" : "scale"} size={15} />
                {m === "volume" ? t("by_volume") : t("by_weight")}
              </span>
              <span className="tf-price-num">
                ${usd((m === "volume" ? TARIFFS.volume : TARIFFS.weight)[0].price)}
              </span>
              <span className="tf-price-unit">/ 1 {unit(m)}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="section-title">
        <Icon name="ticket" size={17} />
        {t("tf_grid")}
      </div>
      <div className="tf-grid">
        {rows.map((r, i) => (
          <div className="tf-row" key={i}>
            <span className="tf-step">{i + 1}</span>
            <span className="grow">
              <b>
                {t("from")} {r.from} {unit(mode)}
              </b>
              <small>{mode === "volume" ? t("per_m3") : t("per_kg")}</small>
            </span>
            <span className="tf-row-price">
              ${usd(r.price)}
              <small>USD</small>
            </span>
          </div>
        ))}
      </div>

      <div className="section-title">
        <Icon name="calculator" size={17} />
        {t("tf_how")}
      </div>
      <div className="tf-formula">
        <div className="tf-fx">
          <span className="tf-fx-box">
            <Icon name="scale" size={16} />
            <span>
              {t("tf_weight")} × ${usd(TARIFFS.weight[0].price)}
            </span>
          </span>
          <span className="tf-fx-or">vs</span>
          <span className="tf-fx-box">
            <Icon name="cube" size={16} />
            <span>
              {t("tf_volume")} × ${usd(TARIFFS.volume[0].price)}
            </span>
          </span>
        </div>
        <div className="tf-fx-res">
          <Icon name="checkCircle" size={16} />
          {t("tf_max")}
        </div>
      </div>

      <div style={{ height: 12 }} />
      <Note>{t("tariff_note")}</Note>

      <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => nav("/calculator")}>
        <Icon name="calculator" size={18} />
        {t("tf_calc")}
      </button>
    </div>
  );
}
