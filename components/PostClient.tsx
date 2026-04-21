"use client";

export default function PostClient() {
  return (
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap');
      
      html, body { overflow-x: hidden !important; max-width: 100vw; scroll-behavior: smooth; }
      .main-layout-grid { display: grid; grid-template-columns: minmax(0, 1fr) 340px; gap: 50px; align-items: start; width: 100%; }
      .sidebar-sticky-wrapper { position: sticky; top: 25px; height: fit-content; }

      /* LOGO PENULIS (KUNCI 55PX) */
      .author-avatar { 
        width: 55px !important; height: 55px !important; 
        min-width: 55px !important; max-width: 55px !important;
        border-radius: 50% !important; border: 2px solid #B294D1 !important; 
        object-fit: cover !important; padding: 2px;
      }

      /* RELATED GRID (4 KOLOM) */
      .related-section { margin-top: 60px; padding-top: 40px; border-top: 2px solid #f0eaf5; }
      .related-grid { 
        display: grid !important; 
        grid-template-columns: repeat(4, 1fr) !important; 
        gap: 15px !important; 
      }
      .related-card { text-decoration: none; color: inherit; display: block; }
      .related-img-box { width: 100% !important; aspect-ratio: 16/9 !important; border-radius: 12px; overflow: hidden !important; margin-bottom: 10px; }
      .related-img-box img { width: 100% !important; height: 100% !important; object-fit: cover !important; }
      .related-card h4 { font-size: 13px !important; font-weight: 700; line-height: 1.4; margin: 0; color: #333; }

      /* TYPOGRAPHY */
      .main-title { font-size: clamp(26px, 5vw, 40px) !important; font-weight: 900 !important; margin-bottom: 40px !important; }
      .article-body-content p { margin-bottom: 2.2rem !important; display: block; font-size: 20px; line-height: 2; }
      .featured-image { width: 100% !important; height: auto !important; aspect-ratio: 16/9; object-fit: cover !important; border-radius: 24px; margin-bottom: 50px; }

      /* SIDEBAR POPULER */
      .pop-item { display: grid !important; grid-template-columns: 25px 90px 1fr !important; gap: 15px !important; align-items: center !important; margin-bottom: 20px; text-decoration: none !important; }
      .pop-img-box { width: 90px !important; height: 60px !important; border-radius: 10px; overflow: hidden; }
      .pop-img-box img { width: 100%; height: 100%; object-fit: cover; }

      @media (max-width: 1200px) { .related-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      @media (max-width: 992px) { .main-layout-grid { grid-template-columns: 1fr !important; } }
      @media (max-width: 600px) { .related-grid { grid-template-columns: 1fr !important; } }
    `}</style>
  );
}