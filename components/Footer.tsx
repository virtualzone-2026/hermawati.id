"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ 
      background: '#ffffff', 
      borderTop: '5px solid #5D427C', 
      marginTop: '50px', 
      color: '#333',
      width: '100%',
      paddingBottom: '0'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        
        <div className="footer-flex-container">
          
          {/* KOLOM 1: BRANDING - KUNCI MATI HORIZONTAL */}
          <div className="footer-col brand-col">
            <Link href="/" style={{ 
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center', 
              gap: '15px', 
              textDecoration: 'none' 
            }}>
              <div style={{ flexShrink: 0 }}>
                <Image src="/hermawati.png" alt="Logo" width={50} height={50} priority />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 900, color: '#5D427C', lineHeight: '1.1' }}>
                  HERMA<span style={{ color: '#B294D1' }}>WATI</span>.WEB.ID
                </h2>
                <p style={{ margin: 0, fontSize: '10px', fontWeight: 700, color: '#7a6a8a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Pendidikan & Parenting
                </p>
              </div>
            </Link>
            
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#666', marginTop: '20px', maxWidth: '350px' }}>
              Wadah literasi digital pendidikan, parenting, dan dokumen bermanfaat untuk keluarga Indonesia.
            </p>
          </div>

          {/* KOLOM 2: LINKS (KATEGORI & INFO) */}
          <div className="footer-col links-group">
            <div className="link-sub-col">
              <h4 className="title-decor">Kategori</h4>
              <ul className="footer-ul">
                <li><Link href="/category/pendidikan">Pendidikan</Link></li>
                <li><Link href="/category/parenting">Parenting</Link></li>
                <li><Link href="/category/opini">Ruang Opini</Link></li>
              </ul>
            </div>
            <div className="link-sub-col">
              <h4 className="title-decor">Informasi</h4>
              <ul className="footer-ul">
                <li><Link href="/about">Tentang Kami</Link></li>
                <li><Link href="/contact">Kontak</Link></li>
              </ul>
            </div>
          </div>

          {/* KOLOM 3: NEWSLETTER */}
          <div className="footer-col newsletter-col">
            <h4 className="title-decor">Update</h4>
            <div className="newsletter-box">
              <input type="email" placeholder="Email..." />
              <button>OK</button>
            </div>
          </div>

        </div>
      </div>

      {/* COPYRIGHT BAR */}
      <div style={{ borderTop: '1px solid #f0eaf5', padding: '20px 0', background: '#fdfbff', textAlign: 'center', fontSize: '12px', color: '#888' }}>
        <p>© {currentYear} <b>hermawati.web.id</b> - All Rights Reserved.</p>
      </div>

      <style jsx>{`
        .footer-flex-container {
          display: flex;
          justify-content: space-between;
          gap: 40px;
          flex-wrap: wrap;
        }
        .footer-col { flex: 1; min-width: 250px; }
        .links-group { display: flex; gap: 40px; flex: 1.5; }
        .link-sub-col { flex: 1; }
        
        .title-decor { 
          font-size: 15px; font-weight: 800; color: #5D427C; 
          margin-bottom: 15px; padding-bottom: 5px; 
          border-bottom: 3px solid #B294D1; display: inline-block; 
        }
        .footer-ul { list-style: none; padding: 0; margin: 0; }
        .footer-ul li { margin-bottom: 10px; }
        .footer-ul li :global(a) { text-decoration: none; color: #555; font-size: 14px; font-weight: 600; }

        .newsletter-box { 
          display: flex; background: #f6f3f9; padding: 4px; 
          border-radius: 30px; border: 1px solid #e2d7eb; 
        }
        .newsletter-box input { 
          background: none; border: none; outline: none; 
          padding: 5px 12px; flex: 1; font-size: 12px; 
        }
        .newsletter-box button { 
          background: #5D427C; color: #fff; border: none; 
          padding: 6px 15px; border-radius: 20px; font-size: 10px; font-weight: 800; 
        }

        /* RESPONSIVE MOBILE */
        @media (max-width: 768px) {
          .footer-flex-container { flex-direction: column; gap: 30px; }
          .brand-col { order: 1; }
          .links-group { order: 2; gap: 20px; justify-content: space-between; flex: none; }
          .newsletter-col { order: 3; border-top: 1px dashed #ddd; padding-top: 20px; }
        }
      `}</style>
    </footer>
  );
}