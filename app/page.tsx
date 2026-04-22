import { 
  getAllPosts, 
  getPopularPosts, 
  getDocumentPosts, 
  getArticlePosts, 
  getNewsPosts 
} from "@/lib/sanity.query";
import Headline from "@/components/Headline";
import TopNews from "@/components/TopNews";
import PopularSidebar from "@/components/PopularSidebar";
import RecommendationSection from "@/components/RecommendationSection";
import LatestPosts from "@/components/LatestPosts";
import DocumentSidebar from "@/components/DocumentSidebar";
import LatestArticlesSidebar from "@/components/LatestArticlesSidebar";
import CategoryPills from "@/components/CategoryPills";
import Image from "next/image";

// Konfigurasi agar halaman selalu fresh (Dynamic Rendering)
export const dynamic = 'force-dynamic';
export const revalidate = 0; 

export default async function Home() {
  // 1. Ambil semua data secara paralel agar loading sat-set!
  const [
    allPosts, 
    popularPosts, 
    documentData, 
    sidebarArticles, 
    newsPosts
  ] = await Promise.all([
    getAllPosts().catch(() => []), 
    getPopularPosts().catch(() => []), 
    getDocumentPosts().catch(() => []), 
    getArticlePosts().catch(() => []), 
    getNewsPosts().catch(() => []),
  ]);

  // 2. Safety Guard: Jika Sanity lagi error atau kosong
  if (!allPosts || allPosts.length === 0) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center', backgroundColor: '#fff', minHeight: '100vh' }}>
        <h2 style={{ color: '#5D427C', fontWeight: 900 }}>Belum ada data kiriman gaes...</h2>
        <p style={{ color: '#B294D1' }}>Coba cek koneksi Sanity kamu atau tambahkan konten baru.</p>
      </div>
    );
  }

  return (
    <div className="home-wrapper" style={{ minHeight: '100vh', backgroundColor: '#fff', color: '#2D2438' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* --- 1. TOP NEWS ROW (Berita Berjalan/Barisan Atas) --- */}
        <section style={{ padding: '20px 0', borderBottom: '1px solid #f0eaf5' }}>
          <TopNews posts={newsPosts.length > 0 ? newsPosts : allPosts.slice(0, 5)} />
        </section>

        {/* --- 2. HERO AREA (HEADLINE & POPULAR - TIDAK STICKY) --- */}
        <div className="hero-grid-layout" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 340px', 
          gap: '40px', 
          marginTop: '30px', 
          alignItems: 'flex-start' 
        }}>
          <main className="headline-area" style={{ minWidth: 0 }}>
            <Headline posts={allPosts} />
          </main>
          
          {/* SEKSI POPULER: Sekarang Tidak Sticky (Ikut tergulung) */}
          <aside className="popular-sidebar-area hide-on-mobile">
            <PopularSidebar posts={popularPosts.length > 0 ? popularPosts : allPosts.slice(0, 5)} />
          </aside>
        </div>

        {/* --- 3. SECTION EKSPLORASI --- */}
        <section className="exploration-area" style={{ padding: '40px 0', borderBottom: '1px solid #f3f0f7', marginTop: '20px' }}>
          <CategoryPills />
          <div style={{ marginTop: '30px' }}>
            <RecommendationSection posts={allPosts} />
          </div>
        </section>

        {/* --- 4. FEED UTAMA & SIDEBAR GROUP (DOKUMEN & BRANDING) --- */}
        <div className="main-content-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 340px', 
          gap: '50px', 
          marginTop: '40px', 
          paddingBottom: '80px', 
          alignItems: 'flex-start' 
        }}>
          
          {/* Sisi Kiri: Feed Postingan Terbaru */}
          <section className="feed-area" style={{ minWidth: 0 }}>
            <LatestPosts initialPosts={allPosts} />
          </section>

          {/* Sisi Kanan: Sidebar yang tetap menempel (Sticky) */}
          <aside className="sidebar-sticky-group hide-on-mobile" style={{ position: 'sticky', top: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '45px' }}>
              
              {/* Artikel Terbaru di Sidebar */}
              <LatestArticlesSidebar posts={sidebarArticles.length > 0 ? sidebarArticles : allPosts.slice(0, 4)} />
              
              {/* Pustaka Dokumen */}
              <DocumentSidebar documents={documentData} />
              
              {/* BRANDING WIDGET PREMIUM (Hermawati) */}
              <div style={{
                padding: '30px',
                background: 'linear-gradient(135deg, #5D427C 0%, #45315d 100%)',
                borderRadius: '24px',
                color: '#fff',
                boxShadow: '0 15px 35px rgba(93, 66, 124, 0.15)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '18px' }}>
                  <div style={{ background: '#fff', borderRadius: '50%', padding: '8px', display: 'flex' }}>
                    <Image src="/hermawati.png" alt="Logo" width={35} height={35} priority />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', color: '#B294D1', fontWeight: 900, margin: 0 }}>Hermawati</h3>
                    <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '1px', opacity: 0.8 }}>LITERASI DIGITAL</span>
                  </div>
                </div>
                <p style={{ fontSize: '13px', lineHeight: '1.7', opacity: 0.9, margin: 0 }}>
                  Media inspiratif seputar <strong>Pendidikan</strong> dan <strong>Parenting</strong>. 
                  Lentera bagi keluarga cerdas Indonesia.
                </p>
              </div>

            </div>
          </aside>
        </div>

        {/* Responsivitas Mobile (CSS Inline) */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media (max-width: 992px) {
            .hero-grid-layout, .main-content-grid { 
              display: block !important; 
            }
            .hide-on-mobile { 
              display: none !important; 
            }
            aside { 
              margin-top: 40px; 
              width: 100% !important; 
              position: static !important;
            }
          }
        `}} />

      </div>
    </div>
  );
}