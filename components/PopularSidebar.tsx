// components/PopularSidebar.tsx
import { getNewsPosts } from "@/lib/sanity.query";
import Link from "next/link";

// 🔥 helper URL biar konsisten
function getPostUrl(post: any) {
  const category = post.categorySlug || "berita";
  return `/category/${category}/${post.slug}`;
}

export default async function PopularSidebar() {
  const popularData = await getNewsPosts();

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <h2
        style={{
          fontSize: "18px",
          color: "#5D427C",
          fontWeight: "900",
          marginBottom: "20px",
          paddingLeft: "12px",
          borderLeft: "4px solid #B294D1",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        Tulisan Terpopuler
      </h2>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {popularData && popularData.length > 0 ? (
          popularData.slice(0, 5).map((news: any, index: number) => (
            <Link
              href={getPostUrl(news)} // ✅ FIX DI SINI
              key={news._id}
              style={{
                display: "flex",
                gap: "12px",
                textDecoration: "none",
                padding: "14px 10px",
                borderBottom: "1px solid #f8f6fa",
                transition: "all 0.2s",
              }}
            >
              {/* Rank */}
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: "900",
                  color: index < 3 ? "#B294D1" : "#e2d7eb",
                  minWidth: "35px",
                  fontStyle: "italic",
                  lineHeight: "1",
                }}
              >
                {index + 1}
              </span>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#2D2438",
                    margin: 0,
                    lineHeight: "1.4",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {news.title}
                </h3>

                <div
                  style={{
                    fontSize: "11px",
                    color: "#999",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span
                    style={{
                      color: "#5D427C",
                      fontWeight: "800",
                      textTransform: "uppercase",
                    }}
                  >
                    {news.category || news.categorySlug || "Pendidikan"}
                  </span>

                  <span style={{ opacity: 0.5 }}>•</span>

                  <span>
                    {news.publishedAt
                      ? new Date(news.publishedAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                        })
                      : "-"}
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p
            style={{
              fontSize: "12px",
              color: "#999",
              textAlign: "center",
              padding: "20px",
            }}
          >
            Belum ada tulisan populer saat ini.
          </p>
        )}
      </div>

      {/* BUTTON */}
      <Link
        href="/category/pendidikan"
        style={{
          marginTop: "20px",
          padding: "12px",
          textAlign: "center",
          color: "#5D427C",
          fontWeight: "800",
          fontSize: "12px",
          textDecoration: "none",
          backgroundColor: "#fcfaff",
          borderRadius: "30px",
          border: "1px solid #f0eaf5",
          letterSpacing: "0.5px",
        }}
      >
        LIHAT SEMUA TULISAN →
      </Link>
    </section>
  );
}