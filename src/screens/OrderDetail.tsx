import { useNavigate, useParams } from "react-router-dom";
import Icon from "../components/Icon";
import { PageHeader, Empty, Note } from "../components/UI";
import { STATUS_FLOW, STATUS_META } from "../data";
import { money, useApp } from "../store";
import type { TKey } from "../i18n";

export default function OrderDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const { t, s, payOrder, toast, pickup, copy } = useApp();
  const order = s.orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="scroll fade-in">
        <PageHeader title={t("order_detail")} />
        <div className="card">
          <Empty title={t("no_orders")} />
        </div>
      </div>
    );
  }

  const meta = STATUS_META[order.status];
  const idx = STATUS_FLOW.indexOf(order.status);
  const bonusUsed = Math.min(s.bonus, order.price);
  const rest = +(order.price - bonusUsed).toFixed(2);

  const pay = () => {
    if (rest > s.balance) {
      toast(t("not_enough"), "alert");
      nav("/wallet");
      return;
    }
    payOrder(order.id);
    toast(t("paid_done"));
  };

  const info = [
    { icon: "scale" as const, label: t("order_weight"), value: `${order.weight} кг` },
    { icon: "cube" as const, label: t("order_volume"), value: `${order.volume} м³` },
    { icon: "calendar" as const, label: t("order_created"), value: order.createdAt },
    { icon: "pin" as const, label: t("order_pickup"), value: pickup.name },
  ];

  return (
    <div className="scroll fade-in">
      <PageHeader title={t("order_detail")} />

      <div className="card" style={{ padding: 16 }}>
        <div className="between">
          <div>
            <div className="track" style={{ fontSize: 18 }}>
              {order.track}
            </div>
            <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 3 }}>{order.title}</div>
          </div>
          <button className="copy-btn" onClick={() => copy(order.track)}>
            <Icon name="copy" size={18} />
          </button>
        </div>

        <div style={{ marginTop: 12 }}>
          <span className="badge" style={{ background: meta.bg, color: meta.color, fontSize: 12.5, padding: "7px 11px" }}>
            <Icon name={meta.icon} size={14} />
            {t(meta.key as TKey).replace("\n", " ")}
          </span>
        </div>

        <div className="grid2" style={{ gap: 10, marginTop: 14 }}>
          {info.map((i) => (
            <div key={i.label} style={{ background: "var(--card-alt)", borderRadius: 14, padding: 12 }}>
              <div className="row" style={{ gap: 6, color: "var(--muted)", fontSize: 12 }}>
                <Icon name={i.icon} size={13} />
                {i.label}
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 5, lineHeight: 1.25 }}>{i.value}</div>
            </div>
          ))}
        </div>

        {order.price > 0 && (
          <div
            className="between"
            style={{
              marginTop: 14,
              padding: "13px 14px",
              borderRadius: 14,
              background: order.paid ? "var(--green-50)" : "var(--blue-50)",
            }}
          >
            <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text-2)" }}>
              {order.paid ? t("order_paid") : t("order_price")}
            </span>
            <span style={{ fontSize: 19, fontWeight: 800, color: order.paid ? "var(--green)" : "var(--blue)" }}>
              {money(order.price)}
            </span>
          </div>
        )}

        {!order.paid && order.price > 0 && (
          <>
            {bonusUsed > 0 && (
              <div style={{ marginTop: 10 }}>
                <Note>
                  {t("bonuses")}: −{money(bonusUsed)} · {t("order_price")}: {money(rest)}
                </Note>
              </div>
            )}
            <button className="btn btn-primary" style={{ marginTop: 12 }} onClick={pay}>
              <Icon name="card" size={18} />
              {t("order_pay")}
            </button>
          </>
        )}
      </div>

      <div className="section-title">{t("order_history")}</div>
      <div className="card" style={{ padding: "18px 16px 18px 6px" }}>
        <div className="tl">
          {STATUS_FLOW.map((st, i) => {
            const hist = order.history.find((h) => h.status === st);
            const done = i <= idx;
            return (
              <div className={`tl-item ${done ? "done" : ""}`} key={st}>
                <div className="tl-title" style={{ color: done ? "var(--text)" : "var(--muted)" }}>
                  {t(STATUS_META[st].key as TKey).replace("\n", " ")}
                </div>
                <div className="tl-date">{hist ? hist.date : "—"}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
