import { useMemo, useState } from "react";
import Icon from "../components/Icon";
import { PageHeader } from "../components/UI";
import Select from "../components/Select";
import { MapMock } from "../components/Art";
import { CITIES, PICKUP_POINTS } from "../data";
import { useApp } from "../store";

export default function Pickup() {
  const { t, s, set, toast, pickup } = useApp();
  const [city, setCity] = useState(pickup.city);
  const [kind, setKind] = useState<"point" | "postamat">("point");
  const [mapOpen, setMapOpen] = useState(false);

  const list = useMemo(
    () => PICKUP_POINTS.filter((p) => p.city === city && p.type === kind),
    [city, kind],
  );

  const choose = (id: string) => {
    set("pickupId", id);
    toast(t("pickup_saved"), "pin");
  };

  return (
    <div className="scroll fade-in">
      <PageHeader title={t("pickup_point")} />

      <div className="wide-card" style={{ alignItems: "flex-start" }}>
        <span className="ic">
          <Icon name="pin" size={21} />
        </span>
        <span className="grow">
          <span className="wide-label" style={{ display: "block" }}>
            {t("current_pickup")}
          </span>
          <span className="wide-title" style={{ display: "block", marginTop: 2 }}>
            {pickup.name}
          </span>
          <span className="wide-sub" style={{ display: "block", marginTop: 4, lineHeight: 1.4 }}>
            {pickup.address}
          </span>
        </span>
      </div>

      <div className="row section-title" style={{ gap: 8 }}>
        <Icon name="map" size={18} className="muted" />
        {t("cities")}
      </div>

      <Select
        value={city}
        onChange={setCity}
        icon="pin"
        label={t("cities")}
        options={CITIES.map((c) => ({
          value: c,
          label: c,
          hint: `${t("pickup_points")}: ${PICKUP_POINTS.filter((p) => p.city === c).length}`,
        }))}
      />

      <div style={{ height: 14 }} />
      <div className="pills">
        <button className={kind === "point" ? "on" : ""} onClick={() => setKind("point")}>
          <span className="row" style={{ gap: 7, justifyContent: "center" }}>
            <Icon name="pin" size={16} /> {t("pickup_points")}
          </span>
        </button>
        <button className={kind === "postamat" ? "on" : ""} onClick={() => setKind("postamat")}>
          <span className="row" style={{ gap: 7, justifyContent: "center" }}>
            <Icon name="inbox" size={16} /> {t("postamats")}
          </span>
        </button>
      </div>

      <div style={{ height: 12 }} />
      <button
        className="card"
        style={{ display: "flex", alignItems: "center", gap: 12, padding: 14, width: "100%", textAlign: "left" }}
        onClick={() => setMapOpen((v) => !v)}
      >
        <span className="row-ic" style={{ background: "var(--gray-50)", color: "var(--text-2)" }}>
          <Icon name="map" size={18} />
        </span>
        <span className="grow">
          <span style={{ display: "block", fontSize: 15, fontWeight: 700 }}>{t("choose_on_map")}</span>
          <span style={{ display: "block", fontSize: 12.5, color: "var(--muted)", marginTop: 2 }}>
            {t("choose_on_map_sub")}
          </span>
        </span>
        <Icon name={mapOpen ? "chevronDown" : "chevronRight"} size={18} className="muted" />
      </button>

      {mapOpen && (
        <div style={{ marginTop: 12 }} className="fade-in">
          <MapMock
            pins={PICKUP_POINTS.filter((p) => p.city === city).map((p) => ({
              id: p.id,
              x: p.x,
              y: p.y,
              type: p.type,
            }))}
            activeId={s.pickupId}
            onPin={choose}
          />
        </div>
      )}

      <div className="row section-title" style={{ gap: 8 }}>
        <Icon name="pin" size={18} className="muted" />
        {kind === "point" ? t("pickup_list") : t("postamat_list")}
      </div>

      <div className="stack" style={{ gap: 12 }}>
        {list.map((p) => {
          const active = p.id === s.pickupId;
          return (
            <button
              key={p.id}
              className="card"
              style={{
                padding: 14,
                textAlign: "left",
                borderColor: active ? "var(--blue)" : "var(--line)",
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
              }}
              onClick={() => choose(p.id)}
            >
              <span
                className="row-ic"
                style={{
                  background: active ? "var(--blue)" : p.type === "postamat" ? "var(--orange-50)" : "var(--blue-50)",
                  color: active ? "#fff" : p.type === "postamat" ? "var(--orange)" : "var(--blue)",
                  marginTop: 2,
                }}
              >
                <Icon name={p.type === "postamat" ? "inbox" : "pin"} size={17} />
              </span>
              <span className="grow">
                <span style={{ display: "block", fontSize: 15, fontWeight: 700 }}>{p.name}</span>
                <span
                  style={{ display: "block", fontSize: 12.5, color: "var(--muted)", marginTop: 4, lineHeight: 1.45 }}
                >
                  {p.address}
                </span>
                <span className="row" style={{ gap: 6, marginTop: 7, fontSize: 12, color: "var(--text-2)" }}>
                  <Icon name="clock" size={13} />
                  {p.hours}
                </span>
              </span>
              {active ? (
                <span className="badge" style={{ background: "var(--blue-50)", color: "var(--blue)" }}>
                  <Icon name="check" size={12} stroke={3} />
                  {t("selected")}
                </span>
              ) : (
                <Icon name="chevronRight" size={18} className="muted" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
