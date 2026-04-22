"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 80);

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const menus = [
    { name: "Pendidikan", slug: "category/pendidikan" },
    { name: "Parenting", slug: "category/parenting" },
    { name: "Ruang Opini", slug: "category/opini" },
    { name: "Pustaka Dokumen", slug: "category/dokumen" },
    { name: "Serba-serbi", slug: "category/serba-serbi" },
  ];

  const pages = [
    { name: "Tentang Kami", slug: "about" },
    { name: "Kontak", slug: "contact" },
    { name: "Kebijakan Privasi", slug: "privacy" },
  ];

  return (
    <header className="header-master">

      {/* TOPBAR */}
      <div className="top-bar">
        <div className="container top-flex">

          <div className="menu-container" ref={dropdownRef}>
            <button
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰ MENU
            </button>

            {isMenuOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-title">Kategori</div>
                {menus.map((m) => (
                  <Link key={m.slug} href={`/${m.slug}`} className="dropdown-item">
                    {m.name}
                  </Link>
                ))}

                <div className="dropdown-title">Informasi</div>
                {pages.map((p) => (
                  <Link key={p.slug} href={`/${p.slug}`} className="dropdown-item secondary">
                    {p.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={handleSearch} className="search-pill">
            <input
              type="text"
              placeholder="Cari artikel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>

          <Link href="https://hermawati.web.id/studio" target="_blank" className="login-admin-pill">
            👤 Admin
          </Link>
        </div>
      </div>

      {/* LOGO */}
      <div className={`logo-section ${isSticky ? "shrink" : ""}`}>
        <div className="container">
          <Link href="/" className="branding">
            <Image src="/hermawati.png" alt="logo" width={60} height={60} priority />
            <div>
              <h1 className="site-title">
                HERMA<span>WATI</span>.WEB.ID
              </h1>
              {!isSticky && <p className="site-tagline">Pendidikan, Parenting & Inspirasi</p>}
            </div>
          </Link>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className={`main-nav ${isSticky ? "sticky-active" : ""}`}>
        <div className="container">
          <ul className="nav-menu-list">

            <li className={pathname === "/" ? "active" : ""}>
              <Link href="/" className="nav-anchor">HOME</Link>
            </li>

            {menus.map((m) => (
              <li key={m.slug} className={pathname.includes(m.slug) ? "active" : ""}>
                <Link href={`/${m.slug}`} className="nav-anchor">
                  {m.name.toUpperCase()}
                </Link>
              </li>
            ))}

          </ul>
        </div>
      </nav>

      {isSticky && <div style={{ height: 55 }} />}

      <style jsx>{`
        .top-flex {
          display:flex;
          justify-content:space-between;
          align-items:center;
        }

        .menu-toggle {
          font-weight:700;
          border:none;
          background:none;
          color:#5D427C;
          cursor:pointer;
        }

        .dropdown-menu {
          position:absolute;
          top:45px;
          left:0;
          width:250px;
          background:#fff;
          border-radius:10px;
          box-shadow:0 10px 30px rgba(0,0,0,0.1);
          padding:10px;
          z-index:999;
        }

        .dropdown-item {
          display:block;
          padding:10px;
          color:#5D427C;
          text-decoration:none;
        }

        .branding {
          display:flex;
          align-items:center;
          gap:12px;
        }

        .site-title {
          font-size:26px;
        }

        .site-title span {
          color:#B294D1;
        }

        .main-nav {
          background:#5D427C;
        }

        .nav-menu-list {
          display:flex;
          list-style:none;
          padding:0;
          margin:0;
          overflow-x:auto;
          scrollbar-width:none;
        }

        .nav-menu-list::-webkit-scrollbar {
          display:none;
        }

        .nav-anchor {
          padding:14px 18px;
          color:#fff;
          text-decoration:none;
          display:flex;
          flex-shrink:0;
        }

        .active .nav-anchor {
          background:#B294D1;
          color:#5D427C;
        }

        /* ================= MOBILE FIX ================= */
        @media (max-width: 768px) {

          .site-title {
            font-size:18px;
            line-height:1.2;
          }

          .site-tagline {
            font-size:11px;
          }

          .branding img {
            width:45px !important;
            height:45px !important;
          }

          .search-pill {
            display:none;
          }

          /* PENTING: tetap horizontal scroll */
          .nav-menu-list {
            flex-wrap:nowrap !important;
            overflow-x:auto;
          }

          .nav-anchor {
            padding:12px 14px;
            font-size:12px;
          }
        }

        :global(.sticky-active) {
          position:fixed;
          top:0;
          width:100%;
          z-index:999;
        }
      `}</style>
    </header>
  );
}