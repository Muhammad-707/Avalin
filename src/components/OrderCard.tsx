import { useNavigate } from "react-router-dom";
import Icon from "./Icon";
import { STATUS_META, type Order } from "../data";
import { useApp } from "../store";
import type { TKey } from "../i18n";

export default function OrderCard({ order }: { order: Order }) {
  const nav = useNavigate();
  const { t } = useApp();
  const meta = STATUS_META[order.status];

  return (
    <button className="order-card" onClick={() => nav(`/orders/o/${order.id}`)}>
      <div className="between" style={{ marginBottom: 8 }}>
        <span className="track">{order.track}</span>
        <span className="badge" style={{ background: meta.bg, color: meta.color }}>
          <Icon name={meta.icon} size={13} />
          {t(meta.key as TKey).replace("\n", " ")}
        </span>
      </div>
      <div className="row" style={{ gap: 10 }}>
        <span className="grow ellipsis" style={{ fontSize: 14, color: "var(--text-2)" }}>
          {order.title}
        </span>
        {order.price > 0 && (
          <span
            className="badge"
            style={{
              background: order.paid ? "var(--green-50)" : "var(--red-50)",
              color: order.paid ? "var(--green)" : "var(--red)",
            }}
          >
            {order.paid ? t("order_paid") : `${order.price} TJS`}
          </span>
        )}
      </div>
      <div className="row" style={{ gap: 14, marginTop: 9, fontSize: 12, color: "var(--muted)" }}>
        <span className="row" style={{ gap: 5 }}>
          <Icon name="scale" size={13} /> {order.weight} кг
        </span>
        <span className="row" style={{ gap: 5 }}>
          <Icon name="cube" size={13} /> {order.volume} м³
        </span>
        <span className="row" style={{ gap: 5 }}>
          <Icon name="calendar" size={13} /> {order.createdAt}
        </span>
      </div>
    </button>
  );
}
