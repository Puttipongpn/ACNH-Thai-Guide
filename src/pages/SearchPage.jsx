import { searchGuides } from "../data/content";
import SearchBar from "../components/SearchBar";
import { GuideCard } from "../components/Cards";
import { InternalLink } from "../components/UI";

export default function SearchPage({ query, navigate }) {
  const results = searchGuides(query);

  return (
    <div className="page-container py-8 pb-24 sm:py-12">
      <InternalLink to="/" navigate={navigate} className="text-link text-sm">
        ← กลับหน้าแรก
      </InternalLink>
      <div className="mt-7 max-w-3xl">
        <p className="eyebrow">ค้นหาสารบัญ</p>
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">ค้นหาไกด์ของเกาะ</h1>
        <p className="mt-3 mb-7 text-sm leading-7 text-muted">
          ค้นหาได้จากชื่อ คำอธิบาย หมวดหมู่ tag เดือน หรือประเภทเนื้อหา
        </p>
        <SearchBar key={query} initialValue={query} navigate={navigate} />
      </div>
      <section className="mt-10">
        <div className="mb-5 flex items-baseline justify-between gap-4">
          <h2 className="font-display text-2xl font-bold text-ink">
            {query ? `ผลการค้นหา “${query}”` : "รายการทั้งหมด"}
          </h2>
          <p className="shrink-0 text-sm text-muted">{results.length} รายการ</p>
        </div>
        {results.length > 0 ? (
          <div className="grid gap-4">
            {results.map((guide) => (
              <GuideCard key={guide.id} guide={guide} navigate={navigate} horizontal />
            ))}
          </div>
        ) : (
          <div className="empty-card">
            <span className="text-3xl" aria-hidden="true">
              🌱
            </span>
            <h3 className="mt-3 font-display text-xl font-bold text-ink">ยังไม่พบหัวข้อนี้</h3>
            <p className="mt-2 text-sm text-muted">ลองค้นด้วยคำว่า มือใหม่, NPC, DLC หรือ พฤษภาคม</p>
          </div>
        )}
      </section>
    </div>
  );
}
