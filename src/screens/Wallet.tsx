import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon, { type IconName } from "../components/Icon";
import { Empty, Sheet } from "../components/UI";
import { DEFAULT_USER, PAY_METHODS, type Tx } from "../data";
import { money, useApp } from "../store";
import type { TKey } from "../i18n";

const PRESETS = [50, 100, 200, 500];

type Filter = "all" | "in" | "out";
const FILTERS: { key: Filter; tkey: TKey }[] = [
  { key: "all", tkey: "tx_all" },
  { key: "in", tkey: "tx_in" },
  { key: "out", tkey: "tx_out" },
];

const TX_LOOK: Record<Tx["type"], { icon: IconName; color: string; bg: string }> = {
  topup: { icon: "plus", color: "var(--green)", bg: "var(--green-50)" },
  payment: { icon: "box", color: "var(--blue)", bg: "var(--blue-50)" },
  bonus: { icon: "gift", color: "var(--amber)", bg: "var(--amber-50)" },
};

export default function Wallet() {
  const nav = useNavigate();
  const { t, s, topUp, toast } = useApp();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("100");
  const [method, setMethod] = useState(PAY_METHODS[0].id);
  const [filter, setFilter] = useState<Filter>("all");

  const { income, spent } = useMemo(
    () =>
      s.txs.reduce(
        (a, tx) => (tx.amount > 0 ? { ...a, income: a.income + tx.amount } : { ...a, spent: a.spent - tx.amount }),
        { income: 0, spent: 0 },
      ),
    [s.txs],
  );

  const txs = s.txs.filter((tx) => (filter === "all" ? true : filter === "in" ? tx.amount > 0 : tx.amount < 0));
  const [whole, cents] = money(s.balance, "").trim().split(",");

  const submit = () => {
    const v = parseFloat(amount.replace(",", "."));
    if (!v || v <= 0) return;
    topUp(v, PAY_METHODS.find((m) => m.id === method)!.name);
    toast(t("topup_done"), "wallet");
    setOpen(false);
  };

  const actions: { icon: IconName; label: string; onClick: () => void; gold?: boolean }[] = [
    { icon: "plus", label: t("topup"), onClick: () => setOpen(true), gold: true },
    { icon: "card", label: t("w_pay_orders"), onClick: () => nav("/orders/list/unpaid") },
    { icon: "gift", label: t("w_bonus"), onClick: () => nav("/referral") },
  ];

  return (
    <div className="scroll wx">
      <div className="wx-head">
        <h1>{t("nav_wallet")}</h1>
        <p>{t("wallet_sub")}</p>
      </div>

      <section className="wx-card">
        <div className="wx-card-top">
          <span className="wx-brand">
            <img src="/img/avalin-mark.webp" alt="" />
            Avalin Pay
          </span>
          <span className="wx-chip" />
        </div>
        <div className="wx-label">{t("balance")}</div>
        <div className="wx-amount">
          {whole}
          <small>,{cents} TJS</small>
        </div>
        <div className="wx-card-bottom">
          <span className="wx-id">ID · {s.user.code || DEFAULT_USER.code}</span>
          <span className="wx-bonus">
            <Icon name="gift" size={14} />
            {money(s.bonus)}
          </span>
        </div>
      </section>

      <div className="wx-actions">
        {actions.map((a) => (
          <button key={a.label} className={`wx-act ${a.gold ? "gold" : ""}`} onClick={a.onClick}>
            <span className="wx-act-ic">
              <Icon name={a.icon} size={20} stroke={2.3} />
            </span>
            {a.label}
          </button>
        ))}
      </div>

      <div className="wx-stats">
        <div className="wx-stat in">
          <span className="wx-stat-ic">
            <Icon name="plus" size={15} stroke={2.6} />
          </span>
          <span>
            <small>{t("w_income")}</small>
            <b>+{money(income)}</b>
          </span>
        </div>
        <div className="wx-stat out">
          <span className="wx-stat-ic">
            <Icon name="card" size={15} stroke={2.4} />
          </span>
          <span>
            <small>{t("w_spent")}</small>
            <b>−{money(spent)}</b>
          </span>
        </div>
      </div>

      <div className="wx-list-head">
        <h2>{t("tx_history")}</h2>
        <div className="wx-seg">
          {FILTERS.map((f) => (
            <button key={f.key} className={filter === f.key ? "on" : ""} onClick={() => setFilter(f.key)}>
              {t(f.tkey)}
            </button>
          ))}
        </div>
      </div>

      {txs.length === 0 ? (
        <div className="card">
          <Empty icon="wallet" title={t("no_tx")} />
        </div>
      ) : (
        <div className="wx-list">
          {txs.map((tx, i) => {
            const look = TX_LOOK[tx.type];
            const positive = tx.amount > 0;
            return (
              <div className="wx-tx" key={tx.id} style={{ animationDelay: `${i * 0.035}s` }}>
                <span className="wx-tx-ic" style={{ background: look.bg, color: look.color }}>
                  <Icon name={look.icon} size={18} />
                </span>
                <span className="grow">
                  <span className="wx-tx-title">{tx.title}</span>
                  <span className="wx-tx-date">{tx.date}</span>
                </span>
                <span className={`wx-tx-sum ${positive ? "pos" : ""}`}>
                  {positive ? "+" : "−"}
                  {Math.abs(tx.amount).toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <Sheet open={open} onClose={() => setOpen(false)} title={t("topup_title")} sub={t("topup_sub")}>
        <div className="field-label">{t("amount")}</div>
        <div className="input-wrap">
          <span className="input-ic">
            <Icon name="wallet" size={16} />
          </span>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^\d.,]/g, ""))}
            inputMode="decimal"
            autoFocus
          />
          <span className="input-unit">TJS</span>
        </div>

        <div className="row" style={{ gap: 8, marginTop: 10 }}>
          {PRESETS.map((p) => (
            <button
              key={p}
              className={`chip ${String(p) === amount ? "on" : ""}`}
              style={{
                flex: 1,
                justifyContent: "center",
                padding: "10px 0",
                background: String(p) === amount ? "var(--blue-50)" : "var(--card)",
                color: String(p) === amount ? "var(--blue)" : "var(--text-2)",
                border: "1px solid var(--line)",
              }}
              onClick={() => setAmount(String(p))}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="field-label" style={{ marginTop: 18 }}>
          {t("pay_method")}
        </div>
        <div className="list">
          {PAY_METHODS.map((m) => (
            <button className="list-row" key={m.id} onClick={() => setMethod(m.id)}>
              <span className="row-ic" style={{ background: "var(--blue-50)", color: "var(--blue)" }}>
                <Icon name={m.icon} size={17} />
              </span>
              <span className="grow row-title">{m.name}</span>
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  border: `2px solid ${method === m.id ? "var(--blue)" : "var(--line)"}`,
                  display: "grid",
                  placeItems: "center",
                  color: "var(--blue)",
                }}
              >
                {method === m.id && <Icon name="check" size={13} stroke={3} />}
              </span>
            </button>
          ))}
        </div>

        <button className="btn btn-primary" style={{ marginTop: 18 }} onClick={submit}>
          <Icon name="plusCircle" size={18} />
          {t("topup_btn")}
        </button>
      </Sheet>
    </div>
  );
}
