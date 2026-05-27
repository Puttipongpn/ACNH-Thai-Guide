import { getRelatedGuides } from "../data/content";
import type { Category, Guide, NavigableProps } from "../types/content";
import ArticleContent from "../components/ArticleContent";
import { GuideCard } from "../components/Cards";
import { FacebookButton, InternalLink, TagPill } from "../components/UI";

interface DetailPageProps extends NavigableProps {
  guide: Guide;
  category: Category;
}

export default function DetailPage({ guide, category, navigate }: DetailPageProps) {
  const relatedGuides = getRelatedGuides(guide);

  return (
    <div className="page-container max-w-4xl py-8 pb-24 sm:py-12">
      <InternalLink to={`/category/${category.id}`} navigate={navigate} className="text-link text-sm">
        ← กลับไป {category.shortName}
      </InternalLink>
      <article className="detail-paper mt-6">
        <div className="mb-5 flex flex-wrap gap-2">
          <TagPill>{category.title}</TagPill>
          {guide.tags.map((tag) => (
            <TagPill key={tag}>{tag}</TagPill>
          ))}
        </div>
        <h1 className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">{guide.title}</h1>
        <p className="mt-5 text-base leading-8 text-muted">{guide.description}</p>
        {guide.updatedAt && (
          <p className="mt-5 rounded-xl bg-cream-deep/60 px-4 py-3 text-sm text-muted">
            วันที่อัปเดต: {guide.updatedAt}
          </p>
        )}
        <ArticleContent content={guide.articleContent} />
        <section className="mt-8 rounded-2xl border border-dashed border-leaf/25 bg-white/60 p-5">
          <h2 className="font-display text-lg font-bold text-ink">ลิงก์ต้นทาง</h2>
          <p className="mt-2 mb-4 text-sm leading-7 text-muted">
            รายการนี้เป็นหน้ารวมรายละเอียด เมื่อเพิ่มลิงก์โพสต์จริงแล้ว สมาชิกจะกดอ่านโพสต์ต้นฉบับได้จากตรงนี้
          </p>
          <FacebookButton url={guide.sourceUrl} />
        </section>
        {guide.note && (
          <aside className="mt-6 rounded-2xl bg-leaf-pale p-5">
            <p className="mb-2 text-xs font-bold tracking-wide text-leaf-deep">หมายเหตุจากแอดมิน</p>
            <p className="text-sm leading-7 text-muted">{guide.note}</p>
          </aside>
        )}
      </article>
      {relatedGuides.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-5 font-display text-2xl font-bold text-ink">ลิงก์ที่เกี่ยวข้อง</h2>
          <div className="grid gap-4">
            {relatedGuides.map((relatedGuide) => (
              <GuideCard key={relatedGuide.id} guide={relatedGuide} navigate={navigate} horizontal />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
