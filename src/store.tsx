import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { dicts, type Lang, type TKey } from "./i18n";
import {
  DEFAULT_USER,
  MOCK_NEWS,
  MOCK_NOTIFS,
  MOCK_ORDERS,
  MOCK_TX,
  PICKUP_POINTS,
  type Notif,
  type Order,
  type OrderStatus,
  type Tx,
} from "./data";

export type Theme = "light" | "dark" | "system";
export type Reaction = "like" | "dislike" | null;
export type ChatMsg = { id: string; text: string; out: boolean; time: string; img?: string };

type User = typeof DEFAULT_USER;

type State = {
  lang: Lang;
  theme: Theme;
  registered: boolean;
  user: User;
  pickupId: string;
  orders: Order[];
  balance: number;
  bonus: number;
  txs: Tx[];
  notifs: Notif[];
  reactions: Record<string, Reaction>;
  chat: ChatMsg[];
};

const LS_KEY = "avalin.state.v1";

const initial: State = {
  lang: "ru",
  theme: "light",
  registered: false,
  user: DEFAULT_USER,
  pickupId: "p1",
  orders: MOCK_ORDERS,
  balance: 688,
  bonus: 35,
  txs: MOCK_TX,
  notifs: MOCK_NOTIFS,
  reactions: {},
  chat: [
    {
      id: "c1",
      text: "Здравствуйте! Это служба поддержки Avalin Cargo. Чем можем помочь?",
      out: false,
      time: "20:58",
    },
  ],
};

function load(): State {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return initial;
    const saved = JSON.parse(raw) as Partial<State>;
    return { ...initial, ...saved, user: { ...initial.user, ...(saved.user ?? {}) } };
  } catch {
    return initial;
  }
}

type Ctx = {
  s: State;
  t: (k: TKey) => string;
  set: <K extends keyof State>(k: K, v: State[K]) => void;
  setUser: (patch: Partial<User>) => void;
  toast: (msg: string, icon?: string) => void;
  toasts: ToastItem[];
  dismissToast: (id: number) => void;
  copy: (text: string, msg?: string) => void;
  // domain actions
  addOrder: (track: string, title: string) => boolean;
  payOrder: (id: string) => void;
  topUp: (amount: number, method: string) => void;
  react: (newsId: string, r: Exclude<Reaction, null>) => void;
  newsCounts: (id: string) => { likes: number; dislikes: number };
  sendMsg: (text: string, img?: string) => void;
  readAll: () => void;
  readOne: (id: string) => void;
  unreadCount: number;
  pickup: (typeof PICKUP_POINTS)[number];
  reset: () => void;
  register: (u: { phone: string; firstName: string; lastName: string }) => void;
};

export type ToastItem = {
  id: number;
  msg: string;
  icon?: string;
  title?: string;
  kind?: "info" | "push" | "error";
  leaving?: boolean;
};

const AppCtx = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [s, setS] = useState<State>(load);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const tid = useRef(0);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(s));
    } catch {
      /* ignore */
    }
  }, [s]);

  useEffect(() => {
    const root = document.documentElement;
    const apply = () => {
      const dark =
        s.theme === "dark" ||
        (s.theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
      root.setAttribute("data-theme", dark ? "dark" : "light");
    };
    apply();
    if (s.theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [s.theme]);

  const t = useCallback((k: TKey) => dicts[s.lang][k] ?? String(k), [s.lang]);

  const set = useCallback(<K extends keyof State>(k: K, v: State[K]) => {
    setS((p) => ({ ...p, [k]: v }));
  }, []);

  const setUser = useCallback((patch: Partial<User>) => {
    setS((p) => ({ ...p, user: { ...p.user, ...patch } }));
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((p) => p.map((x) => (x.id === id ? { ...x, leaving: true } : x)));
    setTimeout(() => setToasts((p) => p.filter((x) => x.id !== id)), 320);
  }, []);

  const pushToast = useCallback(
    (item: Omit<ToastItem, "id">) => {
      const id = ++tid.current;
      // toasts stay until swiped away; keep at most 3 on screen
      setToasts((p) => [...p.slice(-2), { ...item, id }]);
    },
    [],
  );

  const toast = useCallback(
    (msg: string, icon = "check") =>
      pushToast({ msg, icon, kind: icon === "alert" || icon === "ban" ? "error" : "info" }),
    [pushToast],
  );

  // demo: a push notification arrives a few seconds after the app opens
  const pushed = useRef(false);
  useEffect(() => {
    if (!s.registered || pushed.current) return;
    const timer = setTimeout(() => {
      pushed.current = true;
      const n: Notif = {
        id: "nt" + Date.now(),
        title: dicts[s.lang].push_demo_title,
        body: dicts[s.lang].push_demo_body,
        time: dicts[s.lang].just_now,
        read: false,
      };
      setS((p) => ({ ...p, notifs: [n, ...p.notifs] }));
      pushToast({ kind: "push", icon: "bell", title: n.title, msg: n.body });
    }, 4500);
    return () => clearTimeout(timer);
  }, [s.registered, s.lang, pushToast]);

  const copy = useCallback(
    (text: string, msg?: string) => {
      const done = () => toast(msg ?? dicts[s.lang].copied, "copy");
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(done);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
        } catch {
          /* ignore */
        }
        document.body.removeChild(ta);
        done();
      }
    },
    [s.lang, toast],
  );

  const addOrder = useCallback(
    (track: string, title: string) => {
      const code = track.trim().toUpperCase();
      let ok = true;
      setS((p) => {
        if (p.orders.some((o) => o.track.toUpperCase() === code)) {
          ok = false;
          return p;
        }
        const now = new Date();
        const date = `${String(now.getDate()).padStart(2, "0")}.${String(now.getMonth() + 1).padStart(2, "0")}.${now.getFullYear()}`;
        const order: Order = {
          id: "u" + Date.now(),
          track: code,
          title: title.trim() || "Моя посылка",
          status: "waiting" as OrderStatus,
          paid: false,
          weight: 0,
          volume: 0,
          price: 0,
          createdAt: date,
          history: [{ status: "waiting", date }],
        };
        return { ...p, orders: [order, ...p.orders] };
      });
      return ok;
    },
    [],
  );

  const payOrder = useCallback((id: string) => {
    setS((p) => {
      const order = p.orders.find((o) => o.id === id);
      if (!order || order.paid) return p;
      const bonusUsed = Math.min(p.bonus, order.price);
      const rest = order.price - bonusUsed;
      if (rest > p.balance) return p;
      const now = new Date();
      const date = `${String(now.getDate()).padStart(2, "0")}.${String(now.getMonth() + 1).padStart(2, "0")}.${now.getFullYear()} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      return {
        ...p,
        balance: +(p.balance - rest).toFixed(2),
        bonus: +(p.bonus - bonusUsed).toFixed(2),
        orders: p.orders.map((o) => (o.id === id ? { ...o, paid: true } : o)),
        txs: [
          {
            id: "t" + Date.now(),
            type: "payment",
            title: `Оплата заказа ${order.track}`,
            amount: -order.price,
            date,
          },
          ...p.txs,
        ],
      };
    });
  }, []);

  const topUp = useCallback((amount: number, method: string) => {
    setS((p) => {
      const now = new Date();
      const date = `${String(now.getDate()).padStart(2, "0")}.${String(now.getMonth() + 1).padStart(2, "0")}.${now.getFullYear()} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      return {
        ...p,
        balance: +(p.balance + amount).toFixed(2),
        txs: [
          { id: "t" + Date.now(), type: "topup", title: `Пополнение · ${method}`, amount, date },
          ...p.txs,
        ],
      };
    });
  }, []);

  const react = useCallback((newsId: string, r: Exclude<Reaction, null>) => {
    setS((p) => ({
      ...p,
      reactions: { ...p.reactions, [newsId]: p.reactions[newsId] === r ? null : r },
    }));
  }, []);

  const newsCounts = useCallback(
    (id: string) => {
      const base = MOCK_NEWS.find((n) => n.id === id);
      const r = s.reactions[id];
      return {
        likes: (base?.likes ?? 0) + (r === "like" ? 1 : 0),
        dislikes: (base?.dislikes ?? 0) + (r === "dislike" ? 1 : 0),
      };
    },
    [s.reactions],
  );

  const sendMsg = useCallback((text: string, img?: string) => {
    const time = new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
    const msg: ChatMsg = { id: "m" + Date.now(), text, out: true, time, ...(img ? { img } : {}) };
    setS((p) => ({ ...p, chat: [...p.chat, msg] }));
    const replies = img
      ? ["Фото получили, спасибо! Оператор проверит посылку и ответит в течение нескольких минут."]
      : [
          "Спасибо за обращение! Оператор проверяет информацию по вашему трек-коду.",
          "Ваш груз находится на складе в Иу. Ожидайте отправку в ближайшие 2 дня.",
          "Уточните, пожалуйста, ваш трек-код — проверим статус прямо сейчас.",
          "Оплатить заказ можно в разделе «Кошелек» → «Пополнить», затем в деталях заказа.",
        ];
    const reply = replies[Math.floor(Math.random() * replies.length)];
    setTimeout(() => {
      setS((p) => ({
        ...p,
        chat: [
          ...p.chat,
          {
            id: "m" + Date.now() + "r",
            text: reply,
            out: false,
            time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
          },
        ],
      }));
    }, 1100);
  }, []);

  const readAll = useCallback(() => {
    setS((p) => ({ ...p, notifs: p.notifs.map((n) => ({ ...n, read: true })) }));
  }, []);

  const readOne = useCallback((id: string) => {
    setS((p) => ({ ...p, notifs: p.notifs.map((n) => (n.id === id ? { ...n, read: true } : n)) }));
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(LS_KEY);
    setS(initial);
  }, []);

  const register = useCallback((u: { phone: string; firstName: string; lastName: string }) => {
    const code = "AV" + String(Math.floor(1000 + Math.random() * 9000));
    setS((p) => ({
      ...p,
      registered: true,
      user: {
        ...p.user,
        phone: u.phone,
        firstName: u.firstName,
        lastName: u.lastName,
        name: `${u.firstName} ${u.lastName}`.trim(),
        code,
      },
    }));
  }, []);

  const unreadCount = useMemo(() => s.notifs.filter((n) => !n.read).length, [s.notifs]);
  const pickup = useMemo(
    () => PICKUP_POINTS.find((p) => p.id === s.pickupId) ?? PICKUP_POINTS[0],
    [s.pickupId],
  );

  const value: Ctx = {
    s,
    t,
    set,
    setUser,
    toast,
    toasts,
    dismissToast,
    copy,
    addOrder,
    payOrder,
    topUp,
    react,
    newsCounts,
    sendMsg,
    readAll,
    readOne,
    unreadCount,
    pickup,
    reset,
    register,
  };

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const c = useContext(AppCtx);
  if (!c) throw new Error("useApp outside provider");
  return c;
}

export const money = (n: number, cur = "TJS") =>
  `${n.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${cur}`;

export const usd = (n: number) =>
  `${n.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
