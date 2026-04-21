// app/search/page.tsx
import { searchPosts } from "@/lib/sanity.query";
import NewsCard from "@/components/NewsCard";

/**
 * Halaman Hasil Pencarian
 * searchParams pada Next.js 15+ adalah sebuah Promise
 */
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>; 
}) {
  // 1. WAJIB: Await searchParams agar data 'q' tertangkap
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";
  
  // 2. Jalankan fungsi search di Sanity dengan kata kunci yang sudah tertangkap
  const results = query ? await searchPosts(query) : [];

  return (
    <div className="container" style={{ 
      maxWidth: '1200px', 
      margin: '40px auto', 
      padding: '0 20px', 
      minHeight: '70vh' 
    }}>
      {/* JUDUL HASIL PENCARIAN */}
      <div style={{ borderBottom: '2px solid #f0f0f0', marginBottom: '40px', paddingBottom: '20px' }}>
        <h1 style={{ fontSize: '32px', color: '#1a365d', fontWeight: '900', margin: 0 }}>
          HASIL PENCARIAN: <span style={{ color: '#d4af37' }}>"{query}"</span>
        </h1>
        <p style={{ color: '#666', marginTop: '10px', fontSize: '15px' }}>
          Ditemukan <strong>{results.length}</strong> postingan yang relevan dengan kata kunci Anda.
        </p>
      </div>

      {/* TAMPILAN HASIL */}
      {results.length > 0 ? (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '30px' 
        }}>
          {results.map((post: any) => (
            <NewsCard 
              key={post._id}
              post={post} 
            />
          ))}
        </div>
      ) : (
        /* TAMPILAN JIKA TIDAK ADA HASIL */
        <div style={{ 
          textAlign: 'center', 
          padding: '100px 20px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '15px' 
        }}>
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>🔍</div>
          <h3 style={{ color: '#1a365d', fontSize: '24px', fontWeight: '800' }}>
            Aduh, Pencarian Tidak Ditemukan
          </h3>
          <p style={{ color: '#666', maxWidth: '500px', margin: '15px auto', lineHeight: '1.6' }}>
            Kami tidak dapat menemukan hasil untuk <strong>"{query}"</strong>. 
            Coba periksa ejaan Anda atau gunakan kata kunci yang lebih umum seperti "pendidikan" atau "parenting".
          </p>
          <div style={{ marginTop: '30px' }}>
            <a href="/" style={{ 
              backgroundColor: '#1a365d', 
              color: '#fff', 
              padding: '12px 25px', 
              borderRadius: '30px', 
              textDecoration: 'none', 
              fontWeight: '700' 
            }}>
              Kembali ke Beranda
            </a>
          </div>
        </div>
      )}
    </div>
  );
}