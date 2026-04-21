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
import CategoryPills from "@/components/CategoryPills";
import LatestArticlesSidebar from "@/components/LatestArticlesSidebar";
import Image from "next/image";

export const dynamic = 'force-dynamic';
export const revalidate = 0; 

export default async function Home() {
  const [
    allPosts, 
    popularPosts, 
    documentData, 
    sidebarArticles,
    newsPosts
  ] = await Promise.all([
    getAllPosts() || [],
    getPopularPosts() || [],
    getDocumentPosts() || [],
    getArticlePosts() || [],
    getNewsPosts() || [],
  ]);

  if (!allPosts || allPosts.length === 0) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h2 style={{ color: '#5D427C' }}>Datanya masih kosong gaes...</h2>
      </div>
    );
  }

  return (
    <div className="home-wrapper" style={{ minHeight: '100vh', backgroundColor: '#fff', color: '#2D2438' }}>
      <div className="container" style={{ margin: '0 auto', maxWidth: '1200px', padding: '0 20px' }}>
        
        {/* --- 1. TOP NEWS ROW --- */}
        <section style={{ padding: '20px 0', borderBottom: '1px solid #f0eaf5' }}>
          <TopNews posts={newsPosts.length > 0 ? newsPosts : allPosts.slice(0, 5)} />
        </section>

        {/* --- 2. HERO AREA (HEADLINE & POPULAR) --- */}
        <div className="hero-grid">
          <main className="headline-area">
            <Headline posts={allPosts} />
          </main>
          
          <aside className="popular-sidebar-area hide-on-mobile">
            <PopularSidebar posts={popularPosts.length > 0 ? popularPosts : allPosts} />
          </aside>
        </div>

        {/* --- 3. SECTION EKSPLORASI (REKOMENDASI) --- */}
        {/* Jarak dirapatkan, border atas dihapus agar tidak garis ganda */}
        <section className="exploration-area">
          <CategoryPills />
          <div style={{ marginTop: '25px' }}>
            <RecommendationSection posts={allPosts.slice(0, 6)} />
          </div>
        </section>

        {/* --- 4. FEED UTAMA & SIDEBAR --- */}
        <div className="content-layout-grid">
          <section className="feed-area">
            <LatestPosts initialPosts={allPosts} />
          </section>

          <aside className="sidebar-group">
            <LatestArticlesSidebar posts={sidebarArticles} />
            <DocumentSidebar documents={documentData} />
            
            <div className="branding-widget">
              <div className="branding-top">
                <div className="logo-box">
                  <Image src="/hermawati.png" alt="Logo" width={40} height={40} priority />
                </div>
                <div className="branding-titles">
                  <h3 className="brand-name">Hermawati</h3>
                  <span className="brand-tag">LITERASI DIGITAL</span>
                </div>
              </div>
              <p className="brand-text">
                Media inspiratif seputar <strong>Pendidikan</strong> dan <strong>Parenting</strong>. 
                Lentera bagi keluarga cerdas Indonesia.
              </p>
            </div>
          </aside>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .hero-grid {
            display: grid;
            grid-template-columns: 1fr 340px;
            gap: 40px;
            margin-top: 30px;
          }

          /* SEKSI EKSPLORASI YANG DIRAPATKAN */
          .exploration-area {
            margin-top: 30px; /* Dikurangi dari 50px */
            padding: 30px 0;  /* Dikurangi dari 50px */
            border-bottom: 1px solid #f3f0f7;
            /* Border-top dihapus agar tidak bentrok dengan sisa space hero */
          }

          .content-layout-grid {
            display: grid;
            grid-template-columns: 1fr 340px;
            gap: 50px;
            margin-top: 40px; /* Dikurangi dari 60px */
            padding-bottom: 80px;
          }

          .sidebar-group {
            display: flex;
            flex-direction: column;
            gap: 45px;
          }

          .branding-widget {
            padding: 30px;
            background: linear-gradient(135deg, #5D427C 0%, #45315d 100%);
            border-radius: 24px;
            color: #fff;
            box-shadow: 0 15px 35px rgba(93, 66, 124, 0.15);
          }
          .branding-top { display: flex; align-items: center; gap: 15px; margin-bottom: 15px; }
          .logo-box { background: #fff; border-radius: 50%; padding: 8px; display: flex; }
          .brand-name { font-size: 19px; color: #B294D1; font-weight: 900; margin: 0; }
          .brand-tag { font-size: 9px; font-weight: 800; letter-spacing: 1px; opacity: 0.8; }
          .brand-text { font-size: 13px; line-height: 1.7; opacity: 0.9; margin: 0; }

          @media (max-width: 992px) {
            .hero-grid, .content-layout-grid { display: block !important; }
            .hide-on-mobile { display: none !important; }
            aside { margin-top: 40px; width: 100% !important; }
          }
        `}} />
      </div>
    </div>
  );
}