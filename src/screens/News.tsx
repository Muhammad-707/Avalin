import { useNavigate, useParams } from "react-router-dom";
import Icon from "../components/Icon";
import { Empty, Hero, PageHeader } from "../components/UI";
import { NewsCover } from "../components/Art";
import { MOCK_NEWS } from "../data";
import { useApp } from "../store";

function Reactions({ id }: { id: string }) {
  const { s, react, newsCounts } = useApp();
  const c = newsCounts(id);
  const r = s.reactions[id];
  return (
    <div className="row" style={{ gap: 10 }}>
      <button
        className={`react-btn ${r === "like" ? "on-like" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          react(id, "like");
        }}
      >
        <Icon name="heart" size={15} />
        {c.likes}
      </button>
      <button
        className={`react-btn ${r === "dislike" ? "on-dis" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          react(id, "dislike");
        }}
      >
        <Icon name="thumbDown" size={15} />
        {c.dislikes}
      </button>
    </div>
  );
}

export function News() {
  const nav = useNavigate();
  const { t } = useApp();

  return (
    <div className="scroll fade-in">
      <PageHeader title={t("news")} />
      <Hero icon="file" title={t("news")} sub={t("news_sub")} variant="violet" />

      <div style={{ height: 14 }} />
      <div className="stack" style={{ gap: 14 }}>
        {MOCK_NEWS.map((n) => (
          <div className="news-card" key={n.id} onClick={() => nav(`/news/${n.id}`)}>
            <NewsCover kind={n.cover} />
            <div style={{ padding: 14 }}>
              <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.35 }}>{n.title}</div>
              <div className="row" style={{ gap: 6, margin: "7px 0 11px", fontSize: 12.5, color: "var(--muted)" }}>
                <Icon name="calendar" size={13} />
                {n.date}
              </div>
              <Reactions id={n.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NewsDetail() {
  const { id = "" } = useParams();
  const { t } = useApp();
  const n = MOCK_NEWS.find((x) => x.id === id);

  if (!n) {
    return (
      <div className="scroll fade-in">
        <PageHeader title={t("news")} />
        <div className="card">
          <Empty icon="megaphone" title="404" />
        </div>
      </div>
    );
  }

  return (
    <div className="scroll fade-in">
      <PageHeader title={t("news")} />
      <div className="card" style={{ overflow: "hidden", padding: 0 }}>
        <NewsCover kind={n.cover} />
        <div style={{ padding: 16 }}>
          <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800, lineHeight: 1.3 }}>{n.title}</h2>
          <div className="row" style={{ gap: 6, margin: "9px 0 13px", fontSize: 12.5, color: "var(--muted)" }}>
            <Icon name="calendar" size={13} />
            {n.date}
          </div>
          <Reactions id={n.id} />
          <div style={{ height: 14 }} />
          <div style={{ borderTop: "1px solid var(--line)", paddingTop: 14 }}>
            <div className="prose" style={{ whiteSpace: "pre-line" }}>
              {n.body}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
