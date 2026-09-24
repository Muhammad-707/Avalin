import { useNavigate } from "react-router-dom";
import { Hero, Row } from "../components/UI";
import { BRAND } from "../data";
import { useApp } from "../store";

export default function Options() {
  const nav = useNavigate();
  const { t, s, toast } = useApp();

  return (
    <div className="scroll fade-in">
      <Hero icon="settings" title={t("settings")} sub={t("settings_sub")} />

      <div style={{ height: 16 }} />
      <div className="list">
        <Row icon="user" title={t("profile_setup")} onClick={() => nav("/profile")} />
        <Row
          icon="globe"
          color="var(--purple)"
          bg="var(--purple-50)"
          title={t("lang_theme")}
          value={s.lang === "ru" ? t("russian") : t("tajik")}
          onClick={() => nav("/language")}
        />
        <Row icon="pin" title={t("pickup_point")} onClick={() => nav("/pickup")} />
      </div>

      <div style={{ height: 14 }} />
      <div className="list">
        <Row icon="ban" color="var(--red)" bg="var(--red-50)" title={t("prohibited")} onClick={() => nav("/info/prohibited")} />
        <Row icon="truck" color="var(--orange)" bg="var(--orange-50)" title={t("terms")} onClick={() => nav("/info/terms")} />
        <Row icon="card" title={t("payment_refund")} onClick={() => nav("/info/payment")} />
      </div>

      <div style={{ height: 14 }} />
      <div className="list">
        <Row icon="shield" title={t("privacy")} onClick={() => nav("/info/privacy")} />
        <Row icon="file" color="var(--text-2)" bg="var(--gray-50)" title={t("agreement")} onClick={() => nav("/info/agreement")} />
        <Row
          icon="star"
          color="var(--orange)"
          bg="var(--orange-50)"
          title={t("rate_app")}
          onClick={() => toast(t("rate_thanks"), "star")}
        />
      </div>

      <div style={{ textAlign: "center", fontSize: 12, color: "var(--muted)", marginTop: 22 }}>
        {t("developed_by")} · {BRAND.version}
      </div>
    </div>
  );
}
