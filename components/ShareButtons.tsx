"use client";

import { Facebook, Send, Link as LinkIcon } from "lucide-react";

// 1. Tambahkan 'title' ke interface agar build tidak error
interface ShareButtonsProps {
  url: string;
  title?: string;
}

export default function ShareButtons({ url, title = "" }: ShareButtonsProps) {
  
  // Fungsi salin link
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert("Link berhasil disalin ke clipboard gaes! 🚀");
  };

  // Helper encode untuk link medsos
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  // Style Boxy (Tetap Kotak sesuai request)
  const shareBox = (bg: string) => ({
    width: 38,
    height: 38,
    borderRadius: "6px", // Sedikit rounded biar modern tapi tetap boxy
    background: bg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "0.2s",
    textDecoration: "none",
    border: "none",
    cursor: "pointer"
  });

  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
      
      {/* 1. Box Share Icon (White/Neutral) */}
      <div style={{ ...shareBox("#fff"), border: "1px solid #eee", width: 45, cursor: 'default' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5D427C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
          <polyline points="16 6 12 2 8 6"/>
          <line x1="12" y1="2" x2="12" y2="15"/>
        </svg>
      </div>

      {/* 2. Facebook */}
      <a 
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        style={shareBox("#4267B2")}
        title="Share to Facebook"
      >
        <Facebook size={18} color="white" fill="white" />
      </a>

      {/* 3. X (Twitter) */}
      <a 
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        style={shareBox("#000")}
        title="Share to X"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </a>

      {/* 4. Pinterest (Brand Red #E60023) */}
      <a 
        href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        style={shareBox("#E60023")}
        title="Share to Pinterest"
      >
        <svg style={{width:18, height:18}} viewBox="0 0 24 24">
          <path fill="#fff" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.771-2.249 3.771-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
        </svg>
      </a>

      {/* 5. WhatsApp */}
      <a 
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        style={shareBox("#25D366")}
        title="Share to WhatsApp"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.259-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>

      {/* 6. Telegram */}
      <a 
        href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        style={shareBox("#0088cc")}
        title="Share to Telegram"
      >
        <Send size={18} color="white" fill="white" />
      </a>

      {/* 7. Copy Link Button */}
      <button 
        onClick={copyToClipboard} 
        style={shareBox("#5D427C")} 
        title="Copy Link"
      >
        <LinkIcon size={18} color="white" />
      </button>

      {/* Hover Effect CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        a:hover, button:hover {
          transform: translateY(-3px);
          filter: brightness(1.1);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
      `}} />
    </div>
  );
}