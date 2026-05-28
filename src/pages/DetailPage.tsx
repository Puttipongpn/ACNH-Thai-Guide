import { getRelatedGuides } from "../data/content";
import { getPostImageAsset } from "../data/postImageAssets";
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
  const imageAsset = getPostImageAsset(guide.id);
  const coverImage = imageAsset?.images[0];

  return (
    <div className="page-container max-w-4xl py-8 pb-24 sm:py-12">
      <InternalLink to={`/category/${category.id}`} navigate={navigate} className="text-link text-sm">
        ← กลับไป {category.shortName}
      </InternalLink>
      <article className="detail-paper mt-6">
        {coverImage && (
          <figure className="detail-cover">
            <img src={coverImage.src} alt={coverImage.alt} />
            <figcaption>{imageAsset?.title} · รูปจากโพสต์ต้นทาง</figcaption>
          </figure>
        )}
        <div className="mb-5 flex flex-wrap gap-2">
          <TagPill>{category.title}</TagPill>
          {guide.status === "core" && <TagPill>หัวข้อหลัก</TagPill>}
          {guide.tags.map((tag) => (
            <TagPill key={tag}>{tag}</TagPill>
          ))}
        </div>
        <h1 className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">{guide.title}</h1>
        <p className="mt-5 text-base leading-8 text-muted">{guide.description}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {guide.updatedAt && (
            <p className="rounded-xl bg-cream-deep/55 px-4 py-3 text-sm text-muted">{guide.updatedAt}</p>
          )}
          {guide.postAuthor && (
            <p className="rounded-xl bg-leaf-pale/65 px-4 py-3 text-sm text-muted">เรียบเรียงจากโพสต์ของ {guide.postAuthor}</p>
          )}
        </div>
        {guide.sourceExcerpt && (
          <section className="source-excerpt">
            <p className="eyebrow">จากคำอธิบายโพสต์</p>
            <p>{guide.sourceExcerpt}</p>
          </section>
        )}
        {guide.subLinks && guide.subLinks.length > 0 && (
          <section className="sub-link-panel">
            <div>
              <p className="eyebrow">หัวข้อย่อยในเว็บนี้</p>
              <h2 className="font-display text-xl font-bold text-ink">
                เปิดอ่านแยกตามหัวข้อ โดยยังอยู่ในเว็บเรา
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted">
                โพสต์ต้นทางทำหน้าที่เป็นสารบัญหลัก ส่วนการ์ดด้านล่างจะพาไปหน้าเนื้อหาในเว็บนี้
                และเก็บ Facebook ไว้เป็นแหล่งอ้างอิงของแต่ละหน้า
              </p>
            </div>
            <div className="sub-link-grid">
              {guide.subLinks.map((subLink) => (
                <InternalLink key={subLink.url} to={subLink.url} navigate={navigate} className="sub-link-card">
                  <span>{subLink.kind === "month" ? "🗓️" : "📌"}</span>
                  <strong>{subLink.label}</strong>
                  {subLink.description && <small>{subLink.description}</small>}
                </InternalLink>
              ))}
            </div>
          </section>
        )}
        {imageAsset && (
          <section className="mt-8">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">รูปจากโพสต์หลัก</p>
                <h2 className="font-display text-xl font-bold text-ink">{imageAsset.imageCount} รูปที่เก็บไว้</h2>
                <p className="mt-2 text-sm leading-7 text-muted">
                  ใช้เป็นภาพอ้างอิงจากโพสต์ต้นทาง ไม่ได้ตีความแทนเจ้าของโพสต์ รูปไหนเป็นเนื้อหาหลักจะอยู่ใกล้สรุปของโพสต์นั้น
                </p>
              </div>
            </div>
            <div className="image-gallery">
              {imageAsset.images.map((image) => (
                <figure key={image.imageId}>
                  <img src={image.src} alt={image.alt} loading="lazy" />
                  <figcaption>{image.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}
        {guide.articleContent ? (
          <ArticleContent content={guide.articleContent} />
        ) : (
          <section className="article-content mt-8">
            <div className="article-lead">
              <p>
                หน้านี้เป็นหน้ารวมรายละเอียดแบบย่อของลิงก์ในสารบัญ ใช้เก็บคำอธิบาย หมวดหมู่ รูปประกอบ
                และข้อมูลหลักที่อ่านได้บนเว็บ ก่อนค่อยเติมรายละเอียดเชิงลึกเพิ่มในรอบถัดไป
              </p>
              <p>{guide.assetSummary || guide.description}</p>
            </div>
          </section>
        )}
        <section className="mt-8 rounded-2xl border border-dashed border-leaf/25 bg-white/60 p-5">
          <h2 className="font-display text-lg font-bold text-ink">ลิงก์ต้นทาง</h2>
          <p className="mt-2 mb-4 text-sm leading-7 text-muted">
            กดเปิดโพสต์ Facebook เพื่ออ่านต้นฉบับ คอมเมนต์ และรายละเอียดเพิ่มเติมจากเจ้าของโพสต์
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
