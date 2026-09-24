import { useRef, useState } from "react";
import Icon from "../components/Icon";
import { PageHeader, Sheet, UserAvatar } from "../components/UI";
import { useApp } from "../store";

export default function Profile() {
  const { t, s, setUser, toast, reset } = useApp();
  const [firstName, setFirstName] = useState(s.user.firstName);
  const [lastName, setLastName] = useState(s.user.lastName);
  const [gender, setGender] = useState(s.user.gender);
  const [ask, setAsk] = useState<"" | "logout" | "delete">("");
  const fileRef = useRef<HTMLInputElement>(null);

  const pickPhoto = (f?: File) => {
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      setUser({ avatar: String(r.result) });
      toast(t("saved"));
    };
    r.readAsDataURL(f);
  };

  return (
    <div className="scroll fade-in">
      <PageHeader title={t("profile_setup")} />

      <div className="card" style={{ padding: 16 }}>
        <div className="row" style={{ gap: 14 }}>
          <UserAvatar size="lg" />
          <span className="grow">
            <span style={{ display: "block", fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 800 }}>
              {s.user.firstName} {s.user.lastName}
            </span>
            <span style={{ display: "block", fontSize: 13.5, color: "var(--muted)", marginTop: 2 }}>
              {s.user.phone}
            </span>
            <span style={{ display: "block", fontSize: 12.5, color: "var(--muted)" }}>ID: {s.user.code}</span>
          </span>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => pickPhoto(e.target.files?.[0])}
        />
        <button
          className="btn btn-primary btn-sm"
          style={{ width: "auto", marginTop: 14 }}
          onClick={() => fileRef.current?.click()}
        >
          <Icon name="camera" size={16} />
          {t("change_photo")}
        </button>
      </div>

      <div style={{ height: 14 }} />
      <div className="card" style={{ padding: 16 }}>
        <div className="field-label">{t("first_name")}</div>
        <div className="input-wrap">
          <input value={firstName} autoComplete="given-name" onChange={(e) => setFirstName(e.target.value)} />
        </div>

        <div className="field-label" style={{ marginTop: 16 }}>
          {t("last_name")}
        </div>
        <div className="input-wrap">
          <input value={lastName} autoComplete="family-name" onChange={(e) => setLastName(e.target.value)} />
        </div>

        <div className="field-label" style={{ marginTop: 16 }}>
          {t("auth_phone")}
        </div>
        <div className="input-wrap" style={{ opacity: 0.7 }}>
          <input value={s.user.phone} readOnly />
        </div>

        <div className="field-label" style={{ marginTop: 16 }}>
          {t("gender")}
        </div>
        <div className="seg" style={{ boxShadow: "none", border: "1px solid var(--line)", background: "var(--card-alt)" }}>
          <button className={gender === "male" ? "on" : ""} onClick={() => setGender("male")}>
            <span style={{ fontSize: 15 }}>♂</span> {t("male")}
          </button>
          <button className={gender === "female" ? "on" : ""} onClick={() => setGender("female")}>
            <span style={{ fontSize: 15 }}>♀</span> {t("female")}
          </button>
        </div>

        <button
          className="btn btn-primary"
          style={{ marginTop: 16 }}
          onClick={() => {
            const f = firstName.trim() || s.user.firstName;
            const l = lastName.trim() || s.user.lastName;
            setUser({ firstName: f, lastName: l, name: `${f} ${l}`.trim(), gender });
            toast(t("saved"));
          }}
        >
          {t("save")}
        </button>
      </div>

      <div style={{ height: 14 }} />
      <button className="btn btn-soft-red" onClick={() => setAsk("logout")}>
        <Icon name="logout" size={18} />
        {t("logout")}
      </button>

      <div style={{ height: 10 }} />
      <button className="btn btn-red" onClick={() => setAsk("delete")}>
        <Icon name="trash" size={18} />
        {t("delete_acc")}
      </button>

      <Sheet
        open={ask !== ""}
        onClose={() => setAsk("")}
        title={ask === "delete" ? t("delete_q") : t("logout_q")}
        sub={ask === "delete" ? t("delete_sub") : t("logout_sub")}
      >
        <button
          className={ask === "delete" ? "btn btn-red" : "btn btn-primary"}
          onClick={() => {
            setAsk("");
            reset();
            toast(ask === "delete" ? t("delete_acc") : t("logout"), "check");
          }}
        >
          {ask === "delete" ? t("yes_delete") : t("yes_logout")}
        </button>
        <div style={{ height: 10 }} />
        <button className="btn btn-ghost" onClick={() => setAsk("")}>
          {t("cancel")}
        </button>
      </Sheet>
    </div>
  );
}
