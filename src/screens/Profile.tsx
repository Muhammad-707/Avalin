import { useRef, useState } from "react";
import Icon, { type IconName } from "../components/Icon";
import { PageHeader, Sheet, UserAvatar } from "../components/UI";
import { DEFAULT_USER } from "../data";
import { useApp } from "../store";

export default function Profile() {
  const { t, s, setUser, toast, reset, copy } = useApp();
  const [firstName, setFirstName] = useState(s.user.firstName);
  const [lastName, setLastName] = useState(s.user.lastName);
  const [gender, setGender] = useState(s.user.gender ?? DEFAULT_USER.gender);
  const [ask, setAsk] = useState<"" | "logout" | "delete">("");
  const fileRef = useRef<HTMLInputElement>(null);
  const code = s.user.code || DEFAULT_USER.code;

  const dirty =
    firstName.trim() !== s.user.firstName || lastName.trim() !== s.user.lastName || gender !== s.user.gender;

  const pickPhoto = (f?: File) => {
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      setUser({ avatar: String(r.result) });
      toast(t("saved"));
    };
    r.readAsDataURL(f);
  };

  const save = () => {
    const f = firstName.trim() || s.user.firstName;
    const l = lastName.trim() || s.user.lastName;
    setUser({ firstName: f, lastName: l, name: `${f} ${l}`.trim(), gender });
    toast(t("saved"));
  };

  const field = (icon: IconName, label: string, input: React.ReactNode, hint?: string) => (
    <label className="pf-field">
      <span className="pf-field-ic">
        <Icon name={icon} size={17} />
      </span>
      <span className="grow">
        <span className="pf-field-label">{label}</span>
        {input}
        {hint && <span className="pf-field-hint">{hint}</span>}
      </span>
    </label>
  );

  return (
    <div className="scroll pf">
      <PageHeader title={t("profile_setup")} />

      <section className="pf-cover">
        <div className="pf-ava">
          <UserAvatar size="lg" />
          <button className="pf-cam" onClick={() => fileRef.current?.click()} aria-label={t("change_photo")}>
            <Icon name="camera" size={15} stroke={2.4} />
          </button>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => pickPhoto(e.target.files?.[0])} />
        </div>
        <h2>
          {s.user.firstName} {s.user.lastName}
        </h2>
        <p>{s.user.phone}</p>
        <button className="pf-code" onClick={() => copy(code)}>
          ID · {code}
          <Icon name="copy" size={13} />
        </button>
      </section>

      <div className="px-label">{t("pf_personal")}</div>
      <div className="pf-card">
        {field(
          "user",
          t("first_name"),
          <input value={firstName} autoComplete="given-name" onChange={(e) => setFirstName(e.target.value)} />,
        )}
        {field(
          "user",
          t("last_name"),
          <input value={lastName} autoComplete="family-name" onChange={(e) => setLastName(e.target.value)} />,
        )}
        {field("phone", t("auth_phone"), <input value={s.user.phone} readOnly />, t("pf_phone_locked"))}

        <div className="pf-gender-wrap">
          <span className="pf-field-label">{t("gender")}</span>
          <div className="pf-gender">
            {(["male", "female"] as const).map((g) => (
              <button key={g} className={gender === g ? "on" : ""} onClick={() => setGender(g)}>
                <span className="pf-g-ic">{g === "male" ? "♂" : "♀"}</span>
                {g === "male" ? t("male") : t("female")}
                <span className="px-radio" />
              </button>
            ))}
          </div>
        </div>

        <button className="btn btn-primary" style={{ marginTop: 14 }} onClick={save} disabled={!dirty}>
          <Icon name="check" size={18} stroke={2.6} />
          {t("save")}
        </button>
      </div>

      <div className="px-label">{t("pf_account")}</div>
      <div className="px-card">
        <button className="px-row" onClick={() => setAsk("logout")}>
          <span className="px-ic" style={{ background: "var(--blue-50)", color: "var(--blue)" }}>
            <Icon name="logout" size={18} />
          </span>
          <span className="grow px-title">{t("logout")}</span>
          <Icon name="chevronRight" size={17} className="px-arr" />
        </button>
        <button className="px-row" onClick={() => setAsk("delete")}>
          <span className="px-ic" style={{ background: "var(--red-50)", color: "var(--red)" }}>
            <Icon name="trash" size={18} />
          </span>
          <span className="grow px-title" style={{ color: "var(--red)" }}>
            {t("delete_acc")}
          </span>
          <Icon name="chevronRight" size={17} className="px-arr" />
        </button>
      </div>

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
