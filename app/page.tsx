'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null)
    })
  }, [])

  const cikisYap = async () => {
    await supabase.auth.signOut()
    setUser(null)
    window.location.href = '/'
  }

  const isim = user?.user_metadata?.full_name || user?.email?.split('@')[0] || ''

  return (
    <main style={{ background: '#FFF6E9', minHeight: '100vh', padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {user ? (
          <div style={{ background: 'white', padding: '15px', borderRadius: '15px', marginBottom: '20px' }}>
            <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 10px 0' }}>Hoş geldin, {isim}! 👋</p>
            <button onClick={cikisYap} style={{ background: '#333', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer' }}>Çıkış Yap</button>
          </div>
        ) : null}

        <h1 style={{ fontSize: '48px', margin: '20px 0 10px 0' }}>Wafflia Tatlı Kumpir</h1>
        <p style={{ color: '#666', fontSize: '18px' }}>En tatlı waffle ve kumpir burada</p>

        {!user && (
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', margin: '20px 0' }}>
            <a href="/kayit" style={{ background: '#F97316', color: 'white', padding: '12px 25px', borderRadius: '25px', textDecoration: 'none', fontWeight: 'bold' }}>Kayıt Ol</a>
            <a href="/giris" style={{ background: 'white', color: '#F97316', padding: '12px 25px', borderRadius: '25px', textDecoration: 'none', fontWeight: 'bold', border: '2px solid #F97316' }}>Giriş Yap</a>
          </div>
        )}

        <h2 style={{ marginTop: '30px' }}>En Çok Sevilenler</h2>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '15px', width: '200px' }}>
            <p style={{ fontSize: '18px' }}>Lotus Bombası Waffle<br/>340 TL</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '15px', width: '200px' }}>
            <p style={{ fontSize: '18px' }}>Ultimate Bowl Waffle<br/>370 TL</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '15px', width: '200px' }}>
            <p style={{ fontSize: '18px' }}>Sütlü Çikolata Kasesi<br/>350 TL</p>
          </div>
        </div>

        <p style={{ marginTop: '30px', color: '#999' }}>waffliasweetkumpir.com</p>
      </div>
    </main>
  )
}