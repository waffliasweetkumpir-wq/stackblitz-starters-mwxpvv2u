'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const BAKIMDA = true

const URUNLER = [
  { id: 1, kat: 'Bowl Waffle', ad: 'Bitter Bowl', fiyat: 495, resim: '/urunler/bitter-bowl.jpg', aciklama: 'Sütlü ve bitter çikolata soslu waffle hamuru, muz, bitter damla çikolata, 【entity-oreo¦canonical_name=Oreo】 tozu, antep fıstığı ve fındık içi ile.' },
  { id: 2, kat: 'Bowl Waffle', ad: 'Choco Madness Bowl', fiyat: 512, resim: '/urunler/choco-bowl.jpg', aciklama: 'Frambuaz ve beyaz çikolata sosları, çilek, muz, frambuazlı damla çikolata, biskrep çıtır ve fındık içi ile.' },
  { id: 3, kat: 'Bowl Waffle', ad: 'Pistachio Dream Bowl', fiyat: 560, resim: '/urunler/pistachio-bowl.jpg', aciklama: 'Antep fıstığı kreması, waffle hamuru, beyaz sos, muz, toz antep fıstığı, beyaz damla çikolata.' },
  { id: 4, kat: 'Bowl Waffle', ad: 'Blast Bowl', fiyat: 504, resim: '/urunler/blast-bowl.jpg', aciklama: 'Karamel sos kremalı waffle hamuru, beyaz sos, çilek, kivi, muz, fındık tozu ve bonibon ile.' },
  { id: 5, kat: 'Bowl Waffle', ad: 'Lotus Bomb Bowl', fiyat: 512, resim: '/urunler/lotus-bowl.jpg', aciklama: 'Karamelize bisküvili krema sosu ve karamel sos, lotus tozu, 【entity-oreo¦canonical_name=Oreo】 tozu, pirinç patlağı, muz ile.' },
  { id: 6, kat: 'Bowl Waffle', ad: 'Ultimate Bowl Waffle', fiyat: 576, resim: '/urunler/ultimate-bowl.jpg', aciklama: 'Frambuaz, çilek, beyaz ve sütlü çikolata sosları, bonibon, damla çikolatalar, fındık tozu, lotus, çilek ve muz ile.' },
  { id: 7, kat: 'Bowl Waffle', ad: 'Milk Chocolate Bowl', fiyat: 488, resim: '/urunler/milk-bowl.jpg', aciklama: 'Waffle hamuru, beyaz ve sütlü çikolata sosu, fındık, lotus, antep fıstığı tozu, pirinç patlağı, muz ile.' },
  { id: 8, kat: 'Bowl Waffle', ad: 'Strawberry Bowl', fiyat: 544, resim: '/urunler/strawberry-bowl.jpg', aciklama: 'Waffle hamuru, çilek ve frambuaz sosu, taze çilek, muz, beyaz ve frambuazlı damla çikolata, fındık tozu ile.' },
  { id: 9, kat: 'Bowl Waffle', ad: 'Coconut Bowl', fiyat: 496, resim: '/urunler/coconut-bowl.jpg', aciklama: 'Waffle hamuru, hindistan cevizi sosu ve sütlü çikolata sosu, hindistan cevizi tozu, muz, beyaz damla çikolata, fındık tozu ile.' },
  { id: 10, kat: 'Kare Waffle', ad: 'Bitter Kare Waffle', fiyat: 416, resim: '/urunler/bitter-kare.jpg', aciklama: 'Tabanı bitter çikolata kreması, waffle hamuru, sütlü çikolata sosu, muz, bitter damla çikolata, oreo tozu, antep fıstığı, fındık içi ile.' },
  { id: 11, kat: 'Kare Waffle', ad: 'Choco Madness Kare Waffle', fiyat: 408, resim: '/urunler/choco-kare.jpg', aciklama: 'Tabanı frambuaz sosu, çilek dilimleri, muz, frambuazlı damla çikolata ve fındık içi ile.' },
  { id: 12, kat: 'Kare Waffle', ad: 'Pistachio Dream Kare Waffle', fiyat: 472, resim: '/urunler/pistachio-kare.jpg', aciklama: 'Tabanı antep fıstığı kreması, muz dilimleri ve antep fıstığı taneleri, beyaz damla çikolata ile.' },
  { id: 13, kat: 'Kare Waffle', ad: 'Blast Kare Waffle', fiyat: 408, resim: '/urunler/blast-kare.jpg', aciklama: 'Tabanı beyaz çikolata kreması, taze çilek, kivi, muz, fındık tozu taneleri ve bonibon ile.' },
  { id: 14, kat: 'Kare Waffle', ad: 'Lotus Bomb Kare Waffle', fiyat: 412, resim: '/urunler/lotus-kare.jpg', aciklama: 'Tabanı karamelize bisküvili krema sosu, lotus tozu, muz ve çilek ile.' },
  { id: 15, kat: 'Kare Waffle', ad: 'Ultimate Kare Waffle', fiyat: 412, resim: '/urunler/ultimate-kare.jpg', aciklama: 'Tabanı sütlü çikolata sos, waffle hamuru, beyaz çikolata sos, frambuaz sos, renkli draje, frambuazlı damla çikolata, fındık tozu, lotus parçacıkları.' },
  { id: 33, kat: 'Kare Waffle', ad: 'Milk Kare Waffle', fiyat: 398, resim: '/urunler/milk-bowl.jpg', aciklama: 'Tabanı beyaz ve sütlü çikolata sosu, fındık, lotus, antep fıstığı tozu, pirinç patlağı, muz ile.' },
  { id: 34, kat: 'Kare Waffle', ad: 'Strawberry Kare Waffle', fiyat: 454, resim: '/urunler/strawberry-bowl.jpg', aciklama: 'Tabanı çilek ve frambuaz sosu, taze çilek, muz, beyaz ve frambuazlı damla çikolata, fındık tozu ile.' },
  { id: 35, kat: 'Kare Waffle', ad: 'Coconut Kare Waffle', fiyat: 406, resim: '/urunler/coconut-bowl.jpg', aciklama: 'Tabanı hindistan cevizi sosu ve sütlü çikolata sosu, hindistan cevizi tozu, muz, beyaz damla çikolata, fındık tozu ile.' },
  { id: 16, kat: 'Kumpir', ad: 'Saray Kumpir Menü', fiyat: 640, aciklama: 'Rus salatası, kaşar peyniri, mısır, yeşil zeytin + kutu içecek' },
  { id: 17, kat: 'Kumpir', ad: 'Ege Kumpir Menü', fiyat: 640, aciklama: 'Haydari, sosis, siyah zeytin, turşu, mısır + kutu içecek' },
  { id: 18, kat: 'Kumpir', ad: 'Gurme Kumpir Menü', fiyat: 640, aciklama: 'Kısır, rus salatası, jalapeno biber, mor lahana + kutu içecek' },
  { id: 19, kat: 'Kumpir', ad: 'Aptit Kumpir Menü', fiyat: 640, aciklama: 'Ezme, kornişon turşu, siyah zeytin, mısır + kutu içecek' },
  { id: 20, kat: 'Kumpir', ad: 'Doyuran Kumpir Menü', fiyat: 640, aciklama: 'Haydari, kısır, sosis, yeşil zeytin, turşu + kutu içecek' },
  { id: 21, kat: 'Kumpir', ad: 'Fiesta Kumpir Menü', fiyat: 640, aciklama: 'Mor lahana, haydari, mısır, jalapeno, rus salatası + kutu içecek' },
  { id: 22, kat: 'Kumpir', ad: '0-1 Malzemeli Kumpir', fiyat: 472, aciklama: 'Kaşar peyniri, tereyağı + seçeceğiniz 1 adet malzeme' },
  { id: 23, kat: 'Kumpir', ad: '3 Malzemeli Kumpir', fiyat: 552, aciklama: 'Tereyağı, kaşar peyniri + seçeceğiniz 3 adet malzeme' },
  { id: 24, kat: 'Kumpir', ad: '5 Malzemeli Kumpir', fiyat: 568, aciklama: 'Tereyağı, kaşar peyniri + seçeceğiniz 5 adet malzeme' },
  { id: 25, kat: 'Kumpir', ad: '7 Malzemeli Kumpir', fiyat: 584, aciklama: 'Tereyağı, kaşar peyniri + seçeceğiniz 7 adet malzeme' },
  { id: 26, kat: 'Künefe & Katmer', ad: 'Çikolatalı Fıstıklı Katmer & Dondurma', fiyat: 680, aciklama: 'Çikolatalı muska katmer 2 adet + Algida Maraş Dondurma Cup' },
  { id: 27, kat: 'Künefe & Katmer', ad: 'Algida Maraş Dondurma Cup', fiyat: 112, aciklama: 'Algida Maraş Usulü Sade Dondurma Cup (100 Ml)' },
  { id: 28, kat: 'Künefe & Katmer', ad: 'Fıstıklı Katmer + Dondurma', fiyat: 680, aciklama: 'Fıstıklı Katmer + Algida Maraş Dondurma Cup Tek Kişilik' },
  { id: 29, kat: 'Künefe & Katmer', ad: 'Peynirli Fıstıklı Künefe + Dondurma', fiyat: 680, aciklama: 'Peynirli Fıstıklı Künefe + Algida Maraş Dondurma Cup' },
  { id: 30, kat: 'Künefe & Katmer', ad: 'Hasır Künefe + Dondurma', fiyat: 680, aciklama: 'Hasır Künefe + Algida Maraş Dondurma Cup' },
  { id: 31, kat: 'Sufle', ad: 'Çikolatalı Sufle + Dondurma', fiyat: 600, aciklama: 'Fırından akışkan, dışı kek kıvamında, 12 dakikada hazır. Oreo tozu ve biskrep parçaları ile + Dondurma Cup' },
  { id: 32, kat: 'Sufle', ad: 'Beyaz Çikolatalı Tahinli Sufle', fiyat: 380, aciklama: 'Beyaz çikolata ve tahin girdaplı, akışkan iç dolgulu. Fındık tozu, lotus parçaları ve hindistan cevizi tozu ile.' },
]

const KATS = ['Tümü', 'Bowl Waffle', 'Kare Waffle', 'Kumpir', 'Künefe & Katmer', 'Sufle']

export default function Home() {
  if (BAKIMDA) {
    return (
      <div style={{ minHeight: '100vh', background: '#FFF6E9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: '60px' }}>🧇</div>
          <h1>WaffLia Sweet Kumpir</h1>
          <p style={{ color: '#666' }}>Şu an menümüzü güzelleştiriyoruz.</p>
          <p style={{ fontWeight: 'bold' }}>Birazdan tekrar buradayız 💛</p>
          <p style={{ fontSize: '13px', color: '#999' }}>Her gün 17:00 - 05:00 • İstanbul • 0535 273 28 65</p>
        </div>
      </div>
    )
  }

  const [user, setUser] = useState(null)
  const [kat, setKat] = useState('Tümü')
  const [sepet, setSepet] = useState([])

  useEffect(() => {
    supabase.auth.getSession().then((res) => setUser(res.data.session?.user || null))
  }, [])

  const cikisYap = async () => { await supabase.auth.signOut(); setUser(null); window.location.href = '/' }
  const isim = user?.user_metadata?.full_name || user?.email?.split('@')[0] || ''
  const liste = kat === 'Tümü' ? URUNLER : URUNLER.filter((u) => u.kat === kat)
  const toplam = sepet.reduce((s, u) => s + u.fiyat * u.adet, 0)

  const ekle = (urun) => {
    setSepet((prev) => {
      const varMi = prev.find((p) => p.id === urun.id)
      if (varMi) return prev.map((p) => p.id === urun.id ? { ...p, adet: p.adet + 1 } : p)
      return [...prev, { ...urun, adet: 1 }]
    })
  }

  return (
    <main style={{ background: '#FFF6E9', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <header style={{ background: '#5C3A1A', color: 'white', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '26px' }}>WAFFLIA</h1>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {user ? (<><span>Hoş geldin, {isim}!</span><button onClick={cikisYap} style={{ background: 'white', color: '#5C3A1A', border: 'none', padding: '8px 12px', borderRadius: '20px', cursor: 'pointer' }}>Çıkış</button></>) : (<><a href="/kayit" style={{ color: 'white', textDecoration: 'none' }}>Kayıt Ol</a><a href="/giris" style={{ color: 'white', textDecoration: 'none' }}>Giriş Yap</a></>)}
          <span style={{ background: '#F97316', padding: '8px 12px', borderRadius: '20px' }}>Sepet {sepet.reduce((s, u) => s + u.adet, 0)} - {toplam} TL</span>
        </div>
      </header>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', margin: '10px 0 5px 0' }}>Menümüz</h2>
        <p style={{ color: '#666' }}>Wafflia Sweet Kumpir - 35 Ürün</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', margin: '20px 0' }}>
          {KATS.map((k) => (
            <button key={k} onClick={() => setKat(k)} style={{ background: kat === k ? '#5C3A1A' : 'white', color: kat === k ? 'white' : '#5C3A1A', border: '1px solid #5C3A1A', padding: '10px 16px', borderRadius: '20px', cursor: 'pointer' }}>{k}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px', textAlign: 'left' }}>
          {liste.map((u) => (
            <div key={u.id} style={{ background: 'white', borderRadius: '15px', overflow: 'hidden' }}>
              <div style={{ background: '#FDEBD0', height: '180px', overflow: 'hidden' }}>
                {u.resim ? (
                  <img src={u.resim} alt={u.ad} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '50px' }}>
                    {u.kat === 'Kumpir' ? '🥔' : u.kat === 'Sufle' ? '🍫' : u.kat === 'Künefe & Katmer' ? '🍮' : '🧇'}
                  </div>
                )}
              </div>
              <div style={{ padding: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                  <h3 style={{ margin: '0', fontSize: '17px' }}>{u.ad}</h3>
                  <b style={{ color: '#F97316', whiteSpace: 'nowrap' }}>{u.fiyat} TL</b>
                </div>
                <p style={{ color: '#777', fontSize: '14px', lineHeight: '1.5' }}>{u.aciklama}</p>
                <button onClick={() => ekle(u)} style={{ width: '100%', background: '#5C3A1A', color: 'white', border: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>+ Sepete Ekle</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
