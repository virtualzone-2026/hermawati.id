// components/Headline.tsx
import { getEducationPosts } from "@/lib/sanity.query";
import Link from "next/link";

// 🔥 helper URL (biar konsisten)
function getPostUrl(post: any) {
  const category = post.categorySlug || "pendidikan";
  return `/category/${category}/${post.slug}`;
}

/**
 * Headline Component
 */
export default async function Headline() {
  const allPosts = await getEducationPosts();

  // GUARD
  if (!allPosts || allPosts.length === 0) {
    return (
      <div
        style={{
          height: "480px",
          background: "#f8f6fa",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px dashed #B294D1",
        }}
      >
        <p style={{ color: "#5D427C", fontWeight: "600" }}>
          Belum ada konten unggulan untuk ditampilkan.
        </p>
      </div>
    );
  }

  const mainNews = allPosts[0];
  const relatedNews = allPosts.slice(1, 3);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(93, 66, 124, 0.15)",
        height: "520px",
        backgroundColor: "#5D427C",
      }}
    >
      {/* BACKGROUND */}
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        <img
          src={
            mainNews.image ||
            "https://via.placeholder.com/1200/600?text=Inspirasi+Keluarga"
          }
          alt={mainNews.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        {/* OVERLAY */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background:
              "linear-gradient(to top, rgba(93,66,124,1) 0%, rgba(93,66,124,0.8) 50%, transparent 100%)",
            padding: "80px 40px 40px 40px",
            color: "#fff",
          }}
        >
          {/* LABEL */}
          <div
            style={{
              backgroundColor: "#B294D1",
              color: "#fff",
              display: "inline-block",
              padding: "5px 15px",
              borderRadius: "30px",
              fontSize: "11px",
              fontWeight: "800",
              marginBottom: "20px",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
            }}
          >
            KONTEN UNGGULAN
          </div>

          {/* 🔥 JUDUL (FIX URL DI SINI) */}
          <Link
            href={getPostUrl(mainNews)}
            style={{ textDecoration: "none", color: "#fff" }}
          >
            <h2
              style={{
                fontSize: "42px",
                fontWeight: "900",
                margin: "0 0 15px 0",
                lineHeight: "1.1",
                textShadow: "2px 2px 10px rgba(0,0,0,0.3)",
                cursor: "pointer",
                maxWidth: "85%",
              }}
            >
              {mainNews.title}
            </h2>
          </Link>

          {/* META */}
          <p
            style={{
              fontSize: "14px",
              opacity: 0.9,
              fontWeight: "500",
              marginBottom: 0,
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span style={{ color: "#D8B4FE" }}>●</span>{" "}
            {mainNews.category || mainNews.categorySlug || "Pendidikan"}
            <span style={{ opacity: 0.5 }}>|</span>
            {new Date(mainNews.publishedAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          {/* RELATED */}
          {relatedNews.length > 0 && (
            <div
              style={{
                marginTop: "30px",
                paddingTop: "25px",
                borderTop: "1px solid rgba(216, 180, 254, 0.3)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "50px",
              }}
            >
              {relatedNews.map((related: any) => (
                <Link
                  key={related._id}
                  href={getPostUrl(related)} // 🔥 FIX DI SINI JUGA
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <div style={{ cursor: "pointer" }}>
                    <span
                      style={{
                        color: "#D8B4FE",
                        fontSize: "11px",
                        fontWeight: "800",
                        display: "block",
                        marginBottom: "8px",
                        textTransform: "uppercase",
                      }}
                    >
                      Baca Juga
                    </span>
                    <p
                      style={{
                        fontSize: "16px",
                        margin: 0,
                        fontWeight: "700",
                        lineHeight: "1.4",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        opacity: 0.9,
                      }}
                    >
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