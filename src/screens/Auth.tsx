import { useCallback, useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import Icon from "../components/Icon";
import { BRAND } from "../data";
import { useApp } from "../store";

type Step = "phone" | "code" | "name" | "done";

const PHONE_LEN = 9;
const CODE_LEN = 6;
const RESEND_SEC = 59;

/** 900905955 -> "90 090 59 55" */
const fmtPhone = (d: string) =>
  [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean).join(" ");

const onlyDigits = (v: string) => v.replace(/\D/g, "");

const capitalize = (v: string) => {
  const s = v.trim().replace(/\s+/g, " ");
  return s.charAt(0).toLocaleUpperCase("ru-RU") + s.slice(1);
};

const vibrate = (p: number | number[]) => {
  try {
    navigator.vibrate?.(p);
  } catch {
    /* ignore */
  }
};

const makeConfetti = () =>
  Array.from({ length: 34 }, (_, i) => {
    const a = (i / 34) * Math.PI * 2 + Math.random() * 0.4;
    const r = 110 + Math.random() * 90;
    return {
      key: i,
      x: Math.cos(a) * r,
      y: Math.sin(a) * r,
      rot: Math.random() * 540 - 270,
      c: ["#F5B82E", "#FFD978", "#FFFFFF", "#4F7BFF", "#8FB0FF"][i % 5],
      w: 6 + Math.random() * 6,
      d: Math.random() * 0.15,
    };
  });

export default function Auth() {
  const { t, s, set, register } = useApp();

  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState("");
  const [sms, setSms] = useState(false);
  const [arrived, setArrived] = useState(false);
  const [timer, setTimer] = useState(0);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(false);
  const [verified, setVerified] = useState(false);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [note, setNote] = useState("");

  const phoneRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);
  const firstRef = useRef<HTMLInputElement>(null);
  const timers = useRef<number[]>([]);

  const later = useCallback((fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  }, []);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // resend countdown
  useEffect(() => {
    if (timer <= 0) return;
    const id = setTimeout(() => setTimer((v) => v - 1), 1000);
    return () => clearTimeout(id);
  }, [timer]);

  // auto-hide the SMS banner
  useEffect(() => {
    if (!sms) return;
    const id = setTimeout(() => setSms(false), 12000);
    return () => clearTimeout(id);
  }, [sms]);

  // focus the right field per step
  useEffect(() => {
    const el = step === "phone" ? phoneRef.current : step === "code" ? codeRef.current : step === "name" ? firstRef.current : null;
    const id = setTimeout(() => el?.focus(), 450);
    return () => clearTimeout(id);
  }, [step]);

  const flash = (msg: string) => {
    setNote(msg);
    later(() => setNote(""), 2000);
  };

  const fullPhone = `+992 ${fmtPhone(phone)}`;

  /* ---------------------------------------------------------------- phone */
  const sendCode = (e?: FormEvent) => {
    e?.preventDefault();
    if (phone.length !== PHONE_LEN || busy) return;
    setBusy(true);
    later(() => {
      const c = String(Math.floor(100000 + Math.random() * 900000));
      setSent(c);
      setCode("");
      setErr(false);
      setVerified(false);
      setTimer(RESEND_SEC);
      setBusy(false);
      setStep("code");
      setArrived(false);
      later(() => {
        setSms(true);
        setArrived(true);
        vibrate([30, 60, 30]);
      }, 1600);
    }, 900);
  };

  const resend = () => {
    if (timer > 0) return;
    setSms(false);
    const c = String(Math.floor(100000 + Math.random() * 900000));
    setSent(c);
    setCode("");
    setErr(false);
    setTimer(RESEND_SEC);
    setArrived(false);
    later(() => {
      setSms(true);
      setArrived(true);
      vibrate([30, 60, 30]);
    }, 1400);
  };

  /* ----------------------------------------------------------------- code */
  const verify = useCallback(
    (value: string) => {
      setBusy(true);
      later(() => {
        setBusy(false);
        if (value === sent) {
          setVerified(true);
          setSms(false);
          vibrate(40);
          later(() => setStep("name"), 1100);
        } else {
          setErr(true);
          vibrate([80, 40, 80]);
          later(() => {
            setCode("");
            codeRef.current?.focus();
          }, 650);
        }
      }, 700);
    },
    [sent, later],
  );

  const onCode = (v: string) => {
    if (busy || verified) return;
    const d = onlyDigits(v).slice(0, CODE_LEN);
    setErr(false);
    setCode(d);
    if (d.length === CODE_LEN) verify(d);
  };

  const copySms = () => {
    const done = () => flash(t("auth_code_copied"));
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(sent).then(done, done);
    else done();
    setSms(false);
    codeRef.current?.focus();
  };

  const paste = async () => {
    try {
      const txt = await navigator.clipboard.readText();
      const d = onlyDigits(txt).slice(0, CODE_LEN);
      if (d) onCode(d);
      else codeRef.current?.focus();
    } catch {
      codeRef.current?.focus();
    }
  };

  /* ----------------------------------------------------------------- name */
  const nameOk = first.trim().length >= 2 && last.trim().length >= 2;

  const finish = (e?: FormEvent) => {
    e?.preventDefault();
    if (!nameOk || busy) return;
    setBusy(true);
    later(() => {
      setBusy(false);
      setStep("done");
      vibrate([20, 40, 60]);
      later(
        () => register({ phone: fullPhone, firstName: capitalize(first), lastName: capitalize(last) }),
        2600,
      );
    }, 800);
  };

  const back = () => {
    if (step === "code") {
      setSms(false);
      setStep("phone");
    } else if (step === "name") {
      setStep("phone");
      setVerified(false);
      setCode("");
    }
  };

  const stepNo = step === "phone" ? 1 : step === "code" ? 2 : 3;

  const [confetti] = useState(makeConfetti);

  return (
    <div className="shell auth">
      <div className="au-orb au-orb-a" />
      <div className="au-orb au-orb-b" />
      <div className="au-grid" />

      {/* ------------------------------------------------ incoming SMS banner */}
      <button className={`sms ${sms ? "show" : ""}`} onClick={copySms} tabIndex={sms ? 0 : -1}>
        <span className="sms-app">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff" aria-hidden="true">
            <path d="M12 3C6.5 3 2 6.6 2 11c0 2.4 1.3 4.6 3.4 6.1L4.6 21l4.1-2.3c1 .2 2.1.3 3.3.3 5.5 0 10-3.6 10-8s-4.5-8-10-8Z" />
          </svg>
        </span>
        <span className="grow" style={{ textAlign: "left", minWidth: 0 }}>
          <span className="sms-top">
            <b>{t("auth_messages")}</b>
            <span>{t("auth_now")}</span>
          </span>
          <span className="sms-from">AVALIN</span>
          <span className="sms-text">{t("auth_sms_text").replace("{code}", sent)}</span>
          <span className="sms-hint">
            <Icon name="copy" size={12} stroke={2.4} /> {t("auth_sms_tap")}
          </span>
        </span>
      </button>

      {/* ------------------------------------------------------------ header */}
      {step !== "done" && (
        <div className="au-top">
          {step === "phone" ? (
            <div className="au-lang">
              <button className={s.lang === "ru" ? "on" : ""} onClick={() => set("lang", "ru")}>
                RU
              </button>
              <button className={s.lang === "tj" ? "on" : ""} onClick={() => set("lang", "tj")}>
                TJ
              </button>
            </div>
          ) : (
            <button className="au-back" onClick={back} aria-label={t("back")} disabled={busy || verified}>
              <Icon name="chevronLeft" size={20} stroke={2.4} />
            </button>
          )}
          <div className="au-progress">
            <div className="au-steps">
              {[1, 2, 3].map((n) => (
                <i key={n} className={n < stepNo ? "done" : n === stepNo ? "on" : ""} />
              ))}
            </div>
            <span>
              {t("auth_step")} {stepNo} {t("auth_of")} 3
            </span>
          </div>
        </div>
      )}

      <div className="au-body">
        {/* ----------------------------------------------------------- phone */}
        {step === "phone" && (
          <form className="au-step" onSubmit={sendCode} key="phone">
            <div className="au-hero">
              <div className="au-logo">
                <span className="au-logo-glow" />
                <img src={BRAND.mark} alt={BRAND.full} draggable={false} />
              </div>
              <div className="au-brand">
                AVALIN <b>EXPRESS CARGO</b>
              </div>
            </div>

            <h1 className="au-title">{t("auth_welcome")}</h1>
            <p className="au-sub">{t("auth_sub")}</p>

            <label className={`au-field phone ${phone ? "filled" : ""}`}>
              <span className="au-flag" aria-hidden="true">
                <svg viewBox="0 0 28 14" width="32" height="16">
                  <rect width="28" height="4" fill="#CC0000" />
                  <rect y="4" width="28" height="6" fill="#FFFFFF" />
                  <rect y="10" width="28" height="4" fill="#006600" />
                  <path d="M12.3 8.6h3.4l-.3-1.3-.6.5-.4-.9-.4.9-.4-.9-.4.9-.6-.5z" fill="#F8C300" />
                  <g fill="#F8C300">
                    {[-60, -40, -20, 0, 20, 40, 60].map((a) => (
                      <circle key={a} cx={14 + Math.sin((a * Math.PI) / 180) * 2.6} cy={7.2 - Math.cos((a * Math.PI) / 180) * 2.2} r=".42" />
                    ))}
                  </g>
                </svg>
                +992
              </span>
              <span className="au-div" />
              <span className="grow au-float">
                <span className="au-label">{t("auth_phone")}</span>
                <input
                  ref={phoneRef}
                  inputMode="tel"
                  autoComplete="tel-national"
                  placeholder="90 000 00 00"
                  value={fmtPhone(phone)}
                  onChange={(e) => setPhone(onlyDigits(e.target.value).slice(0, PHONE_LEN))}
                />
              </span>
              {phone.length === PHONE_LEN && (
                <span className="au-ok">
                  <Icon name="check" size={14} stroke={3} />
                </span>
              )}
            </label>

            <div className="grow" />

            <button className="au-btn" disabled={phone.length !== PHONE_LEN || busy}>
              {busy ? <span className="au-spin" /> : (
                <>
                  {t("auth_get_code")}
                  <Icon name="chevronRight" size={20} stroke={2.6} />
                </>
              )}
            </button>
            <p className="au-terms">
              <Icon name="shield" size={14} /> {t("auth_terms")}
            </p>
          </form>
        )}

        {/* ------------------------------------------------------------ code */}
        {step === "code" && (
          <div className="au-step" key="code">
            <div className="au-icon-badge">
              <Icon name={verified ? "checkCircle" : "lock"} size={30} />
            </div>
            <h1 className="au-title">{verified ? t("auth_verified") : t("auth_code_title")}</h1>
            <p className="au-sub">
              {t("auth_code_sub")}
              <br />
              <b className="au-phone-chip">
                {fullPhone}
                <button onClick={back} disabled={busy || verified}>
                  <Icon name="edit" size={13} stroke={2.4} />
                </button>
              </b>
            </p>

            <div
              className={`otp ${err ? "err" : ""} ${verified ? "ok" : ""}`}
              onClick={() => codeRef.current?.focus()}
            >
              {Array.from({ length: CODE_LEN }, (_, i) => (
                <span
                  key={i}
                  className={`otp-box ${code[i] ? "fill" : ""} ${i === code.length && !verified ? "cur" : ""}`}
                  style={{ transitionDelay: verified ? `${i * 60}ms` : undefined }}
                >
                  {code[i] ?? ""}
                </span>
              ))}
              <input
                ref={codeRef}
                className="otp-input"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={code}
                onChange={(e) => onCode(e.target.value)}
                aria-label={t("auth_code_title")}
              />
            </div>

            <div className="otp-status">
              {busy ? (
                <span className="au-spin sm" />
              ) : err ? (
                <span className="bad">
                  <Icon name="alert" size={15} /> {t("auth_wrong_code")}
                </span>
              ) : verified ? (
                <span className="good">
                  <Icon name="checkCircle" size={15} /> {t("auth_verified")}
                </span>
              ) : null}
            </div>

            {!verified && arrived && code.length === 0 && (
              <button className="otp-suggest" onClick={() => onCode(sent)}>
                <Icon name="chat" size={15} />
                <span>
                  {t("auth_messages")} · <b>{sent}</b>
                </span>
              </button>
            )}

            <div className="grow" />

            {!verified && (
              <>
                <button className="au-btn ghost" onClick={paste} disabled={busy}>
                  <Icon name="copy" size={18} />
                  {t("auth_paste")}
                </button>
                <div className="au-resend">
                  {timer > 0 ? (
                    <span>
                      {t("auth_resend_in")} <b>0:{String(timer).padStart(2, "0")}</b>
                    </span>
                  ) : (
                    <button onClick={resend}>
                      <Icon name="refresh" size={15} /> {t("auth_resend")}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------ name */}
        {step === "name" && (
          <form className="au-step" onSubmit={finish} key="name">
            <div className="au-avatar">
              <span>{(first.trim()[0] ?? "").toUpperCase() + (last.trim()[0] ?? "").toUpperCase() || <Icon name="user" size={34} />}</span>
            </div>
            <h1 className="au-title">{t("auth_name_title")}</h1>
            <p className="au-sub">{t("auth_name_sub")}</p>

            <label className={`au-field ${first ? "filled" : ""}`}>
              <Icon name="user" size={19} />
              <span className="grow au-float">
                <span className="au-label">{t("first_name")}</span>
                <input
                  ref={firstRef}
                  autoComplete="given-name"
                  autoCapitalize="words"
                  value={first}
                  maxLength={30}
                  onChange={(e) => setFirst(e.target.value)}
                />
              </span>
            </label>
            <label className={`au-field ${last ? "filled" : ""}`}>
              <Icon name="users" size={19} />
              <span className="grow au-float">
                <span className="au-label">{t("last_name")}</span>
                <input
                  autoComplete="family-name"
                  autoCapitalize="words"
                  value={last}
                  maxLength={30}
                  onChange={(e) => setLast(e.target.value)}
                />
              </span>
            </label>

            <div className="au-verified-row">
              <Icon name="phone" size={15} /> {fullPhone}
              <span className="tick">
                <Icon name="check" size={11} stroke={3.2} />
              </span>
            </div>

            <div className="grow" />

            <button className="au-btn" disabled={!nameOk || busy}>
              {busy ? <span className="au-spin" /> : (
                <>
                  {t("auth_register")}
                  <Icon name="chevronRight" size={20} stroke={2.6} />
                </>
              )}
            </button>
          </form>
        )}

        {/* ------------------------------------------------------------ done */}
        {step === "done" && (
          <div className="au-step au-done" key="done">
            <div className="done-burst">
              {confetti.map((c) => (
                <i
                  key={c.key}
                  style={
                    {
                      "--x": `${c.x}px`,
                      "--y": `${c.y}px`,
                      "--r": `${c.rot}deg`,
                      background: c.c,
                      width: c.w,
                      height: c.w * 0.45,
                      animationDelay: `${0.35 + c.d}s`,
                    } as CSSProperties
                  }
                />
              ))}
              <div className="done-ring" />
              <div className="done-check">
                <svg viewBox="0 0 52 52" width="64" height="64">
                  <path d="M14 27l8 8 16-17" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <h1 className="au-title">
              {t("auth_done")}
              <br />
              <span className="gold">{capitalize(first)}!</span>
            </h1>
            <p className="au-sub">{t("auth_done_sub")}</p>
            <div className="done-card">
              <div className="done-av">{(first.trim()[0] ?? "").toUpperCase() + (last.trim()[0] ?? "").toUpperCase()}</div>
              <div className="grow">
                <b>
                  {capitalize(first)} {capitalize(last)}
                </b>
                <span>{fullPhone}</span>
              </div>
              <Icon name="shield" size={20} />
            </div>
            <div className="sp-bar done-bar">
              <i />
            </div>
          </div>
        )}
      </div>

      {note && <div className="au-toast">{note}</div>}
    </div>
  );
}
