import Link from "next/link";
import { getArticlePosts, getAllPosts } from "@/lib/sanity.query";

// 🔥 helper URL (Handle slug objek Sanity)
function getPostUrl(item: any) {
  const category = item.categorySlug || "artikel";
  const slug = item.slug?.current || item.slug || "";
  return `/category/${category}/${slug}`;
}

export default async function LatestArticlesSidebar() {
  // 1. Coba ambil data Artikel
  let articles = await getArticlePosts();

  // 2. SAFETY GUARD: Kalau Artikel kosong, ambil dari All Posts biar gak bolong
  if (!articles || articles.length === 0) {
    const backup = await getAllPosts();
    articles = backup?.slice(0, 5) || [];
  }

  // 3. FINAL GUARD: Kalau beneran kosong melompong di Sanity
  if (articles.length === 0) return null;

  return (
    <div style={{ 
      background: '#5D427C', 
      borderRadius: '24px', 
      padding: '30px 25px', 
      color: '#fff',
      height: 'fit-content', 
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 15px 35px rgba(93, 66, 124, 0.2)',
    }}>
      {/* HEADER */}
      <div style={{ 
        borderBottom: '2px solid rgba(178, 148, 209, 0.3)', 
        paddingBottom: '15px', 
        marginBottom: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h4 style={{ 
          color: '#B294D1', 
          fontSize: '14px', 
          fontWeight: '900', 
          margin: 0, 
          letterSpacing: '1.5px',
          textTransform: 'uppercase'
        }}>
          ARTIKEL <span style={{ color: '#fff' }}>TERBARU</span>
        </h4>
        <span style={{ fontSize: '18px' }}>✨</span>
      </div>

      {/* LIST ARTIKEL */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {articles.slice(0, 5).map((item: any) => (
          <Link 
            href={getPostUrl(item)} 
            key={item._id} 
            style={{ 
              textDecoration: 'none', 
              color: '#fff', 
              display: 'block',
              padding: '16px 0',
              borderBottom: '1px solid rgba(178, 148, 209, 0.15)',
            }}
          >
            <h5 style={{ 
              fontSize: '14.5px', 
              fontWeight: '700', 
              lineHeight: '1.5', 
              margin: '0 0 8px 0',
              color: '#fdfbff',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {item.title}
            </h5> 
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', opacity: 0.6, fontWeight: '600' }}>
                {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('id-ID', {
                  day: 'numeric', month: 'short'
                }) : 'Baru saja'}
              </span>
              <span style={{ fontSize: '9px', color: '#B294D1', fontWeight: '900', letterSpacing: '0.5px' }}>
                BACA ❯
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* FOOTER LINK */}
      <div style={{ paddingTop: '20px' }}>
        <Link href="/category/artikel" style={{ 
          display: 'block',
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          color: '#fff',
          padding: '12px',
          borderRadius: '30px',
          fontSize: '11px',
          fontWeight: '900',
          textDecoration: 'none',
          border: '1px solid rgba(178, 148, 209, 0.3)',
          letterSpacing: '1px',
        }}>
          LIHAT SEMUA ARTIKEL
        </Link>
      </div>
    </div>
  );
}