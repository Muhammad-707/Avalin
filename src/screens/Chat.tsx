import { useEffect, useRef, useState } from "react";
import Icon from "../components/Icon";
import { useApp } from "../store";
import type { TKey } from "../i18n";

const QUICK: TKey[] = ["chat_q1", "chat_q2", "chat_q3"];

/* shrink a picked photo to a small JPEG data-URL so it fits in localStorage */
function compress(file: File, max = 720): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const k = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * k);
      c.height = Math.round(img.height * k);
      c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL("image/jpeg", 0.72));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("bad image"));
    };
    img.src = url;
  });
}

export default function Chat() {
  const { t, s, sendMsg, toast } = useApp();
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const typing = s.chat.length > 0 && s.chat[s.chat.length - 1].out;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [s.chat.length]);

  const send = (value = text) => {
    const v = value.trim();
    if (!v) return;
    sendMsg(v);
    setText("");
  };

  const attach = async (file?: File) => {
    if (!file) return;
    try {
      sendMsg(text.trim(), await compress(file));
      setText("");
    } catch {
      toast(t("chat_photo_big"), "alert");
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-top chat-banner">
        <img src="/img/support-banner.webp" alt={`${t("chat_support")} · ${typing ? t("chat_typing") : t("chat_online")}`} />
      </div>

      <div className="chat-body">
        <div className="chat-welcome">
          <img src="/img/support-mascot.webp" alt={`${t("chat_welcome")}. ${t("chat_reply_soon")}`} />
        </div>

        <div className="chat-day">{t("today")}</div>

        {s.chat.map((m) => (
          <div className={`bubble ${m.out ? "out" : "in"} ${m.img ? "has-img" : ""}`} key={m.id}>
            {m.img && <img className="bubble-img" src={m.img} alt={t("chat_photo")} />}
            {m.text}
            <div className="bubble-time">
              {m.time}
              {m.out && <Icon name="doubleCheck" size={13} className="tick" />}
            </div>
          </div>
        ))}

        {typing && (
          <div className="bubble in typing" aria-label={t("chat_typing")}>
            <i />
            <i />
            <i />
          </div>
        )}

        {s.chat.length <= 1 && (
          <div className="chat-quick">
            {QUICK.map((k) => (
              <button key={k} onClick={() => send(t(k))}>
                {t(k)}
              </button>
            ))}
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="chat-bar">
        <div className="composer">
          <button className="cmp-btn cmp-attach" onClick={() => fileRef.current?.click()} aria-label={t("chat_attach")} title={t("chat_attach")}>
            <Icon name="clip" size={19} />
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              attach(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder={t("chat_placeholder")}
          />
          <button className={`cmp-btn cmp-send ${text.trim() ? "on" : ""}`} onClick={() => send()} aria-label="send">
            <Icon name="send" size={18} stroke={2.2} />
          </button>
        </div>
      </div>
    </div>
  );
}
