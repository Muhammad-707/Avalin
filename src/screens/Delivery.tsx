import { useMemo, useState } from "react";
import Icon from "../components/Icon";
import { Hero, PageHeader, Sheet } from "../components/UI";
import { money, useApp } from "../store";

const DELIVERY_PRICE = 25;

export default function Delivery() {
  const { t, s, toast, pickup } = useApp();
  const [picked, setPicked] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [addr, setAddr] = useState("");
  const [phone, setPhone] = useState(s.user.phone);
  const [comment, setComment] = useState("");

  const ready = useMemo(() => s.orders.filter((o) => o.status === "ready"), [s.orders]);
  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const send = () => {
    if (!addr.trim()) return;
    setOpen(false);
    setPicked([]);
    setAddr("");
    setComment("");
    toast(t("request_sent"), "truck");
  };

  return (
    <div className="scroll fade-in">
      <PageHeader title={t("door_delivery")} />
      <Hero icon="truck" title={t("door_delivery")} sub={t("door_sub")} variant="soft" />

      {ready.length === 0 ? (
        <div
          className="card"
          style={{ marginTop: 14, background: "var(--blue-50)", borderColor: "var(--blue-100)" }}
        >
          <div className="empty">
            <div className="ic" style={{ background: "var(--blue-100)" }}>
              <Icon name="box" size={26} />
            </div>
            <h3>{t("no_delivery")}</h3>
            <p>{t("no_delivery_sub")}</p>
          </div>
        </div>
      ) : (
        <>
          <div className="section-title">{t("ready_orders")}</div>
          <div className="stack" style={{ gap: 12 }}>
            {ready.map((o) => {
              const on = picked.includes(o.id);
              return (
                <button
                  key={o.id}
                  className="card"
                  style={{
                    padding: 14,
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                    textAlign: "left",
                    borderColor: on ? "var(--blue)" : "var(--line)",
                  }}
                  onClick={() => toggle(o.id)}
                >
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 8,
                      border: `2px solid ${on ? "var(--blue)" : "var(--line)"}`,
                      background: on ? "var(--blue)" : "transparent",
                      color: "#fff",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    {on && <Icon name="check" size={14} stroke={3} />}
                  </span>
                  <span className="grow">
                    <span className="track" style={{ display: "block", fontSize: 14.5 }}>
                      {o.track}
                    </span>
                    <span style={{ display: "block", fontSize: 13, color: "var(--muted)", marginTop: 2 }}>
                      {o.title} · {o.weight} кг
                    </span>
                  </span>
                  <span
                    className="badge"
                    style={{
                      background: o.paid ? "var(--green-50)" : "var(--red-50)",
                      color: o.paid ? "var(--green)" : "var(--red)",
                    }}
                  >
                    {o.paid ? t("order_paid") : `${o.price} TJS`}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="card" style={{ padding: 16, marginTop: 14 }}>
            <div className="between" style={{ marginBottom: 10 }}>
              <span style={{ fontSize: 13.5, color: "var(--muted)" }}>{t("delivery_cost")}</span>
              <span style={{ fontSize: 17, fontWeight: 800 }}>{money(DELIVERY_PRICE)}</span>
            </div>
            <div className="row" style={{ gap: 7, fontSize: 12.5, color: "var(--muted)", marginBottom: 12 }}>
              <Icon name="pin" size={14} />
              {pickup.name}
            </div>
            <button className="btn btn-primary" disabled={picked.length === 0} onClick={() => setOpen(true)}>
              <Icon name="truck" size={18} />
              {t("request_delivery")} ({picked.length})
            </button>
          </div>
        </>
      )}

      <Sheet open={open} onClose={() => setOpen(false)} title={t("request_delivery")} sub={t("door_sub")}>
        <div className="field-label">{t("delivery_addr")}</div>
        <div className="input-wrap">
          <span className="input-ic">
            <Icon name="pin" size={16} />
          </span>
          <input value={addr} onChange={(e) => setAddr(e.target.value)} placeholder={t("enter_addr")} autoFocus />
        </div>

        <div className="field-label" style={{ marginTop: 14 }}>
          {t("phone")}
        </div>
        <div className="input-wrap">
          <span className="input-ic">
            <Icon name="phone" size={16} />
          </span>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>

        <div className="field-label" style={{ marginTop: 14 }}>
          {t("comment")}
        </div>
        <div className="input-wrap">
          <span className="input-ic">
            <Icon name="edit" size={16} />
          </span>
          <input value={comment} onChange={(e) => setComment(e.target.value)} placeholder="..." />
        </div>

        <div className="between" style={{ marginTop: 16, fontSize: 14 }}>
          <span className="muted">{t("delivery_cost")}</span>
          <b>{money(DELIVERY_PRICE)}</b>
        </div>

        <button className="btn btn-primary" style={{ marginTop: 14 }} onClick={send} disabled={!addr.trim()}>
          <Icon name="send" size={17} />
          {t("send_request")}
        </button>
      </Sheet>
    </div>
  );
}
