// app/search/page.tsx
import { searchPosts } from "@/lib/sanity.query";
import NewsCard from "@/components/NewsCard";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>; 
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";
  
  // Ambil data dari Sanity
  const results = query ? await searchPosts(query) : [];

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <div className="container" style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '40px 20px', 
      }}>
        
        {/* HEADER HASIL PENCARIAN */}
        <div style={{ 
          borderBottom: '1px solid #F0EAF5', 
          marginBottom: '45px', 
          paddingBottom: '30px' 
        }}>
          <h1 style={{ fontSize: '32px', color: '#2D2438', fontWeight: '900', margin: 0 }}>
            HASIL PENCARIAN: <span style={{ color: '#B294D1' }}>"{query}"</span>
          </h1>
          <p style={{ color: '#666', marginTop: '12px', fontSize: '15px', fontWeight: 500 }}>
            Menampilkan <strong>{results.length}</strong> artikel yang cocok untuk Anda.
          </p>
        </div>

        {/* LOGIKA TAMPILAN HASIL */}
        {results.length > 0 ? (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: '35px' 
          }}>
            {results.map((post: any) => (
              <NewsCard 
                key={post._id}
                post={post} 
              />
            ))}
          </div>
        ) : (
          /* TAMPILAN KOSONG (EMPTY STATE) */
          <div style={{ 
            textAlign: 'center', 
            padding: '100px 20px', 
            backgroundColor: '#F9F6FB', 
            borderRadius: '30px',
            border: '2px dashed #EADFF2'
          }}>
            <div style={{ fontSize: '70px', marginBottom: '25px' }}>🔎</div>
            <h3 style={{ color: '#5D427C', fontSize: '24px', fontWeight: '900' }}>
              Aduh, Barangnya Gak Ada Gaes!
            </h3>
            <p style={{ color: '#64748B', maxWidth: '500px', margin: '15px auto', lineHeight: '1.7', fontSize: '15px' }}>
              Kami nggak nemu artikel dengan kata kunci <strong>"{query}"</strong>. 
              Coba pakai kata yang lebih umum kayak "pendidikan", "parenting", atau "sekolah".
            </p>
            <div style={{ marginTop: '35px' }}>
              <a href="/" style={{ 
                backgroundColor: '#5D427C', 
                color: '#fff', 
                padding: '14px 35px', 
                borderRadius: '18px', 
                textDecoration: 'none', 
                fontWeight: '800',
                fontSize: '14px',
                boxShadow: '0 10px 20px rgba(93, 66, 124, 0.2)',
                display: 'inline-block'
              }}>
                Balik ke Beranda ➔
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}