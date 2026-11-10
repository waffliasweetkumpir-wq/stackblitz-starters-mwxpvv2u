'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Giris() {
  const [email, setEmail] = useState('')
  const [sifre, setSifre] = useState('')
  const [mesaj, setMesaj] = useState('')

  const girisYap = async (e: any) => {
    e.preventDefault()
    setMesaj('')
    const { error } = await supabase.auth.signInWithPassword({ email, password: sifre })
    if (error) {
      setMesaj('Hata: ' + error.message)
    } else {
      setMesaj('Giriş başarılı! Anasayfaya gidiyorsun...')
      setTimeout(() => { window.location.href = '/' }, 1000)
    }
  }

  return (
    <main style={{ background: '#FFF6E9', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ background: 'white', padding: '30px', borderRadius: '20px', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>Wafflia&apos;ya Giriş Yap</h1>
        <form onSubmit={girisYap} style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
          <label>E-posta</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '12px', borderRadius: '10px', border: '1px solid #ccc', color: 'black' }} />
          <label>Şifre</label>
          <input type="password" value={sifre} onChange={(e) => setSifre(e.target.value)} required style={{ padding: '12px', borderRadius: '10px', border: '1px solid #ccc', color: 'black' }} />
          <button type="submit" style={{ background: '#1F2937', color: 'white', padding: '14px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '16px' }}>Giriş Yap</button>
        </form>
        {mesaj && <p style={{ marginTop: '15px', color: 'black' }}>{mesaj}</p>}
        <a href="/kayit" style={{ display: 'block', marginTop: '15px', color: '#F97316', textDecoration: 'none' }}>Hesabın yok mu? Kayıt Ol</a>
      </div>
    </main>
  )
}