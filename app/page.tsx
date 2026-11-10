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

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [kat, setKat] = useState('Tümü')
  const [sepet, setSepet] = useState<any[]>([])

  useEffect(() => {
    supabase.auth.getSession().then((res) => setUser(res.data.session?.user || null))
  }, [])

  const cikisYap = async () => {
    await supabase.auth.signOut()
    setUser(null)
    window.location.reload()
  }

  const isim = user?.user_metadata?.full_name || user?.email?.split('@')[0] || ''
  const filtreli = kat === 'Tümü' ? URUNLER : URUNLER.filter((u) => u.kat === kat)
  const sepeteEkle = (urun: any) => {
    setSepet([...sepet, urun])
  }
  const toplam = sepet.reduce((t, u) => t + u.fiyat, 0)

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#fff7ee', minHeight: '100vh' }}>
      <div style={{ background: '#5b2c0e', color: 'white', textAlign: 'center', padding: '20px', fontSize: '32px', fontWeight: 'bold', letterSpacing: '4px' }}>
        WAFFLIA
      </div>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1 style={{ margin: 0 }}>Wafflia Sweet Kumpir</h1>
        <p>En tatlı waffle ve kumpir burada</p>
        {user ? (
          <div>
            <p>Hoş geldin, {isim}! 👋</p>
            <button onClick={cikisYap} style={{ padding: '10px 18px', borderRadius: '10px', border: '1px solid #5b2c0e', background: 'white', cursor: 'pointer' }}>Çıkış Yap</button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <a href="/kayit" style={{ background: '#5b2c0e', color: 'white', padding: '10px 18px', borderRadius: '10px', textDecoration: 'none' }}>Kayıt Ol</a>
            <a href="/giris" style={{ background: 'white', color: '#5b2c0e', padding: '10px 18px', borderRadius: '10px', border: '1px solid #5b2c0e', textDecoration: 'none' }}>Giriş Yap</a>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', padding: '0 16px' }}>
        {KATS.map((k) => (
          <button key={k} onClick={() => setKat(k)} style={{ padding: '8px 14px', borderRadius: '20px', border: '1px solid #5b2c0e', background: kat === k ? '#5b2c0e' : 'white', color: kat === k ? 'white' : '#5b2c0e', cursor: 'pointer' }}>{k}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px', padding: '20px', maxWidth: '1100px', margin: '0 auto' }}>
        {filtreli.map((u) => (
          <div key={u.id} style={{ background: 'white', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '12px', color: '#a16207' }}>{u.kat}</div>
            <h3 style={{ margin: '6px 0' }}>{u.ad}</h3>
            <p style={{ color: '#666', fontSize: '14px', minHeight: '42px' }}>{u.aciklama}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <b>{u.fiyat} TL</b>
              <button onClick={() => sepeteEkle(u)} style={{ background: '#5b2c0e', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '10px', cursor: 'pointer' }}>Sepete Ekle</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px 20px' }}>
        <div style={{ background: 'white', borderRadius: '16px', padding: '16px' }}>
          <h3>Sepet ({sepet.length})</h3>
          {sepet.length === 0 ? <p>Sepetin boş. Bir ürün seç.</p> : (
            <div>
              {sepet.map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #eee' }}>
                  <span>{s.ad}</span><span>{s.fiyat} TL</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <b>Toplam</b><b>{toplam} TL</b>
              </div>
              <button onClick={() => setSepet([])} style={{ marginTop: '10px', padding: '8px 12px', borderRadius: '10px', border: '1px solid #ccc', background: 'white', cursor: 'pointer' }}>Sepeti Temizle</button>
            </div>
          )}
        </div>
        <div style={{ background: '#5b2c0e', color: 'white', borderRadius: '16px', padding: '16px', marginTop: '16px', textAlign: 'center' }}>
          <p style={{ margin: '4px 0' }}>📞 0535 273 28 65</p>
          <p style={{ margin: '4px 0' }}>Her gün 17:00 - 05:00</p>
          <p style={{ margin: '4px 0' }}>İstanbul</p>
        </div>
      </div>
    </div>
  )
}
