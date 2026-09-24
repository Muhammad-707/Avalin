import { useParams } from "react-router-dom";
import { Hero, PageHeader, Empty } from "../components/UI";
import { INFO_PAGES } from "../data";
import { useApp } from "../store";
import type { TKey } from "../i18n";

export default function Info() {
  const { slug = "" } = useParams();
  const { t } = useApp();
  const page = INFO_PAGES[slug];

  if (!page) {
    return (
      <div className="scroll fade-in">
        <PageHeader title="—" />
        <div className="card">
          <Empty title="404" />
        </div>
      </div>
    );
  }

  const title = t(page.titleKey as TKey);

  return (
    <div className="scroll fade-in">
      <PageHeader title={title} />
      <Hero icon={page.icon} title={title} sub={t("appName")} />
      <div className="card" style={{ padding: 18, marginTop: 14 }}>
        <div className="prose" style={{ whiteSpace: "pre-line" }}>
          {page.body}
        </div>
      </div>
    </div>
  );
}
