import { useState } from "react";
import Icon, { type IconName } from "../components/Icon";
import { Empty, PageHeader } from "../components/UI";
import { useApp } from "../store";
import type { Notif } from "../data";

/* pick an icon + tint from what the notification is about */
function kindOf(n: Notif): { icon: IconName; color: string; bg: string } {
  const s = (n.title + " " + n.body).toLowerCase();
  if (/утилиз/.test(s)) return { icon: "trash", color: "var(--red)", bg: "var(--red-50)" };
  if (/бонус|реферал|даъват/.test(s)) return { icon: "gift", color: "var(--amber)", bg: "var(--amber-50)" };
  if (/тариф|авиа/.test(s)) return { icon: "truck", color: "var(--teal)", bg: "var(--teal-50)" };
  if (/независим|праздн|🇹🇯/.test(s)) return { icon: "star", color: "var(--purple)", bg: "var(--purple-50)" };
  if (/посылк|заказ|сортир|прибы|борхо|расид|выдач/.test(s)) return { icon: "box", color: "var(--blue)", bg: "var(--blue-50)" };
  return { icon: "bell", color: "var(--blue)", bg: "var(--blue-50)" };
}

export default function Notifications() {
  const { t, s, readAll, readOne, unreadCount, toast } = useApp();
  const [openId, setOpenId] = useState<string | null>(null);
  const [tab, setTab] = useState<"all" | "unread">("all");

  const fresh = s.notifs.filter((n) => !n.read);
  const earlier = tab === "all" ? s.notifs.filter((n) => n.read) : [];

  const card = (n: Notif, i: number) => {
    const open = openId === n.id;
    const k = kindOf(n);
    return (
      <button
        key={n.id}
        className={`nt ${n.read ? "" : "unread"} ${open ? "open" : ""}`}
        style={{ animationDelay: `${i * 0.04}s` }}
        onClick={() => {
          setOpenId(open ? null : n.id);
          readOne(n.id);
        }}
      >
        <span className="nt-ic" style={{ background: k.bg, color: k.color }}>
          <Icon name={k.icon} size={20} />
        </span>
        <span className="grow">
          <span className="nt-head">
            <span className="nt-title">{n.title}</span>
            <span className="nt-time">
              {n.time}
              {!n.read && <i className="nt-dot" />}
            </span>
          </span>
          <span className="nt-body">{n.body}</span>
          <span className="nt-more">
            {open ? t("nt_collapse") : t("show_full")}
            <Icon name="chevronDown" size={14} stroke={2.6} />
          </span>
        </span>
      </button>
    );
  };

  return (
    <div className="scroll fade-in">
      <PageHeader title={t("notifications")} />

      <div className="nt-bar">
        <div className="nt-tabs">
          <button className={tab === "all" ? "on" : ""} onClick={() => setTab("all")}>
            {t("nt_all")}
            <b>{s.notifs.length}</b>
          </button>
          <button className={tab === "unread" ? "on" : ""} onClick={() => setTab("unread")}>
            {t("nt_unread")}
            {unreadCount > 0 && <b className="hot">{unreadCount}</b>}
          </button>
        </div>
        <button
          className="nt-readall"
          disabled={unreadCount === 0}
          onClick={() => {
            readAll();
            toast(t("read_all"), "doubleCheck");
          }}
          aria-label={t("read_all")}
          title={t("read_all")}
        >
          <Icon name="doubleCheck" size={19} stroke={2.2} />
        </button>
      </div>

      {s.notifs.length === 0 || (tab === "unread" && fresh.length === 0) ? (
        <div className="card">
          <Empty icon="bell" title={s.notifs.length ? t("nt_all_read") : t("no_notifications")} />
        </div>
      ) : (
        <>
          {fresh.length > 0 && (
            <>
              <div className="nt-group">{t("nt_new")}</div>
              <div className="nt-list">{fresh.map(card)}</div>
            </>
          )}
          {earlier.length > 0 && (
            <>
              <div className="nt-group">{t("nt_earlier")}</div>
              <div className="nt-list">{earlier.map(card)}</div>
            </>
          )}
        </>
      )}
    </div>
  );
}
