import { categories, guides } from "../data/content";
import type { NavigableProps } from "../types/content";
import SearchBar from "../components/SearchBar";
import { ContentCard, GuideCard, QuickCategoryCard } from "../components/Cards";
import { InternalLink, SectionHeading } from "../components/UI";
import { curatedPostImageAssets } from "../data/postImageAssets";

export default function HomePage({ navigate }: NavigableProps) {
  const newPlayerGuides = guides.filter((guide) => guide.featuredForNewPlayer).slice(0, 6);
  const thisMonthGuides = guides.filter((guide) => guide.isThisMonth).slice(0, 4);
  const imageCount = curatedPostImageAssets.reduce((total, asset) => total + asset.imageCount, 0);
  const featuredImage = curatedPostImageAssets.find((asset) => asset.guideId === "meteonook-weather")?.images[0];

  return (
    <>
      <section className="hero">
        <div className="page-container grid items-center gap-10 py-10 lg:grid-cols-[1fr_24rem] lg:py-16">
          <div>
            <p className="eyebrow">🏝️ Animal Crossing: New Horizons ภาษาไทย</p>
            <h1 className="font-display max-w-3xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
              สมุดคู่มือเกาะ
              <br className="hidden sm:block" /> ที่หาโพสต์เก่าเจอง่ายขึ้น
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
              รวมโพสต์ไกด์ กฎสำคัญ สารบัญรายเดือน และรูปประกอบจากกลุ่มไว้ในหน้าเดียว
              เพื่อให้สมาชิกเปิดอ่านบนมือถือได้แบบสบาย ๆ เหมือนพลิกสมุดโน้ตประจำเกาะ
            </p>
            <div className="mt-8 max-w-2xl">
              <SearchBar navigate={navigate} />
            </div>
            <div className="mt-5 flex flex-wrap gap-2 text-xs text-muted">
              <span>ลองค้นหา:</span>
              {["NSO", "มือใหม่", "Celeste", "รายเดือน", "กุหลาบน้ำเงิน"].map((term) => (
                <button
                  key={term}
                  type="button"
                  className="rounded-full bg-white/70 px-3 py-1.5 hover:bg-white"
                  onClick={() => navigate(`/search?q=${encodeURIComponent(term)}`)}
                >
                  {term}
                </button>
              ))}
            </div>
            <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
              {[
                [`${categories.length}`, "หมวดหลัก"],
                [`${guides.length}`, "หัวข้อคัดแล้ว"],
                [`${imageCount}`, "รูปประกอบ"],
              ].map(([value, label]) => (
                <div key={label} className="stat-chip">
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="island-note overflow-hidden">
            {featuredImage && <img className="note-image" src={featuredImage.src} alt={featuredImage.alt} />}
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between text-sm text-muted">
                <span>บันทึกเกาะวันนี้</span>
                <span>🌿</span>
              </div>
              <p className="font-display text-xl font-bold text-ink">เริ่มอ่านตรงไหนดี?</p>
              <p className="mt-3 text-sm leading-7 text-muted">
                ถ้าเพิ่งเข้ากลุ่ม ให้เริ่มจากมารยาทการไปเกาะคนอื่น, NSO และ Beginner Guide ก่อน
              </p>
              <InternalLink to="/#new-player" navigate={navigate} className="button-primary mt-6 w-full">
                ดูชุดเริ่มต้น
              </InternalLink>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="page-container">
          <SectionHeading
            eyebrow="เลือกอ่านตามเรื่อง"
            title="หมวดที่ค้นหาบ่อย"
            description="กดที่การ์ดเพื่อเปิดสารบัญย่อยของแต่ละหัวข้อ"
          />
          <div className="quick-grid">
            {categories.map((category) => (
              <QuickCategoryCard key={category.id} category={category} navigate={navigate} />
            ))}
          </div>
        </div>
      </section>

      <section id="new-player" className="page-section bg-leaf-pale/45 scroll-mt-24">
        <div className="page-container">
          <SectionHeading
            eyebrow="สำหรับผู้เล่นใหม่"
            title="อ่านก่อน แล้วค่อยบินอย่างมั่นใจ"
            description="ชุดหัวข้อที่ช่วยลดคำถามซ้ำและทำให้เล่นออนไลน์กับคนอื่นได้ราบรื่น"
          />
          <div className="grid gap-4 md:grid-cols-2">
            {newPlayerGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} navigate={navigate} />
            ))}
          </div>
        </div>
      </section>

      <section id="all-guides" className="page-section scroll-mt-24">
        <div className="page-container">
          <SectionHeading
            eyebrow="สารบัญทั้งหมด"
            title="หมวดข้อมูลที่ขยายต่อได้"
            description="คัดเหลือเฉพาะกลุ่มข้อมูลที่เหมาะกับเว็บจริง ไม่ทำให้หน้าเว็บหนักเกินไป"
          />
          <div className="grid gap-4 lg:grid-cols-2">
            {categories.map((category) => (
              <ContentCard key={category.id} category={category} navigate={navigate} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-section bg-sky-pale/45">
        <div className="page-container">
          <SectionHeading
            eyebrow="ตามเดือนนี้"
            title="เรื่องที่ควรเปิดเช็กเป็นระยะ"
            description="รวมทางเข้าของไกด์รายเดือน อีเวนต์ ไอเทมเทศกาล และข่าวที่เกี่ยวข้อง"
            action={
              <InternalLink to="/category/monthly-and-events" navigate={navigate} className="text-link">
                เปิดไกด์รายเดือน →
              </InternalLink>
            }
          />
          <div className="grid gap-4 lg:grid-cols-2">
            {thisMonthGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} navigate={navigate} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
