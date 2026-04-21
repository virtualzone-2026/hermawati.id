// components/TopNews.tsx
import { getNewsPosts } from "@/lib/sanity.query";
import Link from "next/link";

// helper lokal (biar komponen ini langsung aman)
function getPostUrl(item: any) {
  const category = item.categorySlug || "berita";
  return `/category/${category}/${item.slug}`;
}

export default async function TopNews() {
  const allNews = await getNewsPosts();

  // LOGIKA:
  const topBarNews =
    allNews && allNews.length >= 8
      ? allNews.slice(3, 8)
      : allNews?.slice(0, 5) || [];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "20px",
        padding: "25px 0",
        borderBottom: "1px solid #f0eaf5",
      }}
    >
      {topBarNews.map((item: any) => (
        <Link
          href={getPostUrl(item)} // ✅ FIX DI SINI
          key={item._id}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="top-news-card">
            <div
              style={{
                width: "100%",
                aspectRatio: "16/9",
                borderRadius: "12px",
                overflow: "hidden",
                marginBottom: "12px",
                backgroundColor: "#f8f6fa",
                boxShadow: "0 2px 8px rgba(93, 66, 124, 0.08)",
              }}
            >
              <img
                src={
                  item.image ||
                  "https://via.placeholder.com/240x135?text=Inspirasi"
                }
                alt={item.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            <h4
              style={{
                fontSize: "13px",
                lineHeight: "1.5",
                margin: "0 0 6px 0",
                fontWeight: "800",
                color: "#5D427C",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {item.title}
            </h4>

            <span
              style={{
                fontSize: "10px",
                color: "#B294D1",
                fontWeight: "900",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                display: "block",
              }}
            >
              {item.category || item.categorySlug || "Pendidikan"}
            </span>
          </div>
        </Link>
      ))}

      {/* SLOT KOSONG */}
      {topBarNews.length > 0 && topBarNews.length < 5 && (
        <div
          style={{
            gridColumn: `span ${5 - topBarNews.length}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ccc",
            fontSize: "11px",
            border: "1px dashed #eee",
            borderRadius: "12px",
            margin: "0 0 45px 0",
          }}
        >
          Tambah artikel lagi di Sanity untuk memenuhi slot ini.
        </div>
      )}
    </div>
  );
}