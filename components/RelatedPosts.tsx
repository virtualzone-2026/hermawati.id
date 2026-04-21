import Link from "next/link";

export default function RelatedPosts({ posts, categorySlug }: { posts: any[], categorySlug: string }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="related-section" style={{ marginTop: '70px', paddingTop: '40px', borderTop: '2px solid #f0eaf5' }}>
      <h3 className="widget-title-modern">Postingan Terkait</h3>
      <div className="related-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '25px' }}>
        {posts.map((rel: any) => (
          <Link key={rel._id} href={`/category/${categorySlug}/${rel.slug}`} className="related-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="related-img-box" style={{ width: '100%', aspectRatio: '16/9', borderRadius: '16px', overflow: 'hidden', marginBottom: '12px', background: '#eee' }}>
              <img 
                src={rel.image || "https://via.placeholder.com/400x225"} 
                alt={rel.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
            <h4 style={{ fontSize: '15px', fontWeight: '800', margin: 0, color: '#333', lineHeight: '1.4' }}>{rel.title}</h4>
          </Link>
        ))}
      </div>
    </section>
  );
}