import { urlFor } from "@/lib/sanity";
import Link from "next/link";

type HeadlineProps = {
  posts: any[];
};

function getPostUrl(post: any) {
  const category = post.categorySlug || "pendidikan";
  const slug = post.slug?.current || post.slug || "";
  return `/category/${category}/${slug}`;
}

export default function Headline({ posts }: HeadlineProps) {
  if (!posts || posts.length === 0) {
    return (
      <div style={{ height: "520px", background: "#f8f6fa", borderRadius: "24px", display: "flex", alignItems: "center", justifyContent: "center", border: "2px dashed #B294D1" }}>
        <p style={{ color: "#5D427C", fontWeight: "800" }}>Belum ada kiriman artikel gaes...</p>
      </div>
    );
  }

  const mainNews = posts[0];
  const relatedNews = posts.slice(1, 3);

  return (
    <section className="headline-container">
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        {/* GAMBAR UTAMA */}
        {(mainNews.mainImage || mainNews.image) ? (
          <img
            src={urlFor(mainNews.mainImage || mainNews.image).width(1200).height(800).url()}
            alt={mainNews.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #5D427C, #45315d)" }} />
        )}

        {/* OVERLAY KONTEN */}
        <div className="overlay-gradient">
          
          {/* JUDUL UTAMA - Sekarang Pakai Class 'headline-title' */}
          <Link href={getPostUrl(mainNews)} className="main-link">
            <h2 className="headline-title">
              {mainNews.title}
            </h2>
          </Link>

          {/* META INFO */}
          <div className="meta-info">
            <span className="cat-text">{mainNews.categoryName || "INSPIRASI"}</span>
            <span className="dot">●</span>
            <span>
              {new Date(mainNews.publishedAt || Date.now()).toLocaleDateString("id-ID", {
                day: "numeric", month: "long", year: "numeric",
              })}
            </span>
          </div>

          {/* RELATED NEWS */}
          {relatedNews.length > 0 && (
            <div className="related-grid">
              {relatedNews.map((related: any) => (
                <Link key={related._id} href={getPostUrl(related)} className="related-item">
                  <span className="baca-juga">BACA JUGA</span>
                  <p className="related-title">{related.title}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CSS SCOPED: Rahasia Hover Tanpa Error JavaScript */}
      <style dangerouslySetInnerHTML={{ __html: `
        .headline-container {
          position: relative;
          width: 100%;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(93, 66, 124, 0.15);
          height: 520px;
          background-color: #2D1B42;
        }
        .overlay-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(26,12,46,1) 0%, rgba(26,12,46,0.7) 40%, transparent 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 40px;
          color: #fff;
        }
        .main-link { text-decoration: none; }
        
        /* HOVER JUDUL UTAMA */
        .headline-title {
          font-size: clamp(22px, 5vw, 40px);
          font-weight: 900;
          margin: 0 0 15px 0;
          line-height: 1.1;
          max-width: 95%;
          color: #fff;
          transition: color 0.3s ease;
        }
        .main-link:hover .headline-title {
          color: #B294D1 !important;
        }

        .meta-info {
          font-size: 13px;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 30px;
          letter-spacing: 0.5px;
        }
        .cat-text { color: #B294D1; text-transform: uppercase; }
        .dot { opacity: 0.4; }

        .related-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          padding-top: 25px;
          border-top: 1px solid rgba(178, 148, 209, 0.3);
        }
        .related-item { text-decoration: none; color: #fff; opacity: 0.9; transition: 0.3s; }
        .related-item:hover { opacity: 1; transform: translateX(5px); }
        .baca-juga { color: #B294D1; fontSize: 10px; font-weight: 900; display: block; margin-bottom: 6px; letter-spacing: 1px; }
        .related-title { font-size: 15px; margin: 0; fontWeight: 700; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

        @media (max-width: 768px) {
          .related-grid { grid-template-columns: 1fr; gap: 20px; }
          .headline-container { height: 600px; }
        }
      `}} />
    </section>
  );
}