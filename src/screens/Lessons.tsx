import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Icon from "../components/Icon";
import { Empty, Hero, PageHeader, Sheet } from "../components/UI";
import { LessonCover } from "../components/Art";
import { LESSON_CATEGORIES } from "../data";
import { useApp } from "../store";

export function Lessons() {
  const nav = useNavigate();
  const { t } = useApp();
  const [params] = useSearchParams();
  const m = params.get("m");

  useEffect(() => {
    if (m && LESSON_CATEGORIES.some((c) => c.id === m)) nav(`/lessons/${m}`, { replace: true });
  }, [m, nav]);

  return (
    <div className="scroll fade-in">
      <PageHeader title={t("lessons")} />
      <Hero icon="play" title={t("lessons")} sub={t("lessons_sub")} variant="soft-violet" />

      <div style={{ height: 14 }} />
      <div className="stack" style={{ gap: 14 }}>
        {LESSON_CATEGORIES.map((c) => (
          <button
            key={c.id}
            className="news-card"
            onClick={() => nav(`/lessons/${c.id}`)}
            style={{ padding: 0 }}
          >
            <LessonCover id={c.id} />
            <div style={{ padding: 14 }}>
              <div style={{ fontSize: 16, fontWeight: 800 }}>{c.name}</div>
              <div className="row" style={{ gap: 6, marginTop: 5, fontSize: 13, color: "var(--muted)" }}>
                <Icon name="play" size={15} />
                {c.lessons.length} {t("lessons_count")}
              </div>
            </div>
          </button>
        ))}
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
