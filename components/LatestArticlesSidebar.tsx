import Link from "next/link";
import { urlFor } from "@/lib/sanity";

// 1. Definisikan Tipe Data Props (Obat anti-error build)
type LatestArticlesSidebarProps = {
  posts: any[];
};

// 2. Helper URL Konsisten
function getPostUrl(post: any) {
  const catSlug = post.categorySlug || "artikel";
  const postSlug = post.slug?.current || post.slug || "";
  return `/category/${catSlug}/${postSlug}`;
}

export default function LatestArticlesSidebar({ posts }: LatestArticlesSidebarProps) {
  
  // Safety Guard: Jika data kosong
  if (!posts || posts.length === 0) return null;

  return (
    <div className="sidebar-section">
      {/* HEADER SIDEBAR */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "25px" }}>
        <div style={{ width: "4px", height: "20px", background: "#5D427C", borderRadius: "10px" }}></div>
        <h3 style={{ 
          fontSize: "17px", 
          color: "#2D2438", 
          fontWeight: "900", 
          margin: 0, 
          letterSpacing: "0.5px",
          textTransform: "uppercase"
        }}>
          Artikel <span style={{ color: "#B294D1" }}>Terbaru</span>
        </h3>
      </div>

      {/* LIST ARTIKEL */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {posts.slice(0, 4).map((post: any) => (
          <Link 
            key={post._id} 
            href={getPostUrl(post)} 
            style={{ 
              display: "flex", 
              gap: "15px", 
              textDecoration: "none", 
              alignItems: "center",
              padding: "5px 0"
            }}
            className="sidebar-item-group"
          >
            {/* THUMBNAIL KECIL */}
            <div style={{
              width: "85px",
              height: "65px",
              borderRadius: "12px",
              overflow: "hidden",
              flexShrink: 0,
              backgroundColor: "#F9F6FB"
            }}>
              <img
                src={post.mainImage ? urlFor(post.mainImage).width(200).height(150).url() : "https://via.placeholder.com/200x150?text=Hermawati"}
                alt={post.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "0.3s" }}
                className="sidebar-img"
              />
            </div>

            {/* INFO TEKS */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <h4 style={{ 
                fontSize: "13.5px", 
                fontWeight: "800", 
                color: "#2D2438", 
                margin: 0, 
                lineHeight: "1.4",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden"
              }} className="sidebar-title">
                {post.title}
              </h4>
              <span style={{ fontSize: "10px", color: "#B294D1", fontWeight: "700", textTransform: "uppercase" }}>
                {new Date(post.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "short" })} • {post.categoryName || "Inspirasi"}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .sidebar-item-group:hover .sidebar-title { color: #5D427C !important; }
        .sidebar-item-group:hover .sidebar-img { transform: scale(1.1); }
      `}} />
    </div>
  );
}