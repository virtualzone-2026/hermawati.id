import Link from 'next/link';

// 1. Definisikan Tipe Data (Wajib agar tidak error build)
interface DocumentProps {
  documents: any[];
}

// 2. Helper URL Konsisten (Handle Sanity Slug)
function getPostUrl(doc: any) {
  const catSlug = doc.categorySlug || "pustaka-dokumen";
  const postSlug = doc.slug?.current || doc.slug || "";
  return `/category/${catSlug}/${postSlug}`;
}

export default function DocumentSidebar({ documents }: DocumentProps) {
  return (
    <div className="document-sidebar-card">
      {/* HEADER: Aksen Emerald/Green untuk Pustaka */}
      <div className="card-header">
        <h2 className="header-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
          </svg>
          PUSTAKA <span className="highlight">DOKUMEN</span>
        </h2>
      </div>
      
      {/* LIST DOKUMEN */}
      <div className="card-body">
        {documents && documents.length > 0 ? (
          documents.slice(0, 5).map((doc: any) => (
            <Link 
              key={doc._id} 
              href={getPostUrl(doc)}
              className="doc-item group"
            >
              <div className="doc-info">
                <span className="doc-title">
                  {doc.title}
                </span>
                <span className="doc-date">
                  {doc.publishedAt ? new Date(doc.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Baru saja'}
                </span>
              </div>
              
              <div className="doc-icon-box">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </div>
            </Link>
          ))
        ) : (
          <p className="empty-text">
            Belum ada dokumen tersedia gaes.
          </p>
        )}
      </div>
      
      {/* FOOTER LINK */}
      <Link href="/category/pustaka-dokumen" className="footer-link">
        LIHAT SEMUA ARSIP ➔
      </Link>

      <style dangerouslySetInnerHTML={{ __html: `
        .document-sidebar-card {
          background: #fff;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.05);
          border: 1px solid #f0fdf4;
        }
        .card-header {
          background: #10b981;
          padding: 18px 25px;
        }
        .header-title {
          color: #fff;
          font-size: 14px;
          font-weight: 900;
          display: flex;
          align-items: center;
          margin: 0;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .highlight { opacity: 0.8; font-weight: 400; }
        
        .card-body { padding: 10px; }
        
        .doc-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px;
          text-decoration: none;
          border-bottom: 1px solid #f0fdf4;
          transition: 0.3s;
          border-radius: 12px;
        }
        .doc-item:last-child { border-bottom: none; }
        .doc-item:hover {
          background: #f0fdf4;
          transform: translateX(5px);
        }
        
        .doc-info { display: flex; flexDirection: column; gap: 4px; flex: 1; min-width: 0; }
        .doc-title {
          font-size: 13.5px;
          font-weight: 800;
          color: #2D2438;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: 0.3s;
        }
        .doc-item:hover .doc-title { color: #059669; }
        .doc-date {
          font-size: 9px;
          text-transform: uppercase;
          font-weight: 800;
          color: #94a3b8;
          letter-spacing: 0.5px;
        }
        
        .doc-icon-box {
          background: #f0fdf4;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.3s;
        }
        .doc-item:hover .doc-icon-box {
          background: #10b981;
        }
        .doc-item:hover .doc-icon-box svg {
          stroke: #fff;
        }
        
        .empty-text {
          text-align: center;
          padding: 30px 0;
          font-size: 13px;
          color: #94a3b8;
          font-style: italic;
        }
        
        .footer-link {
          display: block;
          text-align: center;
          padding: 15px;
          font-size: 11px;
          font-weight: 900;
          color: #059669;
          text-decoration: none;
          background: #f9fafb;
          border-top: 1px solid #f0fdf4;
          transition: 0.3s;
        }
        .footer-link:hover { background: #10b981; color: #fff; }
      `}} />
    </div>
  );
}