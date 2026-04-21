// app/page.tsx
import { getDocumentPosts } from "@/lib/sanity.query";
import Headline from "@/components/Headline";
import TopNews from "@/components/TopNews";
import PopularSidebar from "@/components/PopularSidebar";
import RecommendationSection from "@/components/RecommendationSection";
import LatestPosts from "@/components/LatestPosts";
import DocumentSidebar from "@/components/DocumentSidebar";
import CategoryPills from "@/components/CategoryPills";
import LatestArticlesSidebar from "@/components/LatestArticlesSidebar";
import Image from "next/image"; // Import Image untuk logo

export const dynamic = 'force-dynamic';
export const revalidate = 0; 

export default async function Home() {
  const documentData = await getDocumentPosts() || [];

  return (
    <div className="home-wrapper" style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <div className="container" style={{ margin: '0 auto', maxWidth: '1200px', padding: '0 20px' }}>
        
        {/* 1. TOP BAR NEWS */}
        <div className="hide-on-mobile">
          <TopNews />
        </div>

        {/* 2. AREA UTAMA: HEADLINE & POPULAR */}
        <div className="main-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 340px', 
          gap: '40px', 
          marginTop: '25px' 
        }}>
          <main style={{ minWidth: 0 }}>
            <Headline />
          </main>
          
          <aside className="hide-on-mobile">
            <PopularSidebar />
          </aside>
        </div>

        {/* 3. EKSPLORASI VISUAL */}
        <div className="section-spacing" style={{ marginTop: '40px' }}>
          <CategoryPills />
          <RecommendationSection />
        </div>

        {/* 4. LAYOUT BAWAH: FEED & SIDEBAR MULTIPLE */}
        <div className="bottom-layout-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 340px', 
          gap: '40px', 
          marginTop: '30px',
          paddingBottom: '80px' 
        }}>
          <section style={{ minWidth: 0 }}>
            <LatestPosts />
          </section>

          <aside className="sidebar-container" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* MENEMPATKAN ARTIKEL TERBARU DI ATAS DOKUMEN */}
            <LatestArticlesSidebar />

            {/* PUSTAKA DOKUMEN */}
            <DocumentSidebar documents={documentData} />
            
            {/* WIDGET TENTANG DENGAN LOGO */}
            <div style={{ 
              padding: '30px 25px', 
              backgroundColor: '#5D427C', 
              color: '#fff', 
              borderRadius: '20px',
              borderLeft: '6px solid #B294D1',
              boxShadow: '0 10px 30px rgba(93, 66, 124, 0.15)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Header Widget: Logo & Judul */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                <div style={{ 
                  backgroundColor: '#fff', 
                  borderRadius: '50%', 
                  padding: '5px', 
                  width: '50px', 
                  height: '50px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                }}>
                  <Image 
                    src="/hermawati.png" 
                    alt="Logo Hermawati" 
                    width={40} 
                    height={40} 
                    priority
                  />
                </div>
                <h3 style={{ 
                  fontSize: '16px', 
                  color: '#B294D1', 
                  fontWeight: '900', 
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  lineHeight: '1.2'
                }}>
                  Tentang Hermawati
                </h3>
              </div>

              <p style={{ fontSize: '13.5px', lineHeight: '1.8', opacity: 0.95, margin: 0 }}>
                Media literasi digital yang berfokus memberikan inspirasi seputar dunia <strong>Pendidikan</strong> dan <strong>Parenting</strong>. 
                Kami percaya ilmu adalah lentera bagi keluarga Indonesia yang cerdas dan berkualitas.
              </p>
            </div>
          </aside>
        </div>

        {/* CSS FIX UNTUK MOBILE */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media (max-width: 992px) {
            .container {
                padding: 0 15px !important;
            }
            .hide-on-mobile {
              display: none !important;
            }
            .main-grid, .bottom-layout-grid {
              display: block !important;
              width: 100% !important;
              margin-top: 20px !important;
            }
            .section-spacing {
                margin-top: 20px !important;
            }
            main, section, aside {
                width: 100% !important;
                margin-bottom: 30px !important;
            }
          }
        `}} />
      </div>
    </div>
  );
}