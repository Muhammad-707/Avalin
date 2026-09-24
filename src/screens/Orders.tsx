import { useMemo, useState } from "react";
import Icon from "../components/Icon";
import { Sheet } from "../components/UI";
import OrderCard from "../components/OrderCard";
import { IN_TRANSIT, type Order } from "../data";
import { useApp } from "../store";
import type { TKey } from "../i18n";

type Tab = "all" | "unpaid" | "intransit" | "ready";

const TABS: { key: Tab; tkey: TKey; match: (o: Order) => boolean }[] = [
  { key: "all", tkey: "chip_all", match: () => true },
  { key: "unpaid", tkey: "chip_unpaid", match: (o) => !o.paid && o.price > 0 },
  { key: "intransit", tkey: "chip_transit", match: (o) => IN_TRANSIT.includes(o.status) },
  { key: "ready", tkey: "chip_ready", match: (o) => o.status === "ready" },
];

export default function Orders() {
  const { t, s, addOrder, toast } = useApp();
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<Tab>("all");
  const [open, setOpen] = useState(false);
  const [track, setTrack] = useState("");
  const [descr, setDescr] = useState("");

  const counts = useMemo(
    () => Object.fromEntries(TABS.map((x) => [x.key, s.orders.filter(x.match).length])) as Record<Tab, number>,
    [s.orders],
  );
  const current = TABS.find((x) => x.key === tab)!;
  const list = useMemo(() => s.orders.filter(current.match), [s.orders, current]);

  const found = useMemo(() => {
    const v = q.trim().toLowerCase();
    if (!v) return [];
    return s.orders.filter(
      (o) => o.track.toLowerCase().includes(v) || o.title.toLowerCase().includes(v),
    );
  }, [q, s.orders]);

  const submit = () => {
    if (!track.trim()) return;
    const ok = addOrder(track, descr);
    toast(ok ? t("track_added") : t("track_exists"), ok ? "check" : "alert");
    if (ok) {
      setTrack("");
      setDescr("");
      setOpen(false);
    }
  };

  const empty = list.length === 0;

  return (
    <div className="scroll ox">
      <section className="ox-top">
        <div className="ox-top-row">
          <div>
            <h1>{t("orders_title")}</h1>
            <p>{t("orders_sub")}</p>
          </div>
          <button className="ox-top-btn" onClick={() => setOpen(true)} aria-label={t("add_track")}>
            <Icon name="plus" size={22} stroke={2.4} />
          </button>
        </div>
        <div className="ox-tabs">
          {TABS.map((x) => (
            <button key={x.key} className={tab === x.key ? "on" : ""} onClick={() => setTab(x.key)}>
              <b>{counts[x.key]}</b>
              <span>{t(x.tkey)}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="ox-search">
        <Icon name="search" size={19} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("search_track")} />
        {q && (
          <button className="ox-search-btn" onClick={() => setQ("")} aria-label="clear">
            <Icon name="close" size={17} />
          </button>
        )}
      </div>

      {q ? (
        found.length === 0 ? (
          <div className="ox-center">
            <img className="ox-mascot" src="/img/orders-mascot.webp" alt="" />
            <h3>{t("no_orders")}</h3>
            <p>{t("no_orders_sub")}</p>
          </div>
        ) : (
          <div className="stack" style={{ gap: 12 }}>
            {found.map((o) => (
              <OrderCard order={o} key={o.id} />
            ))}
          </div>
        )
      ) : (
        <>
          <div className="ox-center">
            <img className="ox-mascot" src="/img/orders-mascot.webp" alt="" />
            <h3>{empty ? t("no_orders") : t("orders_promo_title")}</h3>
            <p>{empty ? t("no_orders_sub") : t("orders_promo_sub")}</p>
            <button className="ox-cta" onClick={() => setOpen(true)}>
              <Icon name="plus" size={18} stroke={2.6} />
              {t("add_track_title")}
            </button>
          </div>

          {!empty && (
            <>
              <div className="ox-head">
                <h2>
                  {t(current.tkey)} <span>{list.length}</span>
                </h2>
              </div>
              <div className="stack" style={{ gap: 12 }}>
                {list.map((o) => (
                  <OrderCard order={o} key={o.id} />
                ))}
              </div>
            </>
          )}
        </>
      )}

      <Sheet open={open} onClose={() => setOpen(false)} title={t("add_track_title")} sub={t("add_track_sub")}>
        <label className="field" style={{ marginBottom: 14 }}>
          <div className="field-label">{t("track_code")}</div>
          <div className="input-wrap">
            <span className="input-ic">
              <Icon name="box" size={16} />
            </span>
            <input
              value={track}
              onChange={(e) => setTrack(e.target.value)}
              placeholder="AV7712000000"
              autoFocus
            />
          </div>
        </label>
        <label className="field" style={{ marginBottom: 18 }}>
          <div className="field-label">{t("descr_optional")}</div>
          <div className="input-wrap">
            <span className="input-ic">
              <Icon name="edit" size={16} />
            </span>
            <input value={descr} onChange={(e) => setDescr(e.target.value)} placeholder="Кроссовки, куртка..." />
          </div>
        </label>
        <button className="btn btn-primary" onClick={submit} disabled={!track.trim()}>
          <Icon name="plus" size={18} />
          {t("add")}
        </button>
      </Sheet>
    </div>
  );
}
