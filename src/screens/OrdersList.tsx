import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../components/Icon";
import { PageHeader } from "../components/UI";
import OrderCard from "../components/OrderCard";
import { IN_TRANSIT, STATUS_META, type OrderStatus } from "../data";
import { useApp } from "../store";
import type { TKey } from "../i18n";

export default function OrdersList() {
  const { key = "all" } = useParams();
  const nav = useNavigate();
  const { t, s } = useApp();

  const title =
    key === "all"
      ? t("st_all")
      : key === "unpaid"
        ? t("st_unpaid")
        : key === "intransit"
          ? t("chip_transit")
        : t(STATUS_META[key as OrderStatus]?.key as TKey);

  const list = useMemo(() => {
    if (key === "all") return s.orders;
    if (key === "unpaid") return s.orders.filter((o) => !o.paid && o.price > 0);
    if (key === "intransit") return s.orders.filter((o) => IN_TRANSIT.includes(o.status));
    return s.orders.filter((o) => o.status === key);
  }, [key, s.orders]);

  return (
    <div className="scroll fade-in">
      <PageHeader title={(title ?? "").replace("\n", " ")} />
      <div className="stack" style={{ gap: 12 }}>
        {list.length === 0 ? (
          <div className="card mascot-empty">
            <img className="ox-empty-img" src="/img/orders-mascot.webp" alt="" />
            <h3>{t("no_orders")}</h3>
            <p>{t("no_orders_sub")}</p>
            <button className="btn btn-orange" onClick={() => nav("/orders")}>
              <Icon name="plus" size={17} stroke={2.6} />
              {t("add_track")}
            </button>
          </div>
        ) : (
          list.map((o) => <OrderCard order={o} key={o.id} />)
        )}
      </div>
    </div>
  );
}
