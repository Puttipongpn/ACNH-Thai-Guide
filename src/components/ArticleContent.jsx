export default function ArticleContent({ content }) {
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
      {content.alert && (
        <aside className="article-alert" aria-label={content.alert.title}>
          <h2>{content.alert.title}</h2>
          <p>{content.alert.text}</p>
        </aside>
      )}
      {content.sections.map((section) => (
        <section key={section.title} className="article-section">
          <h2>{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
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
