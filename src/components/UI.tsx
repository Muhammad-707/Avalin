import { useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import Icon, { type IconName } from "./Icon";
import { useApp } from "../store";

/* ------------------------------------------------------------ bottom nav */

type NavKey = "home" | "chat" | "wallet" | "options" | "box";

/* duotone icons: `shape` gets a soft fill (solid when active), `detail` is drawn on top */
const NAV_ICONS: Record<NavKey, { shape: string; detail: string }> = {
  home: {
    shape: "M3.5 10.2 12 3.2l8.5 7V19a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z",
    detail: "M9.5 21v-5a2.5 2.5 0 0 1 5 0v5",
  },
  chat: {
    shape: "M12 3.5c4.7 0 8.5 3.3 8.5 7.5s-3.8 7.5-8.5 7.5c-1 0-2-.2-2.9-.5L4.5 20l1.1-3.6A7.2 7.2 0 0 1 3.5 11c0-4.2 3.8-7.5 8.5-7.5Z",
    detail: "M8.2 11h.01M12 11h.01M15.8 11h.01",
  },
  wallet: {
    shape: "M3.5 8A2.5 2.5 0 0 1 6 5.5h12A2.5 2.5 0 0 1 20.5 8v10a2.5 2.5 0 0 1-2.5 2.5H6A2.5 2.5 0 0 1 3.5 18z",
    detail: "M20.5 11.2h-3.8a1.8 1.8 0 0 0 0 3.6h3.8M6.5 5.5l8.2-2.3a1.5 1.5 0 0 1 1.9 1.4v.9",
  },
  options: {
    shape: "M4 5.5A1.5 1.5 0 0 1 5.5 4h3A1.5 1.5 0 0 1 10 5.5v3A1.5 1.5 0 0 1 8.5 10h-3A1.5 1.5 0 0 1 4 8.5zM14 5.5A1.5 1.5 0 0 1 15.5 4h3A1.5 1.5 0 0 1 20 5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 14 8.5zM4 15.5A1.5 1.5 0 0 1 5.5 14h3a1.5 1.5 0 0 1 1.5 1.5v3A1.5 1.5 0 0 1 8.5 20h-3A1.5 1.5 0 0 1 4 18.5z",
    detail: "M17 14v6M14 17h6",
  },
  box: {
    shape: "M12 2.8 20.2 7v10L12 21.2 3.8 17V7z",
    detail: "M3.8 7 12 11.3 20.2 7M12 11.3v9.9M7.9 4.9l8.2 4.3v3.3",
  },
};

function NavIcon({ name, active, size = 24 }: { name: NavKey; active?: boolean; size?: number }) {
  const ic = NAV_ICONS[name];
  return (
    <svg
      className={`nav-svg ${active ? "on" : ""}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path className="nav-shape" d={ic.shape} />
      <path className="nav-detail" d={ic.detail} />
    </svg>
  );
}

const NAV: { to: string; icon: NavKey; key: "nav_home" | "nav_chat" | "nav_wallet" | "nav_options" }[] = [
  { to: "/", icon: "home", key: "nav_home" },
  { to: "/chat", icon: "chat", key: "nav_chat" },
  { to: "/wallet", icon: "wallet", key: "nav_wallet" },
  { to: "/options", icon: "options", key: "nav_options" },
];

export function BottomNav() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const { t } = useApp();

  const isHome = pathname === "/" || ["/tariffs", "/calculator", "/delivery", "/lessons", "/news", "/referral", "/notifications"].some((p) => pathname.startsWith(p));
  const isOrders = pathname.startsWith("/orders");
  const isOptions = pathname.startsWith("/options") || ["/profile", "/pickup", "/language", "/info"].some((p) => pathname.startsWith(p));

  const on = (to: string) => {
    if (to === "/") return isHome;
    if (to === "/options") return isOptions;
    return pathname.startsWith(to);
  };

  const item = (n: (typeof NAV)[number]) => (
    <button key={n.to} className={`nav-item ${on(n.to) ? "on" : ""}`} onClick={() => nav(n.to)}>
      <span className="nav-pill">
        <NavIcon name={n.icon} active={on(n.to)} />
      </span>
      <span className="nav-label">{t(n.key)}</span>
    </button>
  );

  return (
    <nav className="nav">
      {NAV.slice(0, 2).map(item)}
      <div className="nav-fab-slot">
        <button className={`nav-fab ${isOrders ? "on" : ""}`} onClick={() => nav("/orders")} aria-label={t("nav_orders")}>
          <NavIcon name="box" active size={28} />
        </button>
        <span className={`nav-fab-label ${isOrders ? "on" : ""}`}>{t("nav_orders")}</span>
      </div>
      {NAV.slice(2).map(item)}
    </nav>
  );
}

/* ---------------------------------------------------------------- avatar */

export function UserAvatar({ size, onClick }: { size?: "lg"; onClick?: () => void }) {
  const { s } = useApp();
  const initials = ((s.user.firstName?.[0] ?? "") + (s.user.lastName?.[0] ?? "")).toUpperCase();
  // plain span when not clickable, so it can sit inside other buttons
  const Tag = onClick ? "button" : "span";
  return (
    <Tag className={`avatar ${size ?? ""}`} onClick={onClick} aria-label={s.user.name}>
      {s.user.avatar ? <img src={s.user.avatar} alt="" /> : initials || <Icon name="user" size={24} />}
    </Tag>
  );
}

/* ----------------------------------------------------------- page header */

export function PageHeader({ title, right }: { title: string; right?: ReactNode }) {
  const nav = useNavigate();
  return (
    <div className="page-head">
      <h1>{title}</h1>
      {right ?? (
        <button className="circle-btn" onClick={() => nav(-1)} aria-label="back">
          <Icon name="chevronLeft" size={20} stroke={2.4} />
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------- hero card */

export function Hero({
  icon,
  title,
  sub,
  variant = "blue",
  right,
}: {
  icon: IconName;
  title: string;
  sub?: string;
  variant?: "blue" | "orange" | "violet" | "soft" | "soft-violet";
  right?: ReactNode;
}) {
  return (
    <div className={`hero ${variant === "blue" ? "" : variant}`}>
      <div className="hero-icon">
        <Icon name={icon} size={23} />
      </div>
      <div className="grow">
        <div className="hero-title">{title}</div>
        {sub && <div className="hero-sub">{sub}</div>}
      </div>
      {right}
    </div>
  );
}

/* ----------------------------------------------------------------- sheet */

export function Sheet({
  open,
  onClose,
  title,
  sub,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  sub?: string;
  children: ReactNode;
}) {
  if (!open) return null;
  // render over the whole app frame, not inside the scrolled page (else it opens off-screen)
  const host = document.querySelector(".shell") ?? document.body;
  return createPortal(
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-grip" />
        {title && <h2>{title}</h2>}
        {sub && <p className="sub">{sub}</p>}
        {children}
      </div>
    </div>,
    host,
  );
}

/* ---------------------------------------------------------------- toasts */

/* a toast stays on screen until it is flicked left or right, like a phone notification */
function SwipeToast({ onGone, onTap, children }: { onGone: () => void; onTap?: () => void; children: ReactNode }) {
  const [dx, setDx] = useState(0);
  const [out, setOut] = useState(0); // -1 / 1 once flung away
  const drag = useRef<{ x: number; y: number; t: number; id: number; moved: boolean } | null>(null);

  const end = (x: number) => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    const dist = x - d.x;
    const speed = Math.abs(dist) / Math.max(1, performance.now() - d.t);
    if (Math.abs(dist) > 90 || (Math.abs(dist) > 30 && speed > 0.5)) {
      setOut(dist > 0 ? 1 : -1);
      setTimeout(onGone, 260);
    } else {
      setDx(0);
      if (!d.moved) onTap?.();
    }
  };

  return (
    <div
      className={`toast-swipe ${drag.current ? "dragging" : ""}`}
      style={{
        transform: out ? `translateX(${out * 130}%)` : `translateX(${dx}px) rotate(${dx / 40}deg)`,
        opacity: out ? 0 : 1 - Math.min(Math.abs(dx) / 260, 0.6),
      }}
      onPointerDown={(e) => {
        if (out) return;
        drag.current = { x: e.clientX, y: e.clientY, t: performance.now(), id: e.pointerId, moved: false };
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        const d = drag.current;
        if (!d || d.id !== e.pointerId) return;
        const dist = e.clientX - d.x;
        if (Math.abs(dist) > 6) d.moved = true;
        setDx(dist);
      }}
      onPointerUp={(e) => end(e.clientX)}
      onPointerCancel={() => {
        drag.current = null;
        setDx(0);
      }}
    >
      {children}
    </div>
  );
}

export function Toasts() {
  const { toasts, dismissToast, t } = useApp();
  const nav = useNavigate();
  return (
    <div className="toast-wrap">
      {toasts.map((x) =>
        x.kind === "push" ? (
          <SwipeToast
            key={x.id}
            onGone={() => dismissToast(x.id)}
            onTap={() => {
              dismissToast(x.id);
              nav("/notifications");
            }}
          >
            <div className={`toast push ${x.leaving ? "leaving" : ""}`} role="button">
              <span className="toast-app">
                <img src="/img/avalin-mark.webp" alt="" />
              </span>
              <span className="grow toast-body">
                <span className="toast-meta">
                  <b>Avalin Cargo</b>
                  <span>{t("just_now")}</span>
                </span>
                <span className="toast-title">{x.title}</span>
                <span className="toast-msg">{x.msg}</span>
              </span>
            </div>
          </SwipeToast>
        ) : (
          <SwipeToast key={x.id} onGone={() => dismissToast(x.id)}>
            <div className={`toast ${x.kind === "error" ? "error" : ""} ${x.leaving ? "leaving" : ""}`} role="status">
              <span className="toast-ic">
                <Icon name={(x.icon as IconName) ?? "check"} size={17} stroke={2.4} />
              </span>
              <span className="toast-msg">{x.msg}</span>
            </div>
          </SwipeToast>
        ),
      )}
    </div>
  );
}

/* ------------------------------------------------------------ empty state */

export function Empty({ icon = "box", title, text }: { icon?: IconName; title: string; text?: string }) {
  return (
    <div className="empty">
      <div className="ic">
        <Icon name={icon} size={26} />
      </div>
      <h3>{title}</h3>
      {text && <p>{text}</p>}
    </div>
  );
}

/* --------------------------------------------------------------- list row */

export function Row({
  icon,
  color = "var(--blue)",
  bg = "var(--blue-50)",
  title,
  value,
  onClick,
  chevron = true,
}: {
  icon: IconName;
  color?: string;
  bg?: string;
  title: string;
  value?: string;
  onClick?: () => void;
  chevron?: boolean;
}) {
  return (
    <button className="list-row" onClick={onClick}>
      <span className="row-ic" style={{ background: bg, color }}>
        <Icon name={icon} size={18} />
      </span>
      <span className="grow row-title">{title}</span>
      {value && <span className="row-value">{value}</span>}
      {chevron && (
        <span style={{ color: "var(--muted)", display: "grid" }}>
          <Icon name="chevronRight" size={18} />
        </span>
      )}
    </button>
  );
}

/* ------------------------------------------------------------------ misc */

export function Seg<T extends string>({
  value,
  onChange,
  items,
  orangeOn,
}: {
  value: T;
  onChange: (v: T) => void;
  items: { id: T; label: string; icon?: IconName }[];
  orangeOn?: T;
}) {
  return (
    <div className="seg">
      {items.map((it) => (
        <button
          key={it.id}
          className={`${value === it.id ? "on" : ""} ${orangeOn === it.id ? "orange" : ""}`}
          onClick={() => onChange(it.id)}
        >
          {it.icon && <Icon name={it.icon} size={17} />}
          {it.label}
        </button>
      ))}
    </div>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <div className="note">
      <span className="ic">
        <Icon name="info" size={17} />
      </span>
      <span>{children}</span>
    </div>
  );
}
