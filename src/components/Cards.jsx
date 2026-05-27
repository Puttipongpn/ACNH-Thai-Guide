import { getCategory, getGuidesForCategory } from "../data/content";
import { CountBadge, FacebookButton, InternalLink, TagPill } from "./UI";

export function QuickCategoryCard({ category, navigate }) {
  return (
    <InternalLink
      to={`/category/${category.id}`}
      navigate={navigate}
      className={`quick-card tone-${category.color}`}
    >
      <span className="text-2xl" aria-hidden="true">
        {category.icon}
      </span>
      <span className="mt-3 font-display font-bold text-ink">{category.shortName}</span>
      <span className="mt-1 text-xs text-muted">{getGuidesForCategory(category.id).length} รายการ</span>
    </InternalLink>
  );
}

export function ContentCard({ category, navigate }) {
  const count = getGuidesForCategory(category.id).length;

  return (
    <article className="content-card">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className={`icon-tile tone-${category.color}`}>{category.icon}</span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-leaf-deep">{category.number}</p>
            <h3 className="font-display text-lg font-bold text-ink">{category.title}</h3>
          </div>
        </div>
        <CountBadge count={count} />
      </div>
      <p className="mt-4 min-h-13 text-sm leading-7 text-muted">{category.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <InternalLink to={`/category/${category.id}`} navigate={navigate} className="button-primary">
          เปิดดู
        </InternalLink>
        <FacebookButton url={category.sourceUrl} compact />
      </div>
    </article>
  );
}

export function GuideCard({ guide, navigate, horizontal = false }) {
  const category = getCategory(guide.categoryId);

  return (
    <article className={`guide-card ${horizontal ? "guide-card-horizontal" : ""}`}>
      <div className="min-w-0 flex-1">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <TagPill>{category?.shortName}</TagPill>
          {guide.tags.slice(0, 2).map((tag) => (
            <TagPill key={tag}>{tag}</TagPill>
          ))}
        </div>
        <h3 className="font-display text-lg font-bold text-ink">{guide.title}</h3>
        <p className="mt-2 text-sm leading-7 text-muted">{guide.description}</p>
        {guide.updatedAt && <p className="mt-3 text-xs text-muted">อัปเดต: {guide.updatedAt}</p>}
      </div>
      <div className={`flex flex-wrap gap-2 ${horizontal ? "sm:shrink-0" : "mt-5"}`}>
        <InternalLink to={`/article/${guide.id}`} navigate={navigate} className="button-primary">
          อ่าน
        </InternalLink>
        <FacebookButton url={guide.sourceUrl} compact />
      </div>
    </article>
  );
}
