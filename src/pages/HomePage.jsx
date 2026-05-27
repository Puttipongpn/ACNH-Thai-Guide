import { categories, guides } from "../data/content";
import SearchBar from "../components/SearchBar";
import { ContentCard, GuideCard, QuickCategoryCard } from "../components/Cards";
import { InternalLink, SectionHeading } from "../components/UI";

export default function HomePage({ navigate }) {
  const newPlayerGuides = guides.filter((guide) => guide.featuredForNewPlayer);
  const thisMonthGuides = guides.filter((guide) => guide.isThisMonth);

  return (
    <>
      <section className="hero">
        <div className="page-container grid items-center gap-10 py-10 md:grid-cols-[1fr_18rem] md:py-16">
          <div>
            <p className="eyebrow">🏝️ Animal Crossing: New Horizons ภาษาไทย</p>
            <h1 className="font-display max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
              สมุดสารบัญไกด์
              <br className="hidden sm:block" /> สำหรับชาวเกาะ
            </h1>
            <p className="mt-4 max-w-xl text-base leading-8 text-muted sm:text-lg">
              รวมลิงก์โพสต์ไกด์ ข่าวสาร และเรื่องควรรู้จากกลุ่มไว้ในที่เดียว
              เพื่อค้นหาและกลับมาอ่านได้สบาย ๆ
            </p>
            <div className="mt-8 max-w-2xl">
              <SearchBar navigate={navigate} />
            </div>
            <div className="mt-5 flex flex-wrap gap-2 text-xs text-muted">
              <span>ลองค้นหา:</span>
              {["มือใหม่", "NPC", "พฤษภาคม", "DLC", "ดอกไม้"].map((term) => (
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
          </div>
          <div className="island-note hidden md:block">
            <div className="mb-5 flex items-center justify-between text-sm text-muted">
              <span>บันทึกเกาะวันนี้</span>
              <span>🌿</span>
            </div>
            <p className="font-display text-xl font-bold text-ink">เริ่มอ่านตรงไหนดี?</p>
            <p className="mt-3 text-sm leading-7 text-muted">
              เพิ่งเล่นใหม่ แนะนำให้เริ่มจาก Tutorial และกฎที่ควรรู้ก่อน
            </p>
            <InternalLink to="/#new-player" navigate={navigate} className="button-primary mt-6 w-full">
              ดูชุดเริ่มต้น
            </InternalLink>
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
            title="เริ่มสร้างเกาะอย่างไม่หลงทาง"
            description="ลิงก์แนะนำสำหรับคนเพิ่งเข้ากลุ่มหรือเพิ่งเปิดเกมครั้งแรก"
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
            title="ทุกหมวดในสมุดคู่มือ"
            description="จำนวนลิงก์จะเพิ่มขึ้นได้เรื่อย ๆ เมื่อนำโพสต์จากกลุ่มมาจัดหมวด"
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
            title="เรื่องน่าเช็กในช่วงนี้"
            description="พื้นที่รวมไกด์รายเดือน อีเวนต์ ไอเทมเทศกาล และข่าวล่าสุด"
            action={
              <InternalLink to="/category/monthly-guide" navigate={navigate} className="text-link">
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
