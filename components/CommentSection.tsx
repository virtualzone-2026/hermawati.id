'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '@/lib/supabase'

export default function CommentSection({ slug }: { slug: string }) {
  const [comments, setComments] = useState<any[]>([])
  const [isGuest, setIsGuest] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [formData, setFormData] = useState({ name: '', email: '', content: '' })
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)

  // 1. Ambil data komentar dari database
  const fetchComments = useCallback(async () => {
    if (!supabase || !slug) return
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('article_slug', slug)
      .eq('is_approved', true)
      .order('created_at', { ascending: true })
    
    if (!error && data) setComments(data)
  }, [slug])

  // 2. Monitor status Login & Real-time update
  useEffect(() => {
    if (!slug || !supabase) return
    fetchComments()

    // Cek user saat halaman dibuka
    const getInitialUser = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      setUser(currentUser)
    }
    getInitialUser()

    // Pantau perubahan login/logout
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
      if (session?.user) setIsGuest(false)
    })

    // Fitur Real-time: Komen muncul otomatis tanpa refresh
    const channel = supabase.channel(`realtime-comments-${slug}`)
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'comments', filter: `article_slug=eq.${slug}` }, 
        () => fetchComments()
      ).subscribe()

    return () => {
      subscription.unsubscribe()
      supabase.removeChannel(channel)
    }
  }, [slug, fetchComments])

  // 3. Fungsi Login Google (Fix agar tidak Auth Loop)
  const handleGoogleLogin = async () => {
    if (!supabase) return
    const redirectUrl = `${window.location.origin}/auth/callback?next=${window.location.pathname}`
    
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      }
    })
  }

  // 4. Kirim Komentar
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.content.trim()) return
    
    if (!user && (!formData.name || !formData.email)) {
       alert("Lengkapi nama dan email dulu gaes!");
       return;
    }

    setLoading(true)

    const commentData = {
      article_slug: slug,
      content: formData.content,
      name: user ? (user.user_metadata?.full_name || user.user_metadata?.name || user.email) : formData.name,
      email: user ? user.email : formData.email,
      avatar_url: user?.user_metadata?.avatar_url || user?.user_metadata?.picture || null,
      user_id: user?.id || null,
      is_guest: !user,
      is_approved: true 
    }

    const { error } = await supabase.from('comments').insert([commentData])
    
    if (!error) {
      setFormData({ ...formData, content: '' })
      fetchComments()
    } else {
      alert("Gagal kirim komentar: " + error.message)
    }
    setLoading(false)
  }

  // UI Avatar Komponen
  const Avatar = ({ name, url }: { name: string, url?: string }) => (
    <div style={{ 
      width: '45px', height: '45px', borderRadius: '12px', 
      backgroundColor: '#B294D1', overflow: 'hidden', flexShrink: 0, 
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    }}>
      {url ? (
        <img src={url} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} referrerPolicy="no-referrer" />
      ) : (
        <span style={{ color: '#fff', fontWeight: 900, fontSize: '18px' }}>{name?.charAt(0).toUpperCase() || '?'}</span>
      )}
    </div>
  )

  return (
    <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', marginTop: '40px' }}>
      <div style={{
        backgroundColor: '#fff', borderRadius: '30px', border: '1px solid #F0F0F0',
        padding: '35px', boxShadow: '0 15px 45px rgba(93, 66, 124, 0.04)'
      }}>
        
        {/* Header Tanggapan */}
        <div style={{ marginBottom: '25px', borderBottom: '1px solid #F9F9F9', paddingBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: '#B294D1', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {comments.length} Tanggapan Diskusi
          </p>
          {user && (
            <button onClick={() => supabase.auth.signOut()} style={{ background: 'none', border: 'none', color: '#ff4d4f', fontSize: '10px', fontWeight: 800, cursor: 'pointer', textTransform: 'uppercase' }}>
              Logout
            </button>
          )}
        </div>

        <div ref={formRef}>
          {!user && !isGuest ? (
            /* Tampilan Sebelum Login */
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '55px 20px', backgroundColor: '#FAFAFF', borderRadius: '25px', border: '2px dashed #E2E8F0', textAlign: 'center' }}>
              <p style={{ fontSize: '16px', color: '#64748B', fontStyle: 'italic', marginBottom: '35px' }}>
                Silakan masuk untuk mulai berdiskusi gaes.
              </p>
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button onClick={handleGoogleLogin} style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#fff', border: '1px solid #E2E8F0', padding: '14px 28px', borderRadius: '18px', cursor: 'pointer', fontWeight: 800, fontSize: '13px', color: '#004a8e', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
                  <img src="https://www.google.com/favicon.ico" width={18} alt="Google" /> MASUK GOOGLE
                </button>
                <button onClick={() => setIsGuest(true)} style={{ backgroundColor: '#FFB800', color: '#004a8e', border: 'none', padding: '14px 35px', borderRadius: '18px', cursor: 'pointer', fontWeight: 800, fontSize: '13px', boxShadow: '0 4px 15px rgba(255, 184, 0, 0.25)' }}>
                  KOMEN TAMU
                </button>
              </div>
            </div>
          ) : (
            /* Form Tulis Komentar */
            <form onSubmit={handleSubmit} style={{ backgroundColor: '#FDFBFF', padding: '25px', borderRadius: '20px', border: '1px solid #EADFF2' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                  <Avatar 
                    name={user ? (user.user_metadata?.full_name || user.email) : (formData.name || "Tamu")} 
                    url={user?.user_metadata?.avatar_url || user?.user_metadata?.picture}
                  />
                  <p style={{ margin: 0, fontWeight: 800, color: '#5D427C', fontSize: '13px' }}>
                    {user ? `Halo, ${user.user_metadata?.full_name}` : "✍️ Menulis sebagai Tamu"}
                  </p>
               </div>
               
               {!user && (
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <input required placeholder="Nama Anda" style={{ padding: '12px', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none', fontSize: '14px', backgroundColor: '#fff' }} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    <input required type="email" placeholder="Email (Privat)" style={{ padding: '12px', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none', fontSize: '14px', backgroundColor: '#fff' }} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                 </div>
               )}

               <textarea 
                 required
                 placeholder="Bagikan pemikiran atau aspirasi Anda di sini..." 
                 style={{ width: '100%', padding: '18px', borderRadius: '18px', border: '1px solid #E2E8F0', height: '110px', outline: 'none', fontSize: '15px', resize: 'none', backgroundColor: '#fff' }}
                 value={formData.content}
                 onChange={e => setFormData({...formData, content: e.target.value})}
               />
               <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px', gap: '10px' }}>
                 {isGuest && !user && (
                    <button type="button" onClick={() => setIsGuest(false)} style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '11px', cursor: 'pointer', fontWeight: 700, textTransform: 'uppercase' }}>BATAL</button>
                 )}
                 <button disabled={loading} style={{ padding: '12px 35px', borderRadius: '15px', backgroundColor: '#5D427C', color: '#fff', border: 'none', fontWeight: 800, fontSize: '13px', cursor: 'pointer', opacity: loading ? 0.5 : 1, boxShadow: '0 4px 12px rgba(93, 66, 124, 0.2)' }}>
                   {loading ? 'MENGIRIM...' : 'KIRIM KOMENTAR ➔'}
                 </button>
               </div>
            </form>
          )}
        </div>

        {/* Daftar Komentar */}
        <div style={{ marginTop: '45px' }}>
          {comments.map((c) => (
            <div key={c.id} style={{ marginBottom: '30px', display: 'flex', gap: '18px' }}>
              <Avatar name={c.name} url={c.avatar_url} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#2D2438' }}>{c.name}</h4>
                  <span style={{ fontSize: '11px', color: '#CBD5E1', fontWeight: 600 }}>{new Date(c.created_at).toLocaleDateString('id-ID')}</span>
                </div>
                <div style={{ backgroundColor: '#F8FAFC', padding: '15px 20px', borderRadius: '0 20px 20px 20px', color: '#334155', fontSize: '14px', lineHeight: 1.6, border: '1px solid #F1F5F9' }}>
                  {c.content}
                </div>
              </div>
            </div>
          ))}
          {comments.length === 0 && (
            <p style={{ textAlign: 'center', color: '#B294D1', fontStyle: 'italic', fontSize: '13px', padding: '30px' }}>Belum ada diskusi di sini. Jadilah yang pertama!</p>
          )}
        </div>
      </div>
    </div>
  )
}