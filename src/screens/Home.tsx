import { useNavigate } from "react-router-dom";
import Icon, { type IconName } from "../components/Icon";
import { MarketLogo } from "../components/Art";
import Banners from "../components/Banners";
import { UserAvatar } from "../components/UI";
import { money, useApp } from "../store";
import { IN_TRANSIT, MARKETPLACES, WAREHOUSE } from "../data";

const QUICK: { key: "quick_tariffs" | "quick_calc" | "quick_delivery" | "quick_lessons" | "quick_news"; icon: IconName; to: string }[] = [
  { key: "quick_tariffs", icon: "chart", to: "/tariffs" },
  { key: "quick_calc", icon: "calculator", to: "/calculator" },
  { key: "quick_delivery", icon: "truck", to: "/delivery" },
  { key: "quick_lessons", icon: "play", to: "/lessons" },
  { key: "quick_news", icon: "megaphone", to: "/news" },
];

export default function Home() {
  const nav = useNavigate();
  const { t, s, copy, unreadCount, pickup } = useApp();

  const inTransit = s.orders.filter((o) => IN_TRANSIT.includes(o.status)).length;

  const fullAddress = `${WAREHOUSE.contact}\n${WAREHOUSE.phone}\n${WAREHOUSE.address.replace(/\n/g, " ")}`;

  return (
    <div className="scroll">
      <div className="home-top">
        <div className="home-head">
          <UserAvatar onClick={() => nav("/profile")} />
          <div className="grow" onClick={() => nav("/profile")} style={{ cursor: "pointer" }}>
            <div className="home-name ellipsis">{s.user.name}</div>
            <div className="home-phone">{s.user.phone}</div>
          </div>
          <button className={`bell ${unreadCount > 0 ? "ringing" : ""}`} key={unreadCount} onClick={() => nav("/notifications")} aria-label="notifications">
            <Icon name="bell" size={21} stroke={2.1} />
            {unreadCount > 0 && <span className="bell-badge">{unreadCount > 9 ? "9+" : unreadCount}</span>}
          </button>
        </div>
      </div>

      <div className="home-lift">
        <Banners />
      </div>

      <div className="home-stats">
        <button className="home-stat" onClick={() => nav("/wallet")}>
          <span className="ic">
            <Icon name="wallet" size={18} />
          </span>
          <span className="grow">
            <b>{money(s.balance)}</b>
            <span>{t("balance")}</span>
          </span>
        </button>
        <button className="home-stat" onClick={() => nav("/orders/list/intransit")}>
          <span className="ic">
            <Icon name="truck" size={18} />
          </span>
          <span className="grow">
            <b>{inTransit}</b>
            <span>{t("active_orders")}</span>
          </span>
        </button>
      </div>

      <div className="quick">
        {QUICK.map((q) => (
          <button className="quick-item" key={q.key} onClick={() => nav(q.to)}>
            <span className="quick-tile">
              <Icon name={q.icon} size={22} />
            </span>
            <span className="quick-label">{t(q.key)}</span>
          </button>
        ))}
      </div>

      <div className="section-title">{t("marketplaces")}</div>
      <div className="mk-scroll">
        {MARKETPLACES.map((m) => (
          <button className="mk-item" key={m.id} onClick={() => nav(`/lessons?m=${m.id}`)}>
            <MarketLogo m={m} />
            <span className="mk-name">{m.name}</span>
          </button>
        ))}
      </div>

      <div style={{ height: 18 }} />
      <button className="wide-card" onClick={() => nav("/referral")}>
        <span className="ic">
          <Icon name="gift" size={22} />
        </span>
        <span className="grow">
          <span className="wide-title" style={{ display: "block" }}>
            {t("earn_title")}
          </span>
          <span className="wide-sub" style={{ display: "block" }}>
            {t("earn_sub")}
          </span>
        </span>
        <Icon name="chevronRight" size={20} />
      </button>

      <div style={{ height: 12 }} />
      <button className="wide-card" onClick={() => nav("/pickup")}>
        <span className="ic">
          <Icon name="pin" size={22} />
        </span>
        <span className="grow">
          <span className="wide-label" style={{ display: "block" }}>
            {t("pickup_choose")}
          </span>
          <span className="wide-title" style={{ display: "block", fontSize: 15.5, marginTop: 2 }}>
            {t("pickup_current")}: {pickup.name}
          </span>
        </span>
        <Icon name="chevronDown" size={20} />
      </button>

      <div style={{ height: 12 }} />
      <div className="card" style={{ padding: 16 }}>
        <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 6 }}>{t("copy_address")}</div>

        <div className="addr-row">
          <span className="addr-chip">联系人</span>
          <span className="grow addr-value">
            {WAREHOUSE.contact}
            <button className="copy-btn" onClick={() => copy(WAREHOUSE.contact)}>
              <Icon name="copy" size={15} />
            </button>
          </span>
          <span className="addr-label">{t("client_id")}</span>
        </div>

        <div className="addr-row">
          <span className="addr-chip">联系电话</span>
          <span className="grow addr-value">
            {WAREHOUSE.phone}
            <button className="copy-btn" onClick={() => copy(WAREHOUSE.phone)}>
              <Icon name="copy" size={15} />
            </button>
          </span>
          <span className="addr-label">{t("warehouse_phone")}</span>
        </div>

        <div className="addr-row" style={{ alignItems: "flex-start" }}>
          <span className="addr-chip">收货地址</span>
          <span className="grow addr-value" style={{ whiteSpace: "pre-line", fontSize: 13.5 }}>
            {WAREHOUSE.address}
            <button className="copy-btn" onClick={() => copy(WAREHOUSE.address.replace(/\n/g, " "))}>
              <Icon name="copy" size={15} />
            </button>
          </span>
          <span className="addr-label" style={{ paddingTop: 2 }}>
            {t("address")}
          </span>
        </div>

        <button className="btn btn-primary" style={{ marginTop: 12 }} onClick={() => copy(fullAddress)}>
          {t("copy_all")}
          <Icon name="copy" size={17} />
        </button>
      </div>
    </div>
  );
}
