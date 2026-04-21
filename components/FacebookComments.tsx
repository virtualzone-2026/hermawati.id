"use client";
import { useEffect } from "react";
import Script from "next/script";

export default function FacebookComments({ url }: { url: string }) {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).FB) {
      (window as any).FB.XFBML.parse();
    }
  }, [url]);

  return (
    <div className="comment-box" style={{ marginTop: '50px', padding: '20px', background: '#fcfaff', borderRadius: '15px' }}>
      <h3 className="widget-title-modern">Komentar</h3>
      <div id="fb-root"></div>
      <Script async defer crossOrigin="anonymous" src="https://connect.facebook.net/id_ID/sdk.js#xfbml=1&version=v18.0" strategy="afterInteractive" />
      <div className="fb-comments" data-href={url} data-width="100%" data-numposts="5"></div>
    </div>
  );
}