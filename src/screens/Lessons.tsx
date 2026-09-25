import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Icon from "../components/Icon";
import { Empty, Hero, PageHeader, Sheet } from "../components/UI";
import { LESSON_CATEGORIES, MARKETPLACES } from "../data";
import { useApp } from "../store";

const BRAND_COLORS: Record<string, string> = { pinduoduo: "#E2231A", taobao: "#FF5000", "1688": "#FF6A00" };

export function Lessons() {
  const nav = useNavigate();
  const { t } = useApp();
  const [params] = useSearchParams();
  const m = params.get("m");

  useEffect(() => {
    if (m && LESSON_CATEGORIES.some((c) => c.id === m)) nav(`/lessons/${m}`, { replace: true });
  }, [m, nav]);

  return (
    <div className="scroll ls">
      <PageHeader title={t("lessons")} />
      <Hero icon="play" title={t("lessons")} sub={t("lessons_sub")} />

      <div className="ls-list">
        {LESSON_CATEGORIES.map((c, i) => {
          const mp = MARKETPLACES.find((x) => x.id === c.marketplace || x.id === c.id);
          return (
            <button
              key={c.id}
              className="ls-card"
              style={{ ["--brand" as string]: BRAND_COLORS[c.id] ?? "var(--blue)", animationDelay: `${i * 0.06}s` }}
              onClick={() => nav(`/lessons/${c.id}`)}
            >
              <div className="ls-top">
                {mp ? <img className="ls-logo" src={mp.logo} alt="" /> : <span className="ls-logo" />}
                <span className="grow">
                  <b>{c.name}</b>
                  <small>
                    <Icon name="play" size={13} />
                    {c.lessons.length} {t("lessons_count")}
                  </small>
                </span>
                <span className="ls-go">
                  <Icon name="play" size={18} />
                </span>
              </div>
              <div className="ls-preview">
                {c.lessons.slice(0, 2).map((l, k) => (
                  <span key={l.id}>
                    <i>{k + 1}</i>
                    <span className="ellipsis">{l.title}</span>
                    <em>{l.duration}</em>
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function LessonList() {
  const { id = "" } = useParams();
  const { t } = useApp();
  const cat = LESSON_CATEGORIES.find((c) => c.id === id);
  const [playing, setPlaying] = useState<string | null>(null);

  if (!cat) {
    return (
      <div className="scroll fade-in">
        <PageHeader title={t("lessons")} />
        <div className="card">
          <Empty icon="play" title="404" />
        </div>
      </div>
    );
  }

  const lesson = cat.lessons.find((l) => l.id === playing);

  return (
    <div className="scroll fade-in">
      <PageHeader title={cat.name} />
      <div className="stack" style={{ gap: 12 }}>
        {cat.lessons.map((l) => (
          <button
            key={l.id}
            className="card"
            style={{ padding: 12, display: "flex", gap: 12, alignItems: "center", textAlign: "left" }}
            onClick={() => setPlaying(l.id)}
          >
            <span className="play-ic">
              <Icon name="play" size={21} />
            </span>
            <span className="grow">
              <span style={{ display: "block", fontSize: 14.5, fontWeight: 700, lineHeight: 1.3 }}>{l.title}</span>
              <span className="row" style={{ gap: 5, marginTop: 5, fontSize: 12.5, color: "var(--muted)" }}>
                <Icon name="clock" size={13} />
                {l.duration}
              </span>
              {l.note && (
                <span
                  className="ellipsis"
                  style={{ display: "block", fontSize: 12.5, color: "var(--muted)", marginTop: 4 }}
                >
                  {l.note}
                </span>
              )}
            </span>
          </button>
        ))}
      </div>

      <Sheet open={!!lesson} onClose={() => setPlaying(null)} title={lesson?.title} sub={cat.name}>
        <div
          style={{
            borderRadius: 16,
            overflow: "hidden",
            background: "#0D1220",
            height: 200,
            display: "grid",
            placeItems: "center",
            position: "relative",
          }}
        >
          <span
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "rgba(255,255,255,.15)",
              display: "grid",
              placeItems: "center",
              color: "#fff",
            }}
          >
            <Icon name="play" size={32} />
          </span>
          <div
            style={{
              position: "absolute",
              left: 14,
              right: 14,
              bottom: 14,
              height: 4,
              borderRadius: 4,
              background: "rgba(255,255,255,.25)",
            }}
          >
            <div style={{ width: "22%", height: "100%", borderRadius: 4, background: "var(--blue)" }} />
          </div>
        </div>
        <div className="row" style={{ gap: 6, marginTop: 12, fontSize: 13, color: "var(--muted)" }}>
          <Icon name="clock" size={14} />
          {lesson?.duration}
        </div>
        {lesson?.note && <p className="prose" style={{ marginTop: 8 }}>{lesson.note}</p>}
      </Sheet>
    </div>
  );
}
