'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Giris() {
  const router = useRouter()
  const [mod, setMod] = useState<'kayit' | 'giris'>('kayit')
  const [ad, setAd] = useState('Haktan')
  const [email, setEmail] = useState('basalanhaktan@gmail.com')
  const [sifre, setSifre] = useState('')
  const [hata, setHata] = useState('')
  const [yukleniyor, setYukleniyor] = useState(false)

  const yerelKullanicilariGetir = () => { try { return JSON.parse(localStorage.getItem('wafflia_kullanicilar') || '[]') } catch (e) { return [] } }

  const yerelKayit = () => {
    const liste: any[] = yerelKullanicilariGetir()
    const e = email.trim().toLowerCase()
    if (liste.find((k: any) => k.email === e)) { setHata('Bu e-posta zaten kayıtlı, Giriş Yap yap'); setMod('giris'); return }
    liste.push({ ad, telefon: '', email: e, sifre })
    localStorage.setItem('wafflia_kullanicilar', JSON.stringify(liste))
    localStorage.setItem('wafflia_oturum', JSON.stringify({ ad, telefon: '', email: e }))
    localStorage.setItem('wafflia_telefon', '')
    setHata('')
    alert('Kaydın oluşturuldu, hoş geldin ' + ad + ' (telefona kaydedildi)')
    router.push('/')
  }

  const yerelGiris = () => {
    const liste: any[] = yerelKullanicilariGetir()
    const e = email.trim().toLowerCase()
    const bulunan = liste.find((k: any) => k.email === e && k.sifre === sifre)
    if (!bulunan) { setHata('Giriş olmadı: Önce Kayıt Ol yap, aynı e-posta ve şifre ile.'); return }
    localStorage.setItem('wafflia_oturum', JSON.stringify({ ad: bulunan.ad, telefon: bulunan.telefon || '', email: bulunan.email }))
    setHata('')
    alert('Hoş geldin ' + bulunan.ad)
    router.push('/')
  }

  const gonder = async () => {
    if (!email.includes('@') || !sifre) { setHata('E-posta ve şifre yaz'); return }
    if (mod === 'kayit' && !ad) { setHata('Adını yaz'); return }
    setHata(''); setYukleniyor(true)
    try {
      if (mod === 'kayit') {
        const { data, error } = await supabase.auth.signUp({ email: email.trim().toLowerCase(), password: sifre, options: { data: { full_name: ad } } })
        if (error) {
          const msg = (error.message || '').toLowerCase()
          if (msg.includes('fetch') || msg.includes('network') || msg.includes('failed')) { yerelKayit(); setYukleniyor(false); return }
          if (msg.includes('already')) { setHata('Bu e-posta zaten kayıtlı, Giriş Yap yap'); setMod('giris'); setYukleniyor(false); return }
          setHata('Hata: ' + error.message); setYukleniyor(false); return
        }
        if (data.user) { localStorage.setItem('wafflia_oturum', JSON.stringify({ ad, telefon: '', email: email.trim().toLowerCase() })); alert('Kaydın oluşturuldu, hoş geldin ' + ad); router.push('/') }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password: sifre })
        if (error) {
          const msg = (error.message || '').toLowerCase()
          if (msg.includes('fetch') || msg.includes('network') || msg.includes('failed')) { yerelGiris(); setYukleniyor(false); return }
          const liste: any[] = yerelKullanicilariGetir()
          if (liste.length) { yerelGiris(); setYukleniyor(false); return }
          setHata('Hata: E-posta veya şifre yanlış'); setYukleniyor(false); return
        }
        if (data.user) { localStorage.setItem('wafflia_oturum', JSON.stringify({ ad: data.user.user_metadata?.full_name || ad, telefon: data.user.user_metadata?.telefon || '', email: email.trim().toLowerCase() })); alert('Hoş geldin ' + (data.user.user_metadata?.full_name || ad)); router.push('/') }
      }
    } catch (e: any) {
      if (mod === 'kayit') yerelKayit(); else yerelGiris()
    }
    setYukleniyor(false)
  }

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#fff7ee', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: 'white', borderRadius: '20px', padding: '24px', maxWidth: '400px', width: '100%' }}>
        <h1 style={{ textAlign: 'center', fontSize: '28px', fontWeight: '400', margin: '0 0 20px' }}>{mod === 'kayit' ? "Wafflia'ya Kayıt Ol" : "Wafflia'ya Giriş Yap"}</h1>
        {mod === 'kayit' ? (<div><label>Adın</label><input value={ad} onChange={(e) => setAd(e.target.value)} placeholder="Adın" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #ddd', margin: '8px 0 16px', boxSizing: 'border-box', fontSize: '16px' }} /></div>) : null}
        <label>E-posta</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-posta" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #ddd', margin: '8px 0 16px', boxSizing: 'border-box', fontSize: '16px' }} />
        <label>Sifre</label>
        <input type="password" value={sifre} onChange={(e) => setSifre(e.target.value)} placeholder="Şifren" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #ddd', margin: '8px 0 16px', boxSizing: 'border-box', fontSize: '16px' }} />
        <button onClick={gonder} disabled={yukleniyor} style={{ width: '100%', background: '#ea580c', color: 'white', border: 'none', padding: '16px', borderRadius: '12px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>{yukleniyor ? 'Bekle...' : mod === 'kayit' ? 'Kayıt Ol' : 'Giriş Yap'}</button>
        {hata ? <p style={{ textAlign: 'center', marginTop: '14px', fontSize: '16px' }}>{hata}</p> : null}
        <button onClick={() => { setHata(''); setMod(mod === 'kayit' ? 'giris' : 'kayit') }} style={{ width: '100%', background: 'none', border: 'none', color: '#ea580c', fontSize: '16px', marginTop: '12px', cursor: 'pointer' }}>{mod === 'kayit' ? 'Zaten hesabım var, Giris Yap' : 'Hesabım yok, Kayıt Ol'}</button>
      </div>
    </div>
  )
}
