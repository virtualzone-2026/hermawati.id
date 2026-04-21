"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const categories = [
    { name: "Pendidikan", slug: "category/pendidikan" },
    { name: "Parenting", slug: "category/parenting" },
    { name: "Ruang Opini", slug: "category/opini" },
    { name: "Serba-serbi", slug: "category/serba-serbi" },
  ];

  const infoLinks = [
    { name: "Tentang Kami", slug: "about" },
    { name: "Kontak", slug: "contact" },
    { name: "Kebijakan Privasi", slug: "privacy" },
  ];

  return (
    <footer className="footer-root" style={{ background: '#fff', borderTop: '5px solid #5D427C', marginTop: '50px', color: '#333' }}>
      <div className="container footer-grid">
        
        {/* KOLOM 1: BRAND INFO */}
        <div className="footer-col brand-col">
          
          {/* KUNCI POSISI HORIZONTAL DI SINI */}
          <Link href="/" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '15px', textDecoration: 'none', marginBottom: '20px' }}>
            <div style={{ flexShrink: 0, width: '55px', height: '55px', display: 'flex', alignItems: 'center' }}>
              <Image 
                src="/hermawati.png" 
                alt="Logo" 
                width={55} 
                height={55} 
                priority
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 900, color: '#5D427C', lineHeight: '1.1' }}>
                HERMA<span style={{ color: '#B294D1' }}>WATI</span>.WEB.ID
              </h2>
              <p style={{ margin: '4px 0 0', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#7a6a8a', letterSpacing: '0.5px' }}>
                Pendidikan, Parenting & Inspirasi
              </p>
            </div>
          </Link>

          <p className="description" style={{ fontSize: '14px', lineHeight: '1.6', color: '#666', marginBottom: '25px', maxWidth: '320px' }}>
            Wadah literasi digital yang membahas dunia pendidikan, parenting,
            dan berbagi dokumen bermanfaat untuk keluarga Indonesia.
          </p>
          
          {/* SOCIAL LINKS - SVG ICONS */}
          <div className="social-links" style={{ display: 'flex', gap: '12px' }}>
            <Link href="#" className="soc-circle fb">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
            </Link>
            <Link href="#" className="soc-circle x">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z"/></svg>
            </Link>
            <Link href="#" className="soc-circle ig">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </Link>
          </div>
        </div>

        {/* KOLOM 2: KATEGORI */}
        <div className="footer-col">
          <h4 className="col-title">Kategori</h4>
          <ul className="footer-links">
            {categories.map((cat) => (
              <li key={cat.slug}><Link href={`/${cat.slug}`}>{cat.name}</Link></li>
            ))}
          </ul>
        </div>

        {/* KOLOM 3: INFORMASI */}
        <div className="footer-col">
          <h4 className="col-title">Informasi</h4>
          <ul className="footer-links">
            {infoLinks.map((link) => (
              <li key={link.slug}><Link href={`/${link.slug}`}>{link.name}</Link></li>
            ))}
          </ul>
        </div>

        {/* KOLOM 4: NEWSLETTER */}
        <div className="footer-col">
          <h4 className="col-title">Update</h4>
          <div className="newsletter-box">
            <input type="email" placeholder="Email..." className="news-input" />
            <button className="news-btn">OK</button>
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div style={{ borderTop: '1px solid #f0eaf5', padding: '25px 0', background: '#fdfbff', textAlign: 'center', fontSize: '13px', color: '#888' }}>
        <div className="container">
          <p>© {currentYear} <b>hermawati.web.id</b> - All Rights Reserved.</p>
        </div>
      </div>

      <style jsx>{`
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; padding: 60px 0; }

        .col-title { font-size: 16px; font-weight: 800; color: #5D427C; margin-bottom: 20px; padding-bottom: 8px; border-bottom: 3px solid #B294D1; display: inline-block; }
        .footer-links { list-style: none; padding: 0; margin: 0; }
        .footer-links li { margin-bottom: 12px; }
        .footer-links li :global(a) { text-decoration: none; color: #555; font-size: 14px; font-weight: 600; transition: 0.2s; }
        .footer-links li :global(a:hover) { color: #5D427C; padding-left: 5px; }

        .soc-circle { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: #f0eaf5; color: #5D427C; transition: 0.3s; }
        .soc-circle:hover { background: #5D427C; color: #fff; transform: translateY(-3px); }

        .newsletter-box { display: flex; background: #f6f3f9; padding: 5px; border-radius: 30px; border: 1px solid #e2d7eb; }
        .news-input { background: transparent; border: none; outline: none; padding: 5px 15px; flex: 1; font-size: 13px; width: 100%; }
        .news-btn { background: #5D427C; color: #fff; border: none; padding: 8px 15px; border-radius: 20px; font-size: 11px; font-weight: 800; cursor: pointer; }

        @media (max-width: 992px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) { .footer-grid { grid-template-columns: 1fr; gap: 30px; } }
      `}</style>
    </footer>
  );
}