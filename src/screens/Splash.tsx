import { useEffect, useState } from "react";
import { BRAND } from "../data";
import { useApp } from "../store";

const WORD = "AVALIN";

const makeStars = () =>
  Array.from({ length: 26 }, (_, i) => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 1 + Math.random() * 2.4,
    delay: Math.random() * 3,
    key: i,
  }));

export default function Splash({ onDone }: { onDone: () => void }) {
  const { t } = useApp();
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const a = setTimeout(() => setLeaving(true), 3000);
    const b = setTimeout(onDone, 3550);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [onDone]);

  const [stars] = useState(makeStars);

  return (
    <div className={`splash ${leaving ? "out" : ""}`} aria-label={BRAND.full}>
      <div className="au-orb au-orb-a" />
      <div className="au-orb au-orb-b" />
      <div className="sp-grid" />
      <div className="sp-stars">
        {stars.map((s) => (
          <i
            key={s.key}
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="sp-center">
        <div className="sp-logo-wrap">
          <div className="sp-pulse" />
          <div className="sp-pulse d2" />
          <div className="sp-ring" />
          <div className="sp-orbit">
            <span className="sp-comet" />
          </div>
          <img className="sp-logo" src={BRAND.mark} alt="" draggable={false} />
          <div className="sp-shine" />
        </div>

        <div className="sp-word">
          {WORD.split("").map((c, i) => (
            <span key={i} style={{ animationDelay: `${0.95 + i * 0.07}s` }}>
              {c}
            </span>
          ))}
        </div>
        <div className="sp-sub">EXPRESS CARGO</div>
        <div className="sp-tag">{t("splash_tag")}</div>
      </div>

      <div className="sp-bottom">
        <div className="sp-bar">
          <i />
        </div>
        <div className="sp-ver">{BRAND.version}</div>
      </div>
    </div>
  );
}
