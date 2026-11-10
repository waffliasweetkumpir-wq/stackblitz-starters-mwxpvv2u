'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Giris() {
  const [email, setEmail] = useState('')
  const [sifre, setSifre] = useState('')
  const [mesaj, setMesaj] = useState('')

  async function girisYap(e: any) {
    e.preventDefault()
    setMesaj('Giris yapiliyor...')
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: sifre
    })
    if (error) {
      setMesaj('Hata: ' + error.message)
    } else {
      setMesaj('Giris basarili! Anasayfaya gidiyorsun...')
      setTimeout(() => { window.location.href = '/' }, 1200)
    }
  }

  return (
    <main style={{ minHeight: '100vh', background: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
      <form onSubmit={girisYap} style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '100%', maxWidth: '400px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', fontSize: '26px', color: '#111', marginBottom: '20px' }}>Wafflia&apos;ya Giris Yap</h1>
        <label style={{ color: '#111', fontSize: '14px' }}>E-posta</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ornek@mail.com" required style={{ width: '100%', padding: '12px', margin: '6px 0 14px', border: '1px solid #ccc', borderRadius: '10px', background: 'white', color: 'black', boxSizing: 'border-box' }} />
        <label style={{ color: '#111', fontSize: '14px' }}>Sifre</label>
        <input type="password" value={sifre} onChange={(e) => setSifre(e.target.value)} placeholder="Sifren" required style={{ width: '100%', padding: '12px', margin: '6px 0 14px', border: '1px solid #ccc', borderRadius: '10px', background: 'white', color: 'black', boxSizing: 'border-box' }} />
        <button type="submit" style={{ width: '100%', padding: '14px', background: '#111827', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>Giris Yap</button>
        <p style={{ color: '#111', textAlign: 'center', marginTop: '14px', minHeight: '20px' }}>{mesaj}</p>
        <p style={{ textAlign: 'center', marginTop: '10px' }}><a href="/kayit" style={{ color: '#ea580c' }}>Hesabin yok mu? Kayit Ol</a></p>
      </form>
    </main>
  )
}