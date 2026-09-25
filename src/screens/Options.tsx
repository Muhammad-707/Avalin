import { useNavigate } from "react-router-dom";
import Icon, { type IconName } from "../components/Icon";
import { UserAvatar } from "../components/UI";
import { BRAND, DEFAULT_USER } from "../data";
import { useApp } from "../store";
import type { TKey } from "../i18n";

type Item = { icon: IconName; color: string; bg: string; tkey: TKey; to?: string; value?: string; onClick?: () => void };

export default function Options() {
  const nav = useNavigate();
  const { t, s, set, toast, pickup } = useApp();

  const groups: { tkey: TKey; items: Item[] }[] = [
    {
      tkey: "opt_account",
      items: [
        { icon: "user", color: "var(--blue)", bg: "var(--blue-50)", tkey: "profile_setup", to: "/profile" },
        { icon: "pin", color: "var(--teal)", bg: "var(--teal-50)", tkey: "pickup_point", to: "/pickup", value: pickup.name },
      ],
    },
    {
      tkey: "opt_info",
      items: [
        { icon: "ban", color: "var(--red)", bg: "var(--red-50)", tkey: "prohibited", to: "/info/prohibited" },
        { icon: "truck", color: "var(--amber)", bg: "var(--amber-50)", tkey: "terms", to: "/info/terms" },
        { icon: "card", color: "var(--blue)", bg: "var(--blue-50)", tkey: "payment_refund", to: "/info/payment" },
        { icon: "shield", color: "var(--green)", bg: "var(--green-50)", tkey: "privacy", to: "/info/privacy" },
        { icon: "file", color: "var(--text-2)", bg: "var(--gray-50)", tkey: "agreement", to: "/info/agreement" },
      ],
    },
    {
      tkey: "opt_support",
      items: [
        { icon: "chat", color: "var(--purple)", bg: "var(--purple-50)", tkey: "chat_support", to: "/chat" },
        {
          icon: "star",
          color: "var(--amber)",
          bg: "var(--amber-50)",
          tkey: "rate_app",
          onClick: () => toast(t("rate_thanks"), "star"),
        },
      ],
    },
  ];

  const themes: { id: typeof s.theme; icon: IconName; tkey: TKey }[] = [
    { id: "light", icon: "sun", tkey: "theme_light" },
    { id: "dark", icon: "moon", tkey: "theme_dark" },
    { id: "system", icon: "settings", tkey: "theme_system" },
  ];

  return (
    <div className="scroll px">
      <div className="px-head">
        <h1>{t("settings")}</h1>
        <p>{t("settings_sub")}</p>
      </div>

      <button className="px-profile" onClick={() => nav("/profile")}>
        <UserAvatar />
        <span className="grow">
          <b>{s.user.name || t("profile_setup")}</b>
          <small>{s.user.phone}</small>
          <span className="px-id">
            {t("opt_client")} · {s.user.code || DEFAULT_USER.code}
          </span>
        </span>
        <span className="px-profile-go">
          <Icon name="chevronRight" size={18} stroke={2.4} />
        </span>
      </button>

      <div className="px-label">{t("opt_look")}</div>
      <div className="px-card px-look">
        <div className="px-sub">
          <Icon name="globe" size={15} />
          {t("language")}
        </div>
        <div className="px-langs">
          {(["ru", "tj"] as const).map((l) => (
            <button key={l} className={s.lang === l ? "on" : ""} onClick={() => set("lang", l)}>
              <span className="px-lang-code">{l === "ru" ? "RU" : "TJ"}</span>
              {l === "ru" ? "Русский" : "Тоҷикӣ"}
              <span className="px-radio" />
            </button>
          ))}
        </div>

        <div className="px-sub">
          <Icon name={s.theme === "dark" ? "moon" : "sun"} size={15} />
          {t("theme")}
        </div>
        <div className="px-themes">
          {themes.map((th) => (
            <button key={th.id} className={s.theme === th.id ? "on" : ""} onClick={() => set("theme", th.id)}>
              <span className={`px-phone ${th.id}`}>
                <span className="px-ph-half l">
                  <i className="bar" />
                  <i className="blk" />
                  <i />
                  <i />
                </span>
                <span className="px-ph-half d">
                  <i className="bar" />
                  <i className="blk" />
                  <i />
                  <i />
                </span>
              </span>
              <span className="px-theme-name">
                <span className="px-radio" />
                {t(th.tkey)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {groups.map((g) => (
        <div key={g.tkey}>
          <div className="px-label">{t(g.tkey)}</div>
          <div className="px-card">
            {g.items.map((it) => (
              <button
                key={it.tkey}
                className="px-row"
                onClick={() => (it.onClick ? it.onClick() : it.to && nav(it.to))}
              >
                <span className="px-ic" style={{ background: it.bg, color: it.color }}>
                  <Icon name={it.icon} size={18} />
                </span>
                <span className="grow px-title">{t(it.tkey)}</span>
                {it.value && <span className="px-value">{it.value}</span>}
                <Icon name="chevronRight" size={17} className="px-arr" />
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="px-foot">
        <img src={BRAND.mark} alt="" />
        <b>{BRAND.full}</b>
        <span>
          {t("developed_by")} · {BRAND.version}
        </span>
      </div>
    </div>
  );
}
