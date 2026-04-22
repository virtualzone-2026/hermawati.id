import { urlFor } from "@/lib/sanity";
import Link from "next/link";

// 1. Definisikan Tipe Data agar TypeScript tidak marah
type HeadlineProps = {
  posts: any[];
};

// 2. Helper URL (Handle slug objek Sanity)
function getPostUrl(post: any) {
  const category = post.categorySlug || "pendidikan";
  const slug = post.slug?.current || post.slug || "";
  return `/category/${category}/${slug}`;
}

export default function Headline({ posts }: HeadlineProps) {
  // 3. FINAL GUARD: Jika data yang dikirim dari page.tsx kosong
  if (!posts || posts.length === 0) {
    return (
      <div style={{ 
        height: "520px", 
        background: "#f8f6fa", 
        borderRadius: "24px", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        border: "2px dashed #B294D1" 
      }}>
        <p style={{ color: "#5D427C", fontWeight: "800" }}>Belum ada kiriman artikel gaes...</p>
      </div>
    );
  }

  // Ambil berita utama (indeks 0) dan 2 berita terkait di bawahnya
  const mainNews = posts[0];
  const relatedNews = posts.slice(1, 3);

  return (
    <section style={{
        position: "relative",
        width: "100%",
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: "0 20px 40px rgba(93, 66, 124, 0.15)",
        height: "520px",
        backgroundColor: "#2D1B42", 
      }}>
      
      {/* VISUAL UTAMA */}
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        {/* Prioritas: mainImage, lalu image, lalu fallback gradient */}
        {(mainNews.mainImage || mainNews.image) ? (
          <img
            src={urlFor(mainNews.mainImage || mainNews.image).width(1200).height(800).url()}
            alt={mainNews.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #5D427C, #45315d)" }} />
        )}

        {/* OVERLAY GRADIENT PEKAT */}
        <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(26,12,46,1) 0%, rgba(26,12,46,0.7) 40%, transparent 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "40px",
            color: "#fff",
          }}>
          
          {/* JUDUL UTAMA */}
          <Link href={getPostUrl(mainNews)} style={{ textDecoration: "none", color: "#fff" }}>
            <h2 style={{
                fontSize: "clamp(22px, 5vw, 40px)",
                fontWeight: "900",
                margin: "0 0 15px 0",
                lineHeight: "1.1",
                maxWidth: "95%",
                transition: "color 0.2s"
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#B294D1")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#fff")}
            >
              {mainNews.title}
            </h2>
          </Link>

          {/* META INFO */}
          <div style={{
              fontSize: "13px",
              fontWeight: "800",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: relatedNews.length > 0 ? "35px" : "0",
              letterSpacing: "0.5px"
            }}>
            <span style={{ color: "#B294D1", textTransform: "uppercase" }}>
              {mainNews.categoryName || mainNews.categorySlug || "INSPIRASI"}
            </span>
            <span style={{ opacity: 0.4 }}>●</span>
            <span style={{ opacity: 0.9 }}>
              {new Date(mainNews.publishedAt || Date.now()).toLocaleDateString("id-ID", {
                day: "numeric", month: "long", year: "numeric",
              })}
            </span>
          </div>

          {/* RELATED NEWS (SEJAJAR DI BAWAH) */}
          {relatedNews.length > 0 && (
            <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "40px",
                paddingTop: "25px",
                borderTop: "1px solid rgba(178, 148, 209, 0.3)",
              }}>
              {relatedNews.map((related: any) => (
                <Link key={related._id} href={getPostUrl(related)} style={{ textDecoration: "none", color: "#fff" }}>
                  <div style={{ opacity: 0.9 }}>
                    <span style={{
                        color: "#B294D1",
                        fontSize: "10px",
                        fontWeight: "900",
                        display: "block",
                        marginBottom: "6px",
                        letterSpacing: "1px"
                      }}>
                      BACA JUGA
                    </span>
                    <p style={{
                        fontSize: "15px",
                        margin: 0,
                        fontWeight: "700",
                        lineHeight: "1.4",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}>
                      {related.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}