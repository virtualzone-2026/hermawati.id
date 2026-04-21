// components/LatestArticlesSidebar.tsx
import Link from "next/link";
import { getArticlePosts } from "@/lib/sanity.query";

export default async function LatestArticlesSidebar() {
  const articles = await getArticlePosts();

  return (
    <div style={{ 
      background: '#5D427C', 
      borderRadius: '16px', 
      padding: '25px 20px', 
      color: '#fff',
      // PERBAIKAN: Gunakan fit-content agar tidak memanjang ke bawah
      height: 'fit-content', 
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 8px 25px rgba(93, 66, 124, 0.2)',
      // Tambahkan margin bottom agar tidak menempel dengan widget di bawahnya
      marginBottom: '10px' 
    }}>
      {/* HEADER */}
      <div style={{ 
        borderBottom: '2px solid #B294D1', 
        paddingBottom: '12px', 
        marginBottom: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h4 style={{ 
          color: '#D8B4FE', 
          fontSize: '15px', 
          fontWeight: '900', 
          margin: 0, 
          letterSpacing: '1px' 
        }}>
          ARTIKEL TERBARU
        </h4>
        <span style={{ fontSize: '18px' }}>✍️</span>
      </div>

      {/* LIST ARTIKEL */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {articles && articles.length > 0 ? (
          // Kita batasi hanya muncul 5-6 artikel saja agar tidak terlalu panjang
          articles.slice(0, 6).map((item: any) => (
            <Link 
              href={`/post/${item.slug}`} 
              key={item._id} 
              style={{ 
                textDecoration: 'none', 
                color: '#fff', 
                display: 'block',
                padding: '12px 0',
                borderBottom: '1px solid rgba(178, 148, 209, 0.15)'
              }}
            >
              <h5 style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                lineHeight: '1.4', 
                margin: '0 0 6px 0',
                color: '#fdfbff',
                // Batasi judul maksimal 2 baris agar rapi
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {item.title}
              </h5> 
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '10px', opacity: 0.7 }}>
                  {new Date(item.publishedAt).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'short', year: 'numeric'
                  })}
                </span>
                <span style={{ fontSize: '10px', color: '#B294D1', fontWeight: '900' }}>BACA ❯</span>
              </div>
            </Link>
          ))
        ) : (
          <p style={{ fontSize: '13px', opacity: 0.7, textAlign: 'center', padding: '20px 0' }}>
            Belum ada artikel terbaru.
          </p>
        )}
      </div>

      {/* FOOTER LINK */}
      <div style={{ paddingTop: '20px' }}>
        <Link href="/category/artikel" style={{ 
          display: 'block',
          textAlign: 'center',
          backgroundColor: 'rgba(178, 148, 209, 0.15)',
          color: '#D8B4FE',
          padding: '10px',
          borderRadius: '30px',
          fontSize: '12px',
          fontWeight: '800',
          textDecoration: 'none',
          border: '1px solid rgba(178, 148, 209, 0.3)',
        }}>
          LIHAT SEMUA ARTIKEL
        </Link>
      </div>
    </div>
  );
}