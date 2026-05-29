import type { ArticleContentBlock, ArticleContentData, ArticleImage } from "../types/content";

interface ArticleContentProps {
  content?: ArticleContentData;
}

function ArticleFigure({ image, size }: { image: ArticleImage; size?: "normal" | "wide" }) {
  return (
    <figure className={`article-inline-image ${size === "wide" ? "article-inline-image-wide" : ""}`}>
      <img src={image.src} alt={image.alt} loading="lazy" />
      {image.caption && <figcaption>{image.caption}</figcaption>}
    </figure>
  );
}

function renderBlock(block: ArticleContentBlock, index: number) {
  if (block.type === "paragraph") {
    return (
      <p key={`${block.type}-${index}`} className="article-block-paragraph">
        {block.text}
      </p>
    );
  }

  if (block.type === "image") {
    return <ArticleFigure key={`${block.type}-${block.image.src}-${index}`} image={block.image} size={block.size} />;
  }

  if (block.type === "gallery") {
    return (
      <div key={`${block.type}-${index}`} className="article-inline-gallery">
        {block.images.map((image) => (
          <ArticleFigure key={image.src} image={image} />
        ))}
      </div>
    );
  }

  if (block.type === "note") {
    return (
      <aside key={`${block.type}-${index}`} className="article-note">
        {block.title && <h3>{block.title}</h3>}
        <p>{block.text}</p>
      </aside>
    );
  }

  return (
    <section key={`${block.type}-${index}`} className="article-checklist article-checklist-inline">
      {block.title && <h2>{block.title}</h2>}
      <ul>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default function ArticleContent({ content }: ArticleContentProps) {
  if (!content) return null;

  return (
    <div className="article-content mt-8">
      {content.coverImage && (
        <figure className="mb-8 overflow-hidden rounded-2xl bg-cream-deep">
          <img className="w-full object-cover" src={content.coverImage.src} alt={content.coverImage.alt} />
          {content.coverImage.caption && (
            <figcaption className="px-4 py-3 text-xs text-muted">{content.coverImage.caption}</figcaption>
          )}
        </figure>
      )}
      <p className="eyebrow">{content.label}</p>
      <div className="article-lead">
        {content.lead.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {content.body?.map(renderBlock)}
      {content.alert && (
        <aside className="article-alert" aria-label={content.alert.title}>
          <h2>{content.alert.title}</h2>
          <p>{content.alert.text}</p>
        </aside>
      )}
      {content.sections.map((section) => (
        <section key={section.title} className="article-section">
          <h2>{section.title}</h2>
          {section.blocks
            ? section.blocks.map(renderBlock)
            : section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>
      ))}
      {content.checklist && (
        <section className="article-checklist">
          <h2>{content.checklist.title}</h2>
          <ul>
            {content.checklist.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}
      {content.closing && <p className="article-closing">{content.closing}</p>}
    </div>
  );
}
