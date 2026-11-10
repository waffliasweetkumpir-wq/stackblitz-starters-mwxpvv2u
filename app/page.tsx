'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const URUNLER = [
  { id: 1, kat: 'Bowl Waffle', ad: 'Bitter Bowl', fiyat: 360, aciklama: 'Bitter çikolata, muz, çilek ve fındık ile bowl waffle.' },
  { id: 2, kat: 'Bowl Waffle', ad: 'Choco Madness Bowl', fiyat: 380, aciklama: 'Bol çikolata, brownie parçaları ve çikolata soslu bowl.' },
  { id: 3, kat: 'Bowl Waffle', ad: 'Pistachio Dream Bowl', fiyat: 420, aciklama: 'Antep fıstığı kreması, fıstık ve beyaz çikolatalı bowl.' },
  { id: 4, kat: 'Bowl Waffle', ad: 'Blast Bowl', fiyat: 390, aciklama: 'Çikolata, karamel ve çıtır parçalarla patlayan lezzet.' },
  { id: 5, kat: 'Bowl Waffle', ad: 'Lotus Bomb Bowl', fiyat: 340, aciklama: 'Lotus bisküvi kreması ve lotus parçalarıyla efsane bowl.' },
  { id: 6, kat: 'Bowl Waffle', ad: 'Ultimate Bowl', fiyat: 370, aciklama: 'Her şeyden bol bol: çikolata, meyve, fındık ve sos.' },
  { id: 7, kat: 'Bowl Waffle', ad: 'Milk Chocolate Bowl', fiyat: 350, aciklama: 'Sütlü çikolata, muz ve fındık ile klasik bowl.' },
  { id: 8, kat: 'Bowl Waffle', ad: 'Strawberry Bowl', fiyat: 360, aciklama: 'Çilek, çikolata ve krema ile ferah bowl.' },
  { id: 9, kat: 'Bowl Waffle', ad: 'Coconut Bowl', fiyat: 360, aciklama: 'Hindistan cevizi, beyaz çikolata ve meyveli bowl.' },
  { id: 10, kat: 'Kare Waffle', ad: 'Bitter Kare', fiyat: 340, aciklama: 'Bitter çikolatalı, meyveli ve fındıklı kare waffle.' },
  { id: 11, kat: 'Kare Waffle', ad: 'Choco Madness Kare', fiyat: 360, aciklama: 'Bol çikolatalı, brownie parçalı kare waffle.' },
  { id: 12, kat: 'Kare Waffle', ad: 'Pistachio Dream Kare', fiyat: 400, aciklama: 'Antep fıstığı kremalı kare waffle.' },
  { id: 13, kat: 'Kare Waffle', ad: 'Blast Kare', fiyat: 370, aciklama: 'Karamel ve çıtır parçalı kare waffle.' },
  { id: 14, kat: 'Kare Waffle', ad: 'Lotus Bomb Kare', fiyat: 320, aciklama: 'Lotus kremalı kare waffle.' },
  { id: 15, kat: 'Kare Waffle', ad: 'Ultimate Kare', fiyat: 350, aciklama: 'Her şeyden bol bol kare waffle.' },
  { id: 16, kat: 'Kumpir', ad: 'Saray Kumpir', fiyat: 300, aciklama: 'Kaşar, mısır, bezelye, turşu ve soslarla saray kumpir.' },
  { id: 17, kat: 'Kumpir', ad: 'Ege Kumpir', fiyat: 320, aciklama: 'Zeytin, beyaz peynir ve Ege otlarıyla hafif kumpir.' },
  { id: 18, kat: 'Kumpir', ad: 'Gurme Kumpir', fiyat: 350, aciklama: 'Özel soslar ve gurme malzemelerle kumpir.' },
  { id: 19, kat: 'Kumpir', ad: 'Aptit Kumpir', fiyat: 280, aciklama: 'Klasik malzemelerle doyurucu aptit kumpir.' },
  { id: 20, kat: 'Kumpir', ad: 'Doyuran Kumpir', fiyat: 330, aciklama: 'Bol malzemeli, iyice doyuran kumpir.' },
  { id: 21, kat: 'Kumpir', ad: 'Fiesta Menü', fiyat: 380, aciklama: 'Kumpir + içecek ile fiesta menü.' },
  { id: 22, kat: 'Kumpir', ad: '0-1 Malzemeli Kumpir', fiyat: 220, aciklama: 'Sade, az malzemeli kumpir. Kendi malzemeni seç.' },
  { id: 23, kat: 'Kumpir', ad: '3 Malzemeli Kumpir', fiyat: 260, aciklama: '3 malzeme seçmeli kumpir.' },
  { id: 24, kat: 'Kumpir', ad: '5 Malzemeli Kumpir', fiyat: 290, aciklama: '5 malzeme seçmeli kumpir.' },
  { id: 25, kat: 'Kumpir', ad: '7 Malzemeli Kumpir', fiyat: 320, aciklama: '7 malzeme seçmeli, dolu dolu kumpir.' },
  { id: 26, kat: 'Künefe & Katmer', ad: 'Katmer + Dondurma', fiyat: 300, aciklama: 'Çıtır katmer, Antep fıstığı ve dondurma.' },
  { id: 27, kat: 'Künefe & Katmer', ad: 'Künefe + Dondurma', fiyat: 320, aciklama: 'Sıcak künefe, uzayan peynir ve dondurma.' },
  { id: 28, kat: 'Künefe & Katmer', ad: 'Künefe', fiyat: 280, aciklama: 'Klasik sıcak künefe, fıstıklı.' },
  { id: 29, kat: 'Künefe & Katmer', ad: 'Katmer', fiyat: 260, aciklama: 'Klasik çıtır katmer, fıstıklı.' },
  { id: 30, kat: 'Künefe & Katmer', ad: 'Fıstıklı Katmer + Dondurma', fiyat: 340, aciklama: 'Bol fıstıklı katmer ve dondurma.' },
  { id: 31, kat: 'Sufle', ad: 'Çikolatalı Sufle + Dondurma', fiyat: 600, aciklama: 'Akışkan çikolatalı sufle ve dondurma.' },
  { id: 32, kat: 'Sufle', ad: 'Beyaz Çikolatalı Tahinli Sufle', fiyat: 380, aciklama: 'Beyaz çikolata ve tahinli, akışkan sufle.' }
]

const KATS = ['Tümü', 'Bowl Waffle', 'Kare Waffle', 'Kumpir', 'Künefe & Katmer', 'Sufle']

function emojiFor(kat: string) {
  if (kat === 'Kumpir') return '🥔'
  if (kat === 'Künefe & Katmer') return '🍮'
  if (kat === 'Sufle') return '🍫'
  return '🧇'
}

function renkFor(kat: string) {
  if (kat === 'Kumpir') return '#fef9c3'
  if (kat === 'Künefe & Katmer') return '#ffedd5'
  if (kat === 'Sufle') return '#f3e8ff'
  if (kat === 'Kare Waffle') return '#ffe4e6'
  return '#fff0d6'
}

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [kat, setKat] = useState('Tümü')
  const [arama, setArama] = useState('')
  const [sepet, setSepet] = useState<any[]>([])
  const [sepetAcik, setSepetAcik] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then((res) => setUser(res.data.session?.user || null))
  }, [])

  const cikisYap = async () => {
    await supabase.auth.signOut()
    setUser(null)
    window.location.reload()
  }

  const isim = user?.user_metadata?.full_name || user?.email?.split('@')[0] || ''
  const adet = (id: number) => sepet.filter((s) => s.id === id).length
  const ekle = (urun: any) => {
    setSepet([...sepet, urun])
  }
  const azalt = (urun: any) => {
    const idx = sepet.findIndex((s) => s.id === urun.id)
    if (idx >= 0) {
      const yeni = [...sepet]
      yeni.splice(idx, 1)
      setSepet(yeni)
    }
  }
  const toplam = sepet.reduce((t, u) => t + u.fiyat, 0)
  const aramali = URUNLER.filter((u) => u.ad.toLowerCase().includes(arama.toLowerCase()) || u.aciklama.toLowerCase().includes(arama.toLowerCase()))
  const gosterilecekKats = kat === 'Tümü' ? KATS.slice(1) : [kat]

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#f8f5f2', minHeight: '100vh', paddingBottom: '90px' }}>
      <div style={{ background: '#5b2c0e', color: 'white', padding: '18px 16px 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontSize: '28px', fontWeight: '900', letterSpacing: '4px' }}>WAFFLIA</div>
          <div style={{ fontSize: '13px', textAlign: 'right' }}>⭐ 4.9 • 17:00 - 05:00<br />İstanbul</div>
        </div>
        <div style={{ maxWidth: '900px', margin: '10px auto 0', background: 'white', color: '#333', borderRadius: '12px', padding: '10px 12px' }}>
          {user ? (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Hoş geldin, <b>{isim}!</b> 👋</span>
              <button onClick={cikisYap} style={{ border: '1px solid #ddd', background: 'white', padding: '6px 12px', borderRadius: '20px', cursor: 'pointer' }}>Çıkış Yap</button>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Wafflia Sweet Kumpir</span>
              <span><a href="/giris" style={{ color: '#5b2c0e', fontWeight: 'bold', marginRight: '10px' }}>Giriş Yap</a><a href="/kayit" style={{ background: '#5b2c0e', color: 'white', padding: '6px 12px', borderRadius: '20px', textDecoration: 'none' }}>Kayıt Ol</a></span>
            </div>
          )}
        </div>
        <div style={{ maxWidth: '900px', margin: '10px auto 0' }}>
          <input value={arama} onChange={(e) => setArama(e.target.value)} placeholder="Menüde ara... örn: Lotus, Kumpir, Sufle" style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: 'none', outline: 'none', fontSize: '15px', boxSizing: 'border-box' }} />
        </div>
      </div>

      <div style={{ position: 'sticky', top: 0, background: '#f8f5f2', padding: '10px 0', zIndex: 10, overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <div style={{ display: 'flex', gap: '8px', padding: '0 16px', maxWidth: '900px', margin: '0 auto' }}>
          {KATS.map((k) => (
            <button key={k} onClick={() => setKat(k)} style={{ padding: '9px 16px', borderRadius: '20px', border: kat === k ? '1px solid #5b2c0e' : '1px solid #ddd', background: kat === k ? '#5b2c0e' : 'white', color: kat === k ? 'white' : '#333', cursor: 'pointer', fontWeight: kat === k ? 'bold' : 'normal', flexShrink: 0 }}>{k}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 12px' }}>
        {gosterilecekKats.map((k) => {
          const liste = aramali.filter((u) => u.kat === k)
          if (liste.length === 0) return null
          return (
            <div key={k}>
              <h2 style={{ fontSize: '20px', margin: '18px 4px 10px' }}>{k} <span style={{ color: '#999', fontSize: '14px', fontWeight: 'normal' }}>{liste.length} ürün</span></h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {liste.map((u) => (
                  <div key={u.id} style={{ background: 'white', borderRadius: '16px', padding: '12px', display: 'flex', gap: '12px', alignItems: 'center', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: '800', fontSize: '16px' }}>{u.ad}</div>
                      <div style={{ color: '#777', fontSize: '13px', margin: '5px 0', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{u.aciklama}</div>
                      <div style={{ fontWeight: '900', fontSize: '16px', marginTop: '6px' }}>{u.fiyat} TL</div>
                    </div>
                    <div style={{ width: '104px', height: '104px', background: renkFor(u.kat), borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '44px', flexShrink: 0, position: 'relative' }}>{emojiFor(u.kat)}
                      {adet(u.id) === 0 ? (
                        <button onClick={() => ekle(u)} style={{ position: 'absolute', right: '-4px', bottom: '-4px', width: '34px', height: '34px', borderRadius: '50%', background: '#5b2c0e', color: 'white', border: '2px solid white', fontSize: '22px', lineHeight: '1', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.25)' }}>+</button>
                      ) : (
                        <div style={{ position: 'absolute', right: '-4px', bottom: '-4px', display: 'flex', alignItems: 'center', gap: '4px', background: 'white', borderRadius: '20px', padding: '3px', boxShadow: '0 2px 8px rgba(0,0,0,0.25)' }}>
                          <button onClick={() => azalt(u)} style={{ width: '26px', height: '26px', borderRadius: '50%', border: 'none', background: '#eee', cursor: 'pointer', fontSize: '18px' }}>-</button>
                          <b style={{ fontSize: '14px', minWidth: '14px', textAlign: 'center' }}>{adet(u.id)}</b>
                          <button onClick={() => ekle(u)} style={{ width: '26px', height: '26px', borderRadius: '50%', border: 'none', background: '#5b2c0e', color: 'white', cursor: 'pointer', fontSize: '18px' }}>+</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        <div style={{ background: '#5b2c0e', color: 'white', borderRadius: '16px', padding: '16px', marginTop: '24px', textAlign: 'center' }}>
          <p style={{ margin: '4px 0' }}>📞 0535 273 28 65</p>
          <p style={{ margin: '4px 0' }}>Her gün 17:00 - 05:00 • İstanbul</p>
        </div>
      </div>

      {sepet.length > 0 && (
        <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, padding: '12px', background: 'transparent' }}>
          <button onClick={() => setSepetAcik(!sepetAcik)} style={{ width: '100%', maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#5b2c0e', color: 'white', border: 'none', padding: '14px 18px', borderRadius: '16px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 -4px 20px rgba(0,0,0,0.25)' }}>
            <span>🛒 Sepeti Görüntüle • {sepet.length} ürün</span>
            <span>{toplam} TL →</span>
          </button>
          {sepetAcik && (
            <div style={{ maxWidth: '900px', margin: '8px auto 0', background: 'white', borderRadius: '16px', padding: '14px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', color: '#333' }}>
              {sepet.map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #eee', fontSize: '14px' }}><span>{s.ad}</span><span>{s.fiyat} TL</span></div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontWeight: 'bold' }}><span>Toplam</span><span>{toplam} TL</span></div>
              <button onClick={() => setSepet([])} style={{ marginTop: '10px', width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ddd', background: 'white', cursor: 'pointer' }}>Sepeti Temizle</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
