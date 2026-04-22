import Link from "next/link";

// 1. Definisikan Tipe Data agar TypeScript tidak protes
type PopularSidebarProps = {
  posts: any[];
};

// 2. Helper URL Konsisten
function getPostUrl(post: any) {
  const category = post.categorySlug || "berita";
  const slug = post.slug?.current || post.slug || "";
  return `/category/${category}/${slug}`;
}

// 3. Hapus 'async' karena data sekarang dikirim dari page.tsx (Props)
export default function PopularSidebar({ posts }: PopularSidebarProps) {
  
  // Ambil data yang dikirim, jika kosong tampilkan pesan safety
  const popularData = posts || [];

  return (
    <section style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {/* HEADER: Deep Purple & Lavender */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "25px" }}>
        <div style={{ width: "5px", height: "24px", background: "#B294D1", borderRadius: "10px" }}></div>
        <h2 style={{ fontSize: "19px", color: "#5D427C", fontWeight: "900", margin: 0, letterSpacing: "1px" }}>
          TER<span style={{ color: "#B294D1" }}>POPULER</span>
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {popularData.length > 0 ? (
          popularData.slice(0, 5).map((news: any, index: number) => {
            const isEven = (index + 1) % 2 === 0;
            const rankColor = isEven ? "#B294D1" : "#E2D7EB";

            return (
              <Link
                href={getPostUrl(news)}
                key={news._id || index}
                style={{
                  display: "grid",
                  gridTemplateColumns: "65px 1fr", 
                  gap: "12px",
                  textDecoration: "none",
                  padding: "18px 0",
                  borderBottom: "1px solid #f8f6fa",
                  alignItems: "start", 
                }}
              >
                {/* 1. RANK NUMBER (GIANT & ALIGNED) */}
                <div style={{ lineHeight: "0.7", display: "flex", alignItems: "start" }}>
                  <span style={{ 
                    fontSize: "46px", 
                    fontWeight: "900", 
                    fontStyle: "italic", 
                    color: rankColor,
                    fontFamily: "Arial Black, sans-serif",
                    lineHeight: "0.7"
                  }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* 2. CONTENT AREA */}
                <div style={{ display: "flex", flexDirection: "column", paddingTop: "5px" }}>
                  <h3 style={{
                    fontSize: "15px",
                    fontWeight: "800",
                    color: "#2D2438",
                    margin: "0 0 6px 0",
                    lineHeight: "1.3",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}>
                    {news.title}
                  </h3>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "10px", fontWeight: "800" }}>
                    <span style={{ color: "#B294D1", textTransform: "uppercase" }}>
                      {news.categoryName || "Inspirasi"}
                    </span>
                    <span style={{ color: "#eee" }}>•</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#B294D1", opacity: 0.7 }}>
                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                       <span>{news.views || "1.2k"}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div style={{ padding: "20px", textAlign: "center", color: "#ccc", fontSize: "13px" }}>
            Belum ada postingan populer gaes...
          </div>
        )}
      </div>
    </section>
  );
}