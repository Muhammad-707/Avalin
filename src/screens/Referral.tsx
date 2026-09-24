import { useState } from "react";
import Icon from "../components/Icon";
import { Empty, PageHeader } from "../components/UI";
import { MOCK_REFERRALS, REFERRAL } from "../data";
import { money, useApp } from "../store";

export default function Referral() {
  const { t, s, copy, toast } = useApp();
  const [tab, setTab] = useState<"cond" | "refs" | "hist">("cond");

  const earned = MOCK_REFERRALS.reduce((a, r) => a + r.earned, 0);
  const bonusTx = s.txs.filter((x) => x.type === "bonus");

  const share = () => {
    const text = `Присоединяйся к ${t("appName")}! Мой реферальный код: ${s.user.code}`;
    if (navigator.share) {
      navigator.share({ title: t("appName"), text }).catch(() => copy(text));
    } else {
      copy(text);
    }
    toast(t("copied"), "share");
  };

  const conds = [
    { icon: "chart" as const, label: t("pct_of_order"), value: `${REFERRAL.pct}%` },
    { icon: "ticket" as const, label: t("welcome_you"), value: `${REFERRAL.welcomeYou} TJS` },
    { icon: "ticket" as const, label: t("welcome_friend"), value: `${REFERRAL.welcomeFriend} TJS` },
    { icon: "shield" as const, label: t("max_bonus_pay"), value: `${REFERRAL.maxBonusPay}%` },
    { icon: "clock" as const, label: t("bonus_life"), value: `${REFERRAL.bonusLifeDays} ${t("days")}` },
  ];

  return (
    <div className="scroll fade-in">
      <PageHeader title={t("ref_title")} />

      <div
        style={{
          background: "var(--grad-primary)",
          color: "#fff",
          borderRadius: "var(--r-lg)",
          padding: 16,
          boxShadow: "var(--shadow-primary)",
        }}
      >
        <div className="row" style={{ gap: 14 }}>
          <span
            style={{
              width: 46,
              height: 46,
              borderRadius: 14,
              background: "rgba(255,255,255,.22)",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            <Icon name="gift" size={22} />
          </span>
          <span className="grow">
            <span style={{ display: "block", fontSize: 17, fontWeight: 700 }}>{t("ref_head")}</span>
            <span style={{ display: "block", fontSize: 12.5, opacity: 0.85, marginTop: 3 }}>
              {t("ref_head_sub")}
            </span>
          </span>
        </div>

        <div
          className="row"
          style={{
            marginTop: 14,
            background: "rgba(255,255,255,.14)",
            borderRadius: 14,
            padding: "12px 14px",
          }}
        >
          <span className="grow">
            <span style={{ display: "block", fontSize: 12, opacity: 0.85 }}>{t("bonus_balance")}</span>
            <span style={{ display: "block", fontSize: 19, fontWeight: 800, marginTop: 2 }}>
              {money(s.bonus)}
            </span>
          </span>
          <span style={{ width: 1, height: 34, background: "rgba(255,255,255,.3)" }} />
          <span style={{ paddingLeft: 14 }}>
            <span style={{ display: "block", fontSize: 12, opacity: 0.85 }}>{t("total_earned")}</span>
            <span style={{ display: "block", fontSize: 19, fontWeight: 800, marginTop: 2 }}>
              {money(earned)}
            </span>
          </span>
        </div>
      </div>

      <div style={{ height: 14 }} />
      <div className="card" style={{ padding: 16 }}>
        <div className="row" style={{ gap: 12, marginBottom: 14 }}>
          <span className="row-ic" style={{ background: "var(--blue-50)", color: "var(--blue)" }}>
            <Icon name="ticket" size={18} />
          </span>
          <span className="grow">
            <span style={{ display: "block", fontSize: 15, fontWeight: 700 }}>{t("your_code")}</span>
            <span style={{ display: "block", fontSize: 12.5, color: "var(--muted)", marginTop: 2 }}>
              {t("your_code_sub")}
            </span>
          </span>
        </div>

        <div className="ref-code">{s.user.code}</div>

        <div className="row" style={{ gap: 10, marginTop: 14 }}>
          <button className="btn btn-ghost" onClick={() => copy(s.user.code)}>
            <Icon name="copy" size={17} />
            {t("copy")}
          </button>
          <button className="btn btn-primary" onClick={share}>
            <Icon name="share" size={17} />
            {t("share")}
          </button>
        </div>
      </div>

      <div style={{ height: 14 }} />
      <div className="row" style={{ gap: 10 }}>
        {[
          { icon: "users" as const, value: MOCK_REFERRALS.length, label: t("invited"), bg: "var(--blue-50)", color: "var(--blue)" },
          { icon: "checkCircle" as const, value: MOCK_REFERRALS.filter((r) => r.status === "active").length, label: t("active"), bg: "var(--green-50)", color: "var(--green)" },
          { icon: "wallet" as const, value: 0, label: t("spent"), bg: "var(--amber-50)", color: "var(--orange)" },
        ].map((x) => (
          <div className="mini-stat grow" key={x.label}>
            <span
              style={{
                width: 34,
                height: 34,
                borderRadius: 11,
                background: x.bg,
                color: x.color,
                display: "grid",
                placeItems: "center",
                margin: "0 auto 8px",
              }}
            >
              <Icon name={x.icon} size={17} />
            </span>
            <div style={{ fontSize: 18, fontWeight: 800 }}>{x.value}</div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{x.label}</div>
          </div>
        ))}
      </div>

      <div style={{ height: 14 }} />
      <div className="pills">
        <button className={tab === "cond" ? "on" : ""} onClick={() => setTab("cond")}>
          {t("conditions")}
        </button>
        <button className={tab === "refs" ? "on" : ""} onClick={() => setTab("refs")}>
          {t("referrals")}
        </button>
        <button className={tab === "hist" ? "on" : ""} onClick={() => setTab("hist")}>
          {t("history")}
        </button>
      </div>

      <div style={{ height: 12 }} />
      {tab === "cond" && (
        <div className="list fade-in">
          {conds.map((c) => (
            <div className="list-row" key={c.label}>
              <span className="row-ic" style={{ background: "var(--blue-50)", color: "var(--blue)" }}>
                <Icon name={c.icon} size={17} />
              </span>
              <span className="grow row-title" style={{ fontWeight: 500 }}>
                {c.label}
              </span>
              <span style={{ fontSize: 15, fontWeight: 800 }}>{c.value}</span>
            </div>
          ))}
        </div>
      )}

      {tab === "refs" && (
        <div className="list fade-in">
          {MOCK_REFERRALS.length === 0 ? (
            <Empty icon="users" title={t("no_referrals")} text={t("no_referrals_sub")} />
          ) : (
            MOCK_REFERRALS.map((r) => (
              <div className="list-row" key={r.id}>
                <span className="row-ic" style={{ background: "var(--blue-50)", color: "var(--blue)" }}>
                  <Icon name="user" size={17} />
                </span>
                <span className="grow">
                  <span style={{ display: "block", fontSize: 14.5, fontWeight: 600 }}>{r.name}</span>
                  <span style={{ display: "block", fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
                    {r.date}
                  </span>
                </span>
                <span
                  className="badge"
                  style={{
                    background: r.status === "active" ? "var(--green-50)" : "var(--gray-50)",
                    color: r.status === "active" ? "var(--green)" : "var(--muted)",
                    marginRight: 8,
                  }}
                >
                  {r.status === "active" ? t("active") : "new"}
                </span>
                <span style={{ fontSize: 14, fontWeight: 800, color: "var(--green)" }}>
                  +{r.earned.toFixed(2)}
                </span>
              </div>
            ))
          )}
        </div>
      )}

      {tab === "hist" && (
        <div className="list fade-in">
          {bonusTx.length === 0 ? (
            <Empty icon="gift" title={t("no_bonus_history")} />
          ) : (
            bonusTx.map((x) => (
              <div className="list-row" key={x.id}>
                <span className="row-ic" style={{ background: "var(--amber-50)", color: "var(--orange)" }}>
                  <Icon name="gift" size={17} />
                </span>
                <span className="grow">
                  <span style={{ display: "block", fontSize: 14.5, fontWeight: 600 }}>{x.title}</span>
                  <span style={{ display: "block", fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
                    {x.date}
                  </span>
                </span>
                <span style={{ fontSize: 15, fontWeight: 800, color: "var(--green)" }}>
                  +{x.amount.toFixed(2)}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
