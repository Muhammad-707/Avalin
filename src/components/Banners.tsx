import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { BRAND, CITIES, PICKUP_POINTS, REFERRAL, TARIFFS } from "../data";
import { useApp } from "../store";
import Icon from "./Icon";

const DURATION = 5500;

/* ------------------------------------------------------------ artwork */

function Plane({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" width="34" height="34" aria-hidden="true">
      <path
        d="M60 30c0-2-1.6-3.4-3.6-3.4H41L27 6h-6l7 20.6H14.5L9 20H4l3.6 12L4 44h5l5.5-6.6H28L21 58h6l14-20.6h15.4c2 0 3.6-1.4 3.6-3.4Z"
        fill="#fff"
      />
      <path d="M41 26.6h15.4c2 0 3.6 1.4 3.6 3.4H41Z" fill="#F5B82E" />
    </svg>
  );
}

function Truck() {
  return (
    <svg className="bn-truck" viewBox="0 0 120 64" width="120" height="64" aria-hidden="true">
      <rect x="2" y="8" width="70" height="40" rx="5" fill="#0A1A4A" />
      <rect x="8" y="14" width="58" height="28" rx="3" fill="#16307F" />
      <path d="M14 18v20M24 18v20M34 18v20M44 18v20M54 18v20" stroke="#2F5DEB" strokeWidth="2" />
      <path d="M74 18h22l14 16v14H74Z" fill="#0A1A4A" />
      <path d="M80 23h14l9 11H80Z" fill="#9FC0FF" />
      <rect x="74" y="44" width="38" height="4" fill="#F5B82E" />
      <rect x="2" y="44" width="70" height="4" fill="#F5B82E" />
      {[20, 50, 94].map((cx) => (
        <g key={cx} className="bn-wheel" style={{ transformOrigin: `${cx}px 52px` }}>
          <circle cx={cx} cy="52" r="9" fill="#0A1A4A" />
          <circle cx={cx} cy="52" r="4" fill="#E6EAF3" />
          <path d={`M${cx - 4} 52h8M${cx} 48v8`} stroke="#0A1A4A" strokeWidth="1.6" />
        </g>
      ))}
    </svg>
  );
}

function Gift() {
  return (
    <svg className="bn-gift" viewBox="0 0 80 80" width="92" height="92" aria-hidden="true">
      <rect x="8" y="34" width="64" height="40" rx="6" fill="#F5B82E" />
      <rect x="4" y="22" width="72" height="16" rx="5" fill="#FFD978" />
      <rect x="35" y="22" width="10" height="52" fill="#E3401F" />
      <path d="M40 22c-8-14-24-12-20-2 2 4 12 4 20 2Zm0 0c8-14 24-12 20-2-2 4-12 4-20 2Z" fill="#E3401F" />
      <rect x="8" y="38" width="64" height="4" fill="#000" opacity=".08" />
    </svg>
  );
}

/* ------------------------------------------------------------- slides */

type Slide = { id: string; to: string; cls: string; body: ReactNode };

function useSlides(): Slide[] {
  const { t } = useApp();
  const air = TARIFFS.weight[0].price;
  const cube = TARIFFS.volume[0].price;

  return [
    {
      id: "brand",
      to: "/tariffs",
      cls: "bn-brand",
      body: (
        <>
          <div className="bn-stars">
            {Array.from({ length: 14 }, (_, i) => (
              <i key={i} style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`, animationDelay: `${(i % 5) * 0.4}s` }} />
            ))}
          </div>
          <svg className="bn-route" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden="true">
            <path d="M-10 170 C 90 150, 170 40, 410 30" />
          </svg>
          <div className="bn-plane-track">
            <Plane />
          </div>
          <div className="bn-text">
            <span className="bn-tag a1">AVALIN EXPRESS CARGO</span>
            <h3 className="a2">{t("bn1_title")}</h3>
            <div className="bn-chips a3">
              <span>
                <Icon name="send" size={13} /> {t("bn1_air")}
              </span>
              <span>
                <Icon name="truck" size={13} /> {t("bn1_cargo")}
              </span>
            </div>
          </div>
          <div className="bn-logo a-pop">
            <span className="bn-logo-ring" />
            <img src={BRAND.mark} alt="" draggable={false} />
          </div>
        </>
      ),
    },
    {
      id: "tariff",
      to: "/calculator",
      cls: "bn-tariff",
      body: (
        <>
          <div className="bn-speed">
            {Array.from({ length: 6 }, (_, i) => (
              <i key={i} style={{ top: `${14 + i * 12}%`, animationDelay: `${i * 0.25}s` }} />
            ))}
          </div>
          <div className="bn-text">
            <span className="bn-tag dark a1">{t("bn2_tag")}</span>
            <div className="bn-price a2">
              <b>${air}</b>
              <span>/ {t("bn2_unit")}</span>
            </div>
            <p className="a3">
              {t("bn2_sub")} ${cube}/м³
            </p>
            <span className="bn-btn dark a4">
              {t("quick_calc")} <Icon name="chevronRight" size={15} stroke={2.6} />
            </span>
          </div>
          <div className="bn-road">
            <i />
          </div>
          <div className="bn-truck-wrap">
            <Truck />
          </div>
        </>
      ),
    },
    {
      id: "invite",
      to: "/referral",
      cls: "bn-invite",
      body: (
        <>
          <div className="bn-coins">
            {Array.from({ length: 7 }, (_, i) => (
              <i key={i} style={{ left: `${58 + ((i * 11) % 36)}%`, animationDelay: `${i * 0.45}s` }} />
            ))}
          </div>
          <div className="bn-text">
            <span className="bn-tag a1">
              <Icon name="gift" size={12} /> {t("bn3_tag")}
            </span>
            <h3 className="a2">
              {t("bn3_title")} <em>{REFERRAL.pct}%</em>
            </h3>
            <p className="a3">
              +{REFERRAL.welcomeYou} TJS {t("bn3_sub")}
            </p>
            <span className="bn-btn a4">
              {t("bn3_btn")} <Icon name="chevronRight" size={15} stroke={2.6} />
            </span>
          </div>
          <div className="bn-gift-wrap a-pop">
            <span className="bn-burst" />
            <Gift />
          </div>
        </>
      ),
    },
    {
      id: "pickup",
      to: "/pickup",
      cls: "bn-pickup",
      body: (
        <>
          <div className="bn-map">
            <svg viewBox="0 0 200 200" aria-hidden="true">
              <path
                d="M30 60 L80 30 L130 45 L175 30 L185 90 L150 120 L160 170 L100 180 L60 150 L25 160 L20 110Z"
                fill="rgba(255,255,255,.07)"
                stroke="rgba(255,255,255,.25)"
                strokeDasharray="4 4"
              />
              <path d="M70 60 Q 100 100 130 70 T 150 150" fill="none" stroke="#F5B82E" strokeWidth="2" strokeDasharray="5 6" className="bn-map-path" />
            </svg>
            {[
              { x: 32, y: 28, d: 0.2 },
              { x: 66, y: 34, d: 0.45 },
              { x: 74, y: 72, d: 0.7 },
              { x: 44, y: 62, d: 0.95 },
            ].map((p, i) => (
              <span key={i} className="bn-pin" style={{ left: `${p.x}%`, top: `${p.y}%`, animationDelay: `${p.d}s` }}>
                <Icon name="pin" size={20} stroke={2.4} />
                <i style={{ animationDelay: `${p.d + 0.5}s` }} />
              </span>
            ))}
          </div>
          <div className="bn-text">
            <span className="bn-tag a1">
              <Icon name="pin" size={12} /> {t("bn4_tag")}
            </span>
            <h3 className="a2">{t("bn4_title")}</h3>
            <p className="a3">
              {CITIES.length} {t("bn4_cities")} · {PICKUP_POINTS.length}+ {t("bn4_points")}
            </p>
            <span className="bn-btn a4">
              {t("bn4_btn")} <Icon name="chevronRight" size={15} stroke={2.6} />
            </span>
          </div>
        </>
      ),
    },
  ];
}

/* ----------------------------------------------------------- carousel */

export default function Banners() {
  const slides = useSlides();
  const nav = useNavigate();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const start = useRef<number | null>(null);
  const moved = useRef(false);
  const n = slides.length;

  const go = useCallback((d: number) => setI((p) => (p + d + n) % n), [n]);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => go(1), DURATION);
    return () => clearTimeout(id);
  }, [i, paused, go]);

  const onDown = (x: number) => {
    start.current = x;
    moved.current = false;
    setDragging(true);
    setPaused(true);
  };
  const onMove = (x: number) => {
    if (start.current === null) return;
    const d = x - start.current;
    if (Math.abs(d) > 6) moved.current = true;
    setDrag(d);
  };
  const onUp = () => {
    if (start.current === null) return;
    if (drag < -45) go(1);
    else if (drag > 45) go(-1);
    start.current = null;
    setDragging(false);
    setDrag(0);
    setPaused(false);
  };

  return (
    <div
      className="bn-wrap"
      onPointerDown={(e) => onDown(e.clientX)}
      onPointerMove={(e) => onMove(e.clientX)}
      onPointerUp={onUp}
      onPointerLeave={onUp}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="bn-track"
        style={{
          transform: `translateX(calc(${-i * 100}% + ${drag}px))`,
          transition: dragging ? "none" : undefined,
        }}
      >
        {slides.map((s, idx) => (
          <div
            key={s.id}
            className={`bn ${s.cls} ${idx === i ? "on" : ""}`}
            onClick={() => !moved.current && nav(s.to)}
            aria-hidden={idx !== i}
          >
            {s.body}
          </div>
        ))}
      </div>

      <div className={`bn-progress ${slides[i].id === "tariff" ? "light" : ""}`}>
        {slides.map((s, idx) => (
          <button
            key={s.id}
            aria-label={`${idx + 1}`}
            className={idx < i ? "done" : idx === i ? "on" : ""}
            onClick={(e) => {
              e.stopPropagation();
              setI(idx);
            }}
          >
            <i
              key={idx === i ? `on-${i}` : "off"}
              style={{ animationDuration: `${DURATION}ms`, animationPlayState: paused ? "paused" : "running" }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
