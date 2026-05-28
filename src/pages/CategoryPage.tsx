import { getGuidesForCategory } from "../data/content";
import type { Category, NavigableProps } from "../types/content";
import SearchBar from "../components/SearchBar";
import { GuideCard } from "../components/Cards";
import { FacebookButton, InternalLink, TagPill } from "../components/UI";

interface CategoryPageProps extends NavigableProps {
  category: Category;
}

export default function CategoryPage({ category, navigate }: CategoryPageProps) {
  const categoryGuides = getGuidesForCategory(category.id);
  const imageTotal = categoryGuides.reduce((total, guide) => total + (guide.imageCount || 0), 0);

  return (
    <div className="page-container py-8 pb-24 sm:py-12">
      <InternalLink to="/" navigate={navigate} className="text-link text-sm">
        ← กลับหน้าแรก
      </InternalLink>
      <section className={`category-hero tone-${category.color} mt-6`}>
        <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-4xl" aria-hidden="true">
              {category.icon}
            </span>
            <p className="eyebrow mt-5">{category.number}</p>
            <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">{category.title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted sm:text-base">{category.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {category.tags.map((tag) => (
                <TagPill key={tag}>{tag}</TagPill>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted">
              <span className="rounded-full bg-white/60 px-3 py-1.5">{categoryGuides.length} หัวข้อ</span>
              <span className="rounded-full bg-white/60 px-3 py-1.5">{imageTotal} รูปประกอบ</span>
            </div>
          </div>
          <FacebookButton url={category.sourceUrl} />
        </div>
      </section>
      <div className="my-8">
        <SearchBar navigate={navigate} compact />
      </div>
      <div className="mb-5 flex items-baseline justify-between">
        <h2 className="font-display text-2xl font-bold text-ink">รายการในหมวดนี้</h2>
        <p className="text-sm text-muted">{categoryGuides.length} รายการ</p>
      </div>
      <div className="grid gap-4">
        {categoryGuides.map((guide) => (
          <GuideCard key={guide.id} guide={guide} navigate={navigate} horizontal />
        ))}
      </div>
    </div>
  );
}
