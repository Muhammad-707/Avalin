import Icon, { type IconName } from "../components/Icon";
import { PageHeader, Hero } from "../components/UI";
import { useApp, type Theme } from "../store";
import type { Lang } from "../i18n";

export default function LanguageTheme() {
  const { t, s, set, toast } = useApp();

  const langs: { id: Lang; label: string; native: string }[] = [
    { id: "ru", label: t("russian"), native: "RU" },
    { id: "tj", label: t("tajik"), native: "TJ" },
  ];

  const themes: { id: Theme; label: string; icon: IconName }[] = [
    { id: "light", label: t("theme_light"), icon: "sun" },
    { id: "dark", label: t("theme_dark"), icon: "moon" },
    { id: "system", label: t("theme_system"), icon: "refresh" },
  ];

  return (
    <div className="scroll fade-in">
      <PageHeader title={t("lang_theme")} />
      <Hero icon="globe" title={t("lang_theme")} sub={t("settings_sub")} variant="violet" />

      <div className="section-title">{t("language")}</div>
      <div className="list">
        {langs.map((l) => (
          <button
            className="list-row"
            key={l.id}
            onClick={() => {
              set("lang", l.id);
              toast(l.label, "globe");
            }}
          >
            <span
              className="row-ic"
              style={{ background: "var(--blue-50)", color: "var(--blue)", fontWeight: 800, fontSize: 12 }}
            >
              {l.native}
            </span>
            <span className="grow row-title">{l.label}</span>
            <span
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                border: `2px solid ${s.lang === l.id ? "var(--blue)" : "var(--line)"}`,
                display: "grid",
                placeItems: "center",
                color: "var(--blue)",
              }}
            >
              {s.lang === l.id && <Icon name="check" size={13} stroke={3} />}
            </span>
          </button>
        ))}
      </div>

      <div className="section-title">{t("theme")}</div>
      <div className="list">
        {themes.map((th) => (
          <button className="list-row" key={th.id} onClick={() => set("theme", th.id)}>
            <span className="row-ic" style={{ background: "var(--amber-50)", color: "var(--orange)" }}>
              <Icon name={th.icon} size={17} />
            </span>
            <span className="grow row-title">{th.label}</span>
            <span
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                border: `2px solid ${s.theme === th.id ? "var(--blue)" : "var(--line)"}`,
                display: "grid",
                placeItems: "center",
                color: "var(--blue)",
              }}
            >
              {s.theme === th.id && <Icon name="check" size={13} stroke={3} />}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
