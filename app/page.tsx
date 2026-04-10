// app/page.tsx
import { getKhutbahPosts } from "@/lib/sanity.query";
import Headline from "@/components/Headline";
import TopNews from "@/components/TopNews";
import PopularSidebar from "@/components/PopularSidebar";
import RecommendationSection from "@/components/RecommendationSection";
import LatestPosts from "@/components/LatestPosts";
import KhutbahSidebar from "@/components/KhutbahSidebar";
import InfoDakwah from "@/components/InfoDakwah";

// Menjamin data dari Project ID: deyoeizv selalu segar
export const dynamic = 'force-dynamic';
export const revalidate = 0; 

export default async function Home() {
  // Mengambil data Khutbah dari Sanity
  const khutbahData = await getKhutbahPosts() || [];

  return (
    <div className="container" style={{ margin: '0 auto', maxWidth: '1200px', padding: '0 20px' }}>
      
      {/* 1. TOP NEWS (HIDDEN ON MOBILE) */}
      <div className="hide-on-mobile">
        <TopNews />
      </div>

      {/* 2. LAPIS UTAMA: HEADLINE & POPULAR */}
      <div className="main-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 340px', 
        gap: '40px', 
        marginTop: '25px' 
      }}>
        <main>
          {/* Headline Tetap Tampil di HP sebagai berita utama */}
          <Headline />
        </main>
        
        {/* POPULAR SIDEBAR (HIDDEN ON MOBILE) */}
        <aside className="hide-on-mobile">
          <PopularSidebar />
        </aside>
      </div>

      {/* 3. REKOMENDASI ACAK (HIDDEN ON MOBILE) */}
      <div className="hide-on-mobile">
        <RecommendationSection />
      </div>

      {/* 4. LAYOUT BAWAH: KHUTBAH & INFO DAKWAH */}
      <div className="bottom-layout-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 340px', 
        gap: '40px', 
        marginTop: '50px',
        paddingBottom: '60px'
      }}>
        {/* LATEST POSTS FEED (HIDDEN ON MOBILE) */}
        <section className="hide-on-mobile">
          <h2 style={{ fontSize: '22px', color: 'var(--abah-blue)', fontWeight: '900', marginBottom: '25px', textTransform: 'uppercase' }}>
            Postingan <span style={{ color: 'var(--abah-gold)' }}>Terbaru</span>
          </h2>
          <LatestPosts />
        </section>

        {/* SIDEBAR DAKWAH (ALWAYS VISIBLE) */}
        {/* Di HP, bagian ini akan muncul tepat di bawah Headline */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <KhutbahSidebar articles={khutbahData} />
          <InfoDakwah />
        </aside>
      </div>

      {/* CSS UNTUK FILTER TAMPILAN MOBILE */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 992px) {
          /* SEMBUNYIKAN BAGIAN YANG TIDAK DIINGINKAN */
          .hide-on-mobile {
            display: none !important;
          }

          /* Atur ulang grid menjadi satu kolom */
          .main-grid, .bottom-layout-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
            margin-top: 15px !important;
          }

          /* Pastikan urutan muncul: Headline baru Khutbah */
          main { order: 1; }
          .bottom-layout-grid aside { order: 2; }
        }
      `}} />
    </div>
  );
}