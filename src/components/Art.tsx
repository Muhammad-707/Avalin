import { BRAND, type Marketplace } from "../data";

/* ------------------------------------------------------------- carousel */

export function BrandSlide() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-label="Avalin Express Cargo">
      <defs>
        <linearGradient id="bs-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0C1733" />
          <stop offset="55%" stopColor="#152C5E" />
          <stop offset="100%" stopColor="#1E3468" />
        </linearGradient>
        <linearGradient id="bs-gold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#F3D07A" />
          <stop offset="55%" stopColor="#E5B03C" />
          <stop offset="100%" stopColor="#B8862A" />
        </linearGradient>
        <clipPath id="bs-logo-clip">
          <circle cx="68" cy="108" r="40" />
        </clipPath>
      </defs>

      <rect width="400" height="210" fill="#0E1B3D" />
      <rect width="400" height="210" fill="url(#bs-bg)" opacity=".9" />
      <g opacity=".22" stroke="#7FA3F5" fill="none" strokeWidth="1">
        <circle cx="330" cy="70" r="58" />
        <ellipse cx="330" cy="70" rx="58" ry="22" />
        <ellipse cx="330" cy="70" rx="24" ry="58" />
        <path d="M274 55h112M274 88h112" />
      </g>
      <path d="M0 210 L130 210 L46 118 Z" fill="#E5B03C" opacity=".07" />
      <path
        d="M238 176c46-6 86-46 96-96"
        stroke="url(#bs-gold)"
        strokeWidth="2"
        fill="none"
        strokeDasharray="5 6"
        opacity=".85"
      />
      <circle cx="238" cy="176" r="4" fill="#E5B03C" />
      <circle cx="334" cy="78" r="4" fill="#E5B03C" />

      <circle cx="68" cy="108" r="50" fill="#F5B82E" opacity=".12" />
      <image href={BRAND.mark} x="14" y="56" width="108" height="104" preserveAspectRatio="xMidYMid meet" />

      <text x="126" y="58" fill="#fff" fontSize="27" fontWeight="800" letterSpacing="3">
        AVALIN
      </text>
      <text x="128" y="79" fill="#E5B03C" fontSize="13" fontWeight="700" letterSpacing="6">
        CARGO
      </text>
      <rect x="126" y="92" width="150" height="1.4" fill="#E5B03C" opacity=".55" />
      <text x="126" y="115" fill="#DCE6FF" fontSize="12.5" fontWeight="600">
        Международная логистика
      </text>
      <text x="126" y="133" fill="#E5B03C" fontSize="12.5" fontWeight="700">
        и байерский сервис
      </text>

      <g>
        <rect x="126" y="148" width="86" height="26" rx="9" fill="#ffffff" opacity=".1" />
        <text x="138" y="165" fill="#fff" fontSize="11" fontWeight="700">
          АВИА 1–4 ДНЯ
        </text>
        <rect x="218" y="148" width="104" height="26" rx="9" fill="#ffffff" opacity=".1" />
        <text x="230" y="165" fill="#fff" fontSize="11" fontWeight="700">
          КАРГО 14–25 ДНЕЙ
        </text>
      </g>
    </svg>
  );
}

export function InviteSlide() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-label="Приглашайте друзей">
      <defs>
        <linearGradient id="inv-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E9F0FE" />
          <stop offset="100%" stopColor="#CFE0FC" />
        </linearGradient>
      </defs>
      <rect width="400" height="210" fill="url(#inv-bg)" />
      <path d="M0 150c60 26 120 26 180 6s140-26 220 6v48H0z" fill="#fff" opacity=".5" />
      <path d="M250 0c40 40 80 50 150 40v170H250z" fill="#fff" opacity=".35" />

      <text x="22" y="62" fill="#122148" fontSize="22" fontWeight="800">
        Приглашайте
      </text>
      <text x="22" y="88" fill="#122148" fontSize="22" fontWeight="800">
        друзей –
      </text>
      <text x="22" y="114" fill="#2F6BE8" fontSize="22" fontWeight="800">
        получайте бонусы!
      </text>
      <text x="23" y="136" fill="#5A6684" fontSize="10.5" fontWeight="600">
        Больше друзей — больше возможностей!
      </text>
      <rect x="22" y="150" width="112" height="30" rx="15" fill="#2F6BE8" />
      <text x="44" y="170" fill="#fff" fontSize="12" fontWeight="700">
        Пригласить
      </text>

      {/* phone */}
      <g transform="translate(268 26)">
        <rect x="0" y="0" width="86" height="150" rx="16" fill="#12224C" />
        <rect x="5" y="5" width="76" height="140" rx="12" fill="#F3F7FF" />
        <circle cx="43" cy="44" r="18" fill="#2F6BE8" opacity=".15" />
        <circle cx="37" cy="40" r="8" fill="#2F6BE8" />
        <circle cx="52" cy="44" r="6" fill="#7FA3F5" />
        <path d="M24 62c2-9 10-14 19-14s17 5 19 14z" fill="#2F6BE8" opacity=".75" />
        <rect x="18" y="76" width="50" height="9" rx="4.5" fill="#CBDAF7" />
        <rect x="18" y="92" width="34" height="9" rx="4.5" fill="#CBDAF7" />
        <rect x="18" y="112" width="50" height="20" rx="10" fill="#2F6BE8" />
        <path d="M32 122h22M45 115l7 7-7 7" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      </g>
      {/* gift + sparks */}
      <g transform="translate(218 142) scale(.8)">
        <rect x="0" y="12" width="40" height="34" rx="6" fill="#E5B03C" />
        <rect x="-4" y="4" width="48" height="14" rx="5" fill="#F3D07A" />
        <path d="M20 4v42" stroke="#fff" strokeWidth="4" opacity=".9" />
      </g>
      <g stroke="#2F6BE8" strokeWidth="3" strokeLinecap="round" opacity=".7">
        <path d="M252 30l8-10M266 36l12-4M248 48l-12 2" />
      </g>
    </svg>
  );
}

export function MapSlide() {
  const pins = [
    [128, 70], [152, 60], [176, 78], [200, 64], [224, 82], [250, 70],
    [140, 96], [166, 104], [192, 96], [216, 110], [244, 100], [268, 92],
    [150, 124], [178, 130], [206, 126], [232, 136], [258, 124],
  ];
  return (
    <svg viewBox="0 0 400 210" role="img" aria-label="Пункты выдачи">
      <defs>
        <linearGradient id="ms-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3D6BE0" />
          <stop offset="100%" stopColor="#2A50B8" />
        </linearGradient>
      </defs>
      <rect width="400" height="210" fill="url(#ms-bg)" />
      <g opacity=".14" stroke="#fff" fill="none">
        <path d="M-10 40h420M-10 90h420M-10 140h420M60 -10v230M160 -10v230M260 -10v230M360 -10v230" />
      </g>
      <text x="22" y="66" fill="#fff" fontSize="21" fontWeight="800">
        Ваш заказ
      </text>
      <text x="22" y="92" fill="#fff" fontSize="21" fontWeight="800">
        ближе, чем
      </text>
      <text x="22" y="118" fill="#fff" fontSize="21" fontWeight="800">
        кажется.
      </text>
      <text x="23" y="140" fill="#D6E2FF" fontSize="10" fontWeight="600">
        Заберите свой заказ из ближайшего пункта.
      </text>

      <g transform="translate(112 22) scale(1)">
        <path
          d="M18 62c14-18 30-30 52-34 18-4 30 6 48 2 16-3 26-14 44-12 20 2 28 18 46 22 14 3 26-4 38 6 12 10 8 26-2 36-12 12-28 10-42 18-16 9-24 26-42 30-20 5-34-8-54-8-18 0-30 12-48 8-18-4-26-22-34-36-6-12-14-20-6-32z"
          fill="#E9A93A"
          transform="translate(0 4)"
        />
      </g>
      {pins.map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path d="M0 8c0-5 4-8 8-8s8 3 8 8c0 6-8 14-8 14S0 14 0 8z" fill="#2A50B8" />
          <circle cx="8" cy="8" r="3.2" fill="#fff" />
        </g>
      ))}
      <rect x="292" y="26" width="86" height="24" rx="12" fill="#fff" opacity=".2" />
      <text x="308" y="42" fill="#fff" fontSize="11.5" fontWeight="700">
        +200 пунктов
      </text>
    </svg>
  );
}

/* ---------------------------------------------------------- news covers */

export function NewsCover({ kind }: { kind: "recycle" | "invite" | "brand" | "flag" }) {
  if (kind === "brand") {
    return <img className="news-img" src={BRAND.banner} alt="Avalin Cargo" />;
  }
  if (kind === "invite") {
    return (
      <div className="news-img">
        <InviteSlide />
      </div>
    );
  }
  if (kind === "flag") {
    return (
      <svg className="news-img" viewBox="0 0 400 210" role="img" aria-label="День независимости">
        <rect width="400" height="70" fill="#CC0000" />
        <rect y="70" width="400" height="70" fill="#fff" />
        <rect y="140" width="400" height="70" fill="#006600" />
        <g transform="translate(200 105)">
          <path
            d="M0-26 5.6-9.5H23L8.7 1.2 14 18-0 7.6-14 18l5.3-16.8L-23-9.5h17.4z"
            fill="#E5B03C"
          />
          <g fill="#E5B03C">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => {
              const a = (-90 + i * 18 - 54) * (Math.PI / 180);
              return <circle key={i} cx={Math.cos(a) * 44} cy={Math.sin(a) * 44 - 4} r="3.6" />;
            })}
          </g>
        </g>
        <text x="200" y="196" textAnchor="middle" fill="#0B4A0B" fontSize="13" fontWeight="800">
          35 солагии Истиқлолият
        </text>
      </svg>
    );
  }
  return (
    <svg className="news-img" viewBox="0 0 400 210" role="img" aria-label="Утилизация">
      <rect width="400" height="210" fill="#F4F7F4" />
      <g transform="translate(40 40)">
        <path d="M6 30h96l-8 106a10 10 0 0 1-10 9H24a10 10 0 0 1-10-9z" fill="#2E9E4F" />
        <rect x="0" y="16" width="108" height="16" rx="6" fill="#247E3F" />
        <rect x="38" y="6" width="32" height="12" rx="5" fill="#247E3F" />
        <path d="M30 56v70M54 56v70M78 56v70" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".55" />
        <g transform="translate(24 -16) rotate(-8)">
          <rect x="0" y="0" width="66" height="46" rx="4" fill="#D8A15C" />
          <path d="M0 16h66M33 0v46" stroke="#B9843F" strokeWidth="3" />
        </g>
      </g>
      <g transform="translate(150 46) scale(.7)" fill="#2E9E4F">
        <path d="M18 2 30 22H6z" />
        <path d="M2 30 14 50H-10z" transform="rotate(120 6 36)" />
        <path d="M34 30 46 50H22z" transform="rotate(240 40 36)" />
      </g>
      <text x="196" y="106" fill="#1A1A1A" fontSize="30" fontWeight="800">
        Утилизация
      </text>
      <rect x="196" y="118" width="176" height="4" fill="#2E9E4F" />
    </svg>
  );
}

/* ----------------------------------------------------------- lesson art */

export function LessonCover({ id }: { id: string }) {
  const m: Record<string, { bg: string; fg: string; glyph: string }> = {
    pinduoduo: { bg: "#E02020", fg: "#fff", glyph: "拼多多" },
    taobao: { bg: "#FF5000", fg: "#fff", glyph: "淘宝" },
    "1688": { bg: "#FF6A00", fg: "#fff", glyph: "1688" },
  };
  const c = m[id] ?? m.pinduoduo;
  return (
    <div className="lesson-cover" style={{ background: c.bg }}>
      <span style={{ color: c.fg, fontSize: 34, fontWeight: 800, letterSpacing: 2 }}>{c.glyph}</span>
    </div>
  );
}

/* ------------------------------------------------------ marketplace logo */

export function MarketLogo({ m, size = 72 }: { m: Marketplace; size?: number }) {
  return (
    <div className="mk-logo" style={{ width: size, height: size }}>
      <img src={m.logo} alt={m.name} loading="lazy" />
    </div>
  );
}

/* ------------------------------------------------------------- map mock */

export function MapMock({
  pins,
  activeId,
  onPin,
}: {
  pins: { id: string; x: number; y: number; type: "point" | "postamat" }[];
  activeId?: string;
  onPin?: (id: string) => void;
}) {
  return (
    <div className="map-mock" style={{ height: 260, background: "var(--card-alt)" }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <rect width="100" height="100" fill="#EAEEF6" />
        <g stroke="#DCE3EF" strokeWidth=".6">
          <path d="M0 18h100M0 38h100M0 58h100M0 78h100M18 0v100M38 0v100M58 0v100M78 0v100" />
        </g>
        <path d="M0 48h100" stroke="#C9D5E8" strokeWidth="3" />
        <path d="M46 0v100" stroke="#C9D5E8" strokeWidth="3" />
        <path d="M0 74C20 66 34 88 58 78s28 6 42 2" stroke="#BFD8F2" strokeWidth="2.5" fill="none" />
        <g fill="#DFE7F3">
          <rect x="6" y="6" width="22" height="16" rx="2" />
          <rect x="60" y="10" width="26" height="20" rx="2" />
          <rect x="12" y="56" width="20" height="18" rx="2" />
          <rect x="66" y="56" width="24" height="22" rx="2" />
        </g>
        <g fill="#D6EBD9">
          <rect x="32" y="20" width="12" height="14" rx="3" />
          <rect x="52" y="82" width="18" height="12" rx="3" />
        </g>
      </svg>
      {pins.map((p) => (
        <button
          key={p.id}
          onClick={() => onPin?.(p.id)}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            transform: "translate(-50%, -100%)",
            filter: "drop-shadow(0 3px 5px rgba(0,0,0,.25))",
          }}
          aria-label="pin"
        >
          <svg width={activeId === p.id ? 38 : 30} height={activeId === p.id ? 38 : 30} viewBox="0 0 24 24">
            <path
              d="M12 2a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8z"
              fill={p.type === "postamat" ? "#F0A32C" : "#2448C8"}
            />
            <circle cx="12" cy="10" r="3.2" fill="#fff" />
          </svg>
        </button>
      ))}
    </div>
  );
}
