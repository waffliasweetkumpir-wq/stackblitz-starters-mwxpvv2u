'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const URUNLER = [
  { id: 1, kat: 'Bowl Waffle', ad: 'Bitter Bowl', fiyat: 495.20, populer: true, begeni: '', aciklama: 'Sütlü çikolata ve bitter çikolata soslu waffle hamuru üzerine dizilmiş taze muz dilimleri; bitter damla çikolata, bitter pirinç patlağı, 【entity-oreo¦canonical_name=Oreo】 tozu, antep fıstığı ve fındık içi ile lezzetlendirilir.', malzemeler: ['Muz', 'Bitter Damla Çikolata', 'Bitter Pirinç Patlağı', '【entity-Oreo¦canonical_name=Oreo】 Tozu', 'Antep Fıstığı', 'Fındık İçi', 'Sütlü Çikolata Sosu', 'Bitter Çikolata Sosu'] },
  { id: 2, kat: 'Bowl Waffle', ad: 'Choco Madness Bowl', fiyat: 512, populer: false, begeni: '', aciklama: 'Frambuaz ve beyaz çikolata sosları eşliğinde taze çilek dilimleri, muz, sütlü ve sedef pirinç patlağı, frambuazlı damla çikolata, biskrep çıtır kırıntı, fındık içi ile lezzetlendirilerek servis edilir.', malzemeler: ['Çilek', 'Muz', 'Sütlü Pirinç Patlağı', 'Sedef Pirinç Patlağı', 'Frambuazlı Damla Çikolata', 'Biskrep Çıtır Kırıntı', 'Fındık İçi', 'Frambuaz Sosu', 'Beyaz Çikolata Sosu'] },
  { id: 3, kat: 'Bowl Waffle', ad: 'Pistachio Dream Bowl', fiyat: 560, populer: true, begeni: '', aciklama: 'Zengin antep fıstığı kreması ve nefis waffle hamuru üzerine gezdirilen beyaz sos; muz dilimleri, toz antep fıstığı taneleri, beyaz damla çikolata, karışık pirinç patlağı ile buluşuyor.', malzemeler: ['Muz', 'Toz Antep Fıstığı', 'Beyaz Damla Çikolata', 'Karışık Pirinç Patlağı', 'Antep Fıstığı Kreması', 'Beyaz Sos'] },
  { id: 4, kat: 'Bowl Waffle', ad: 'Blast Bowl', fiyat: 504, populer: true, begeni: '', aciklama: 'Karamel sos kremalı waffle hamuru üzerinde beyaz sos, taze çilek dilimleri, kivi, muz, fındık tozu ve renkli bonibonlar ile hazırlanıp servis edilir.', malzemeler: ['Çilek', 'Kivi', 'Muz', 'Fındık Tozu', 'Renkli Bonibon', 'Karamel Sos Kreması', 'Beyaz Sos'] },
  { id: 5, kat: 'Bowl Waffle', ad: 'Lotus Bomb Bowl Waffle', fiyat: 512, populer: true, begeni: '', aciklama: 'Karamelize bisküvili krema sosu ve karamel sosla tatlandırılmış waffle hamuru; bonibon, lotus tozu, oreo tozu, beyaz, sütlü, bitter ve sedef pirinç patlağı, taze muz dilimleriyle sunulur.', malzemeler: ['Muz', 'Bonibon', 'Lotus Tozu', 'Oreo Tozu', 'Beyaz Pirinç Patlağı', 'Sütlü Pirinç Patlağı', 'Bitter Pirinç Patlağı', 'Sedef Pirinç Patlağı', 'Karamelize Bisküvili Krema Sosu', 'Karamel Sos'] },
  { id: 6, kat: 'Bowl Waffle', ad: 'Ultimate Bowl Waffle', fiyat: 576, populer: true, begeni: '%81 Beğenildi (11 Değerlendirme)', aciklama: 'Waffle hamuruna eşlik eden frambuaz, çilek, beyaz ve sütlü çikolata sosları; bonibon, çakıl taşı, frambuazlı, beyaz ve sütlü damla çikolatalar, fındık tozu, lotus parçacıkları, taze çilek ve muz ile.', malzemeler: ['Çilek', 'Muz', 'Bonibon', 'Çakıl Taşı', 'Frambuazlı Damla Çikolata', 'Beyaz Damla Çikolata', 'Sütlü Damla Çikolata', 'Fındık Tozu', 'Lotus Parçacıkları', 'Frambuaz Sosu', 'Çilek Sosu', 'Beyaz Çikolata Sosu', 'Sütlü Çikolata Sosu'] },
  { id: 7, kat: 'Bowl Waffle', ad: 'Milk Chocolate Bowl', fiyat: 488, eskiFiyat: 528, populer: true, begeni: '%100 Beğenildi (8 Değerlendirme)', aciklama: 'Nefis waffle hamuru üzeri beyaz ve sütlü çikolata soslarıyla buluşuyor. Üzerinde fındık, lotus, antep fıstığı tozu, sütlü pirinç patlağı, sütlü damla çikolata muz dilimleriyle servis edilir.', malzemeler: ['Muz', 'Fındık', 'Lotus', 'Antep Fıstığı Tozu', 'Sütlü Pirinç Patlağı', 'Sütlü Damla Çikolata', 'Beyaz Çikolata Sosu', 'Sütlü Çikolata Sosu'] },
  { id: 8, kat: 'Bowl Waffle', ad: 'Strawberry Bowl', fiyat: 544, populer: true, begeni: '', aciklama: 'Nefis waffle hamuru üzeri yoğun çilek ve frambuaz soslarıyla buluşuyor. Üzerinde taze çilek dilimleri, muz dilimleri, beyaz ve frambuazlı damla çikolata, fındık tozu ile servis edilir.', malzemeler: ['Çilek', 'Muz', 'Beyaz Damla Çikolata', 'Frambuazlı Damla Çikolata', 'Fındık Tozu', 'Çilek Sosu', 'Frambuaz Sosu'] },
  { id: 9, kat: 'Bowl Waffle', ad: 'Coconut Bowl', fiyat: 496, populer: true, begeni: '', aciklama: 'Nefis waffle hamuru, hindistan cevizi sosu ve sütlü çikolata sosuyla buluşuyor. Üzerinde hindistan cevizi tozu, muz dilimleri, beyaz damla çikolata ve fındık tozu ile servis edilir.', malzemeler: ['Muz', 'Hindistan Cevizi Tozu', 'Beyaz Damla Çikolata', 'Fındık Tozu', 'Hindistan Cevizi Sosu', 'Sütlü Çikolata Sosu'] },
  { id: 10, kat: 'Kare Waffle', ad: 'Bitter Kare', fiyat: 340, populer: false, begeni: '', aciklama: 'Bitter çikolatalı, meyveli ve fındıklı kare waffle.', malzemeler: ['Muz', 'Çilek', 'Fındık', 'Bitter Çikolata Sosu'] },
  { id: 11, kat: 'Kare Waffle', ad: 'Choco Madness Kare', fiyat: 360, populer: false, begeni: '', aciklama: 'Bol çikolatalı, brownie parçalı kare waffle.', malzemeler: ['Brownie', 'Çikolata Sosu', 'Fındık'] },
  { id: 12, kat: 'Kare Waffle', ad: 'Pistachio Dream Kare', fiyat: 400, populer: false, begeni: '', aciklama: 'Antep fıstığı kremalı kare waffle.', malzemeler: ['Antep Fıstığı Kreması', 'Antep Fıstığı'] },
  { id: 13, kat: 'Kare Waffle', ad: 'Blast Kare', fiyat: 370, populer: false, begeni: '', aciklama: 'Karamel ve çıtır parçalı kare waffle.', malzemeler: ['Karamel Sos', 'Çıtır Parça'] },
  { id: 14, kat: 'Kare Waffle', ad: 'Lotus Bomb Kare', fiyat: 320, populer: false, begeni: '', aciklama: 'Lotus kremalı kare waffle.', malzemeler: ['Lotus Kreması', 'Lotus Bisküvi'] },
  { id: 15, kat: 'Kare Waffle', ad: 'Ultimate Kare', fiyat: 350, populer: false, begeni: '', aciklama: 'Her şeyden bol bol kare waffle.', malzemeler: ['Çikolata', 'Meyve', 'Fındık'] },
  { id: 16, kat: 'Kumpir', ad: 'Saray Kumpir', fiyat: 300, populer: false, begeni: '', aciklama: 'Kaşar, mısır, bezelye, turşu ve soslarla saray kumpir.', malzemeler: ['Kaşar', 'Mısır', 'Bezelye', 'Turşu', 'Sos'] },
  { id: 17, kat: 'Kumpir', ad: 'Ege Kumpir', fiyat: 320, populer: false, begeni: '', aciklama: 'Zeytin, beyaz peynir ve Ege otlarıyla hafif kumpir.', malzemeler: ['Zeytin', 'Beyaz Peynir', 'Ege Otları'] },
  { id: 18, kat: 'Kumpir', ad: 'Gurme Kumpir', fiyat: 350, populer: false, begeni: '', aciklama: 'Özel soslar ve gurme malzemelerle kumpir.', malzemeler: ['Özel Sos', 'Gurme Malzeme'] },
  { id: 19, kat: 'Kumpir', ad: 'Aptit Kumpir', fiyat: 280, populer: false, begeni: '', aciklama: 'Klasik malzemelerle doyurucu aptit kumpir.', malzemeler: ['Kaşar', 'Mısır', 'Sos'] },
  { id: 20, kat: 'Kumpir', ad: 'Doyuran Kumpir', fiyat: 330, populer: false, begeni: '', aciklama: 'Bol malzemeli, iyice doyuran kumpir.', malzemeler: ['Kaşar', 'Mısır', 'Bezelye', 'Turşu'] },
  { id: 21, kat: 'Kumpir', ad: 'Fiesta Menü', fiyat: 380, populer: false, begeni: '', aciklama: 'Kumpir + içecek ile fiesta menü.', malzemeler: ['Kumpir', 'İçecek'] },
  { id: 22, kat: 'Kumpir', ad: '0-1 Malzemeli Kumpir', fiyat: 220, populer: false, begeni: '', aciklama: 'Sade, az malzemeli kumpir.', malzemeler: ['Kaşar', 'Tereyağı'] },
  { id: 23, kat: 'Kumpir', ad: '3 Malzemeli Kumpir', fiyat: 260, populer: false, begeni: '', aciklama: '3 malzeme seçmeli kumpir.', malzemeler: ['Kaşar', 'Mısır', 'Bezelye'] },
  { id: 24, kat: 'Kumpir', ad: '5 Malzemeli Kumpir', fiyat: 290, populer: false, begeni: '', aciklama: '5 malzeme seçmeli kumpir.', malzemeler: ['Kaşar', 'Mısır', 'Bezelye', 'Turşu', 'Zeytin'] },
  { id: 25, kat: 'Kumpir', ad: '7 Malzemeli Kumpir', fiyat: 320, populer: false, begeni: '', aciklama: '7 malzeme seçmeli, dolu dolu kumpir.', malzemeler: ['Kaşar', 'Mısır', 'Bezelye', 'Turşu', 'Zeytin', 'Mantar', 'Sosis'] },
  { id: 26, kat: 'Künefe & Katmer', ad: 'Katmer + Dondurma', fiyat: 300, populer: false, begeni: '', aciklama: 'Çıtır katmer, Antep fıstığı ve dondurma.', malzemeler: ['Katmer', 'Antep Fıstığı', 'Dondurma'] },
  { id: 27, kat: 'Künefe & Katmer', ad: 'Künefe + Dondurma', fiyat: 320, populer: false, begeni: '', aciklama: 'Sıcak künefe, uzayan peynir ve dondurma.', malzemeler: ['Künefe', 'Peynir', 'Dondurma'] },
  { id: 28, kat: 'Künefe & Katmer', ad: 'Künefe', fiyat: 280, populer: false, begeni: '', aciklama: 'Klasik sıcak künefe, fıstıklı.', malzemeler: ['Künefe', 'Antep Fıstığı'] },
  { id: 29, kat: 'Künefe & Katmer', ad: 'Katmer', fiyat: 260, populer: false, begeni: '', aciklama: 'Klasik çıtır katmer, fıstıklı.', malzemeler: ['Katmer', 'Antep Fıstığı'] },
  { id: 30, kat: 'Künefe & Katmer', ad: 'Fıstıklı Katmer + Dondurma', fiyat: 340, populer: false, begeni: '', aciklama: 'Bol fıstıklı katmer ve dondurma.', malzemeler: ['Katmer', 'Antep Fıstığı', 'Dondurma'] },
  { id: 31, kat: 'Sufle', ad: 'Çikolatalı Sufle + Dondurma', fiyat: 600, populer: false, begeni: '', aciklama: 'Akışkan çikolatalı sufle ve dondurma.', malzemeler: ['Sufle', 'Çikolata', 'Dondurma'] },
  { id: 32, kat: 'Sufle', ad: 'Beyaz Çikolatalı Tahinli Sufle', fiyat: 380, populer: false, begeni: '', aciklama: 'Beyaz çikolata ve tahinli, akışkan sufle.', malzemeler: ['Sufle', 'Beyaz Çikolata', 'Tahin'] }
]
const KATS = ['Tümü', 'Bowl Waffle', 'Kare Waffle', 'Kumpir', 'Künefe & Katmer', 'Sufle']
const ONE_CIKAN = [5, 6, 16]
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
  const [modalUrun, setModalUrun] = useState<any>(null)
  const [cikartilan, setCikartilan] = useState<string[]>([])
  const [modalAdet, setModalAdet] = useState(1)
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
  const urunAc = (urun: any) => {
    setModalUrun(urun)
    setCikartilan([])
    setModalAdet(1)
  }
  const toggleCikart = (m: string) => {
    if (cikartilan.includes(m)) setCikartilan(cikartilan.filter((x) => x !== m))
    else setCikartilan([...cikartilan, m])
  }
  const modalSepeteEkle = () => {
    if (!modalUrun) return
    const yeni = [...sepet]
    for (let i = 0; i < modalAdet; i++) yeni.push({ ...modalUrun, cikartilan: [...cikartilan] })
    setSepet(yeni)
    setModalUrun(null)
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
  const oneCikanUrunler = URUNLER.filter((u) => ONE_CIKAN.includes(u.id))
  const UrunKarti = ({ u }: { u: any }) => (
    <div style={{ background: 'white', borderRadius: '16px', padding: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
      <div style={{ flex: 1, minWidth: 0, cursor: 'pointer' }} onClick={() => urunAc(u)}>
        <div style={{ fontWeight: '800', fontSize: '16px' }}>{u.ad}</div>
        <div style={{ color: '#777', fontSize: '13px', margin: '5px 0', lineHeight: '1.45' }}>{u.aciklama}</div>
        {u.begeni ? <div style={{ color: '#16a34a', fontSize: '12px', fontWeight: 'bold', margin: '4px 0' }}>👍 {u.begeni}</div> : null}
        <div style={{ marginTop: '6px' }}>
          {u.eskiFiyat ? <span style={{ textDecoration: 'line-through', color: '#999', marginRight: '6px', fontSize: '13px' }}>{u.eskiFiyat} TL</span> : null}
          <b style={{ fontSize: '16px' }}>{u.fiyat} TL</b>
        </div>
        <button onClick={(e) => { e.stopPropagation(); urunAc(u) }} style={{ marginTop: '8px', background: 'black', color: 'white', border: 'none', padding: '7px 14px', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>+ Sepete Ekle</button>
      </div>
      <div onClick={() => urunAc(u)} style={{ width: '104px', height: '104px', background: renkFor(u.kat), borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '44px', flexShrink: 0, position: 'relative', cursor: 'pointer' }}>{emojiFor(u.kat)}
        {u.populer ? <span style={{ position: 'absolute', bottom: '-8px', right: '-4px', background: '#e11d48', color: 'white', fontSize: '11px', padding: '3px 8px', borderRadius: '12px', fontWeight: 'bold' }}>🔥 Popüler</span> : null}
      </div>
    </div>
  )
  return (
    <div style={{ fontFamily: 'sans-serif', background: '#fff7ee', minHeight: '100vh', paddingBottom: '170px' }}>
      <div style={{ background: '#3b1d0a', color: 'white', padding: '16px', textAlign: 'center' }}>
        <div style={{ fontSize: '22px', fontWeight: '900' }}>WaffLia Sweet Kumpir</div>
        <div style={{ fontSize: '12px', color: '#e8c99a', marginTop: '4px' }}>🔍 ♡ 👤</div>
      </div>
      <div style={{ background: '#3b1d0a', color: 'white', padding: '0 16px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontSize: '70px', lineHeight: '1.1' }}>🧇 🥔</div>
          <div style={{ fontSize: '12px', color: '#e8c99a', marginTop: '6px' }}>Açık 17:00 - 05:00 • İstanbul</div>
          <h1 style={{ fontSize: '28px', lineHeight: '1.2', margin: '12px 0' }}>En tatlı waffle ve kumpir burada</h1>
          {user ? (
            <div style={{ background: 'white', color: '#333', borderRadius: '14px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Hoş geldin, <b>{isim}!</b> 👋</span>
              <button onClick={cikisYap} style={{ border: '1px solid #ddd', background: 'white', padding: '7px 14px', borderRadius: '20px', cursor: 'pointer' }}>Çıkış Yap</button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <a href="/kayit" style={{ background: '#b45309', color: 'white', padding: '12px 26px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', flex: 1, maxWidth: '180px' }}>Kayıt Ol</a>
              <a href="/giris" style={{ background: 'transparent', color: 'white', padding: '12px 26px', borderRadius: '12px', border: '1px solid white', textDecoration: 'none', fontWeight: 'bold', flex: 1, maxWidth: '180px' }}>Giriş Yap</a>
            </div>
          )}
          <input value={arama} onChange={(e) => setArama(e.target.value)} placeholder="Wafflia'da ara..." style={{ width: '100%', marginTop: '16px', padding: '12px 14px', borderRadius: '12px', border: 'none', outline: 'none', fontSize: '15px', boxSizing: 'border-box' }} />
        </div>
      </div>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 12px' }}>
        <h2 style={{ fontSize: '22px', margin: '20px 4px 10px' }}>Öne Çıkan Ürünler</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {oneCikanUrunler.map((u) => <UrunKarti key={u.id} u={u} />)}
        </div>
        <h2 id="menu" style={{ fontSize: '22px', margin: '24px 4px 10px' }}>Menü</h2>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', whiteSpace: 'nowrap', paddingBottom: '6px' }}>
          {KATS.map((k) => (
            <button key={k} onClick={() => setKat(k)} style={{ padding: '9px 16px', borderRadius: '20px', border: kat === k ? '1px solid #5b2c0e' : '1px solid #ddd', background: kat === k ? '#5b2c0e' : 'white', color: kat === k ? 'white' : '#333', cursor: 'pointer', fontWeight: kat === k ? 'bold' : 'normal', flexShrink: 0 }}>{k}</button>
          ))}
        </div>
        {gosterilecekKats.map((k) => {
          const liste = aramali.filter((u) => u.kat === k)
          if (liste.length === 0) return null
          return (
            <div key={k}>
              <h3 style={{ fontSize: '18px', margin: '18px 4px 10px' }}>{k} <span style={{ color: '#999', fontSize: '13px', fontWeight: 'normal' }}>{liste.length} ürün</span></h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {liste.map((u) => <UrunKarti key={u.id} u={u} />)}
              </div>
            </div>
          )
        })}
        <div style={{ background: '#fef3e2', borderRadius: '16px', padding: '16px', marginTop: '24px' }}>
          <h3 style={{ margin: '0 0 8px' }}>İletişim</h3>
          <p style={{ margin: '4px 0', fontSize: '14px' }}>📞 0535 273 28 65 • 🕒 Her gün 17:00 - 05:00 • 📍 İstanbul</p>
        </div>
      </div>
      {modalUrun && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ background: 'white', width: '100%', maxWidth: '600px', maxHeight: '88vh', overflowY: 'auto', borderRadius: '20px 20px 0 0', padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ margin: '0 0 6px', fontSize: '20px' }}>{modalUrun.ad}</h2>
                <p style={{ color: '#666', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>{modalUrun.aciklama}</p>
              </div>
              <button onClick={() => setModalUrun(null)} style={{ border: 'none', background: '#eee', width: '32px', height: '32px', borderRadius: '50%', fontSize: '18px', cursor: 'pointer', flexShrink: 0 }}>✕</button>
            </div>
            <h3 style={{ fontSize: '15px', margin: '16px 0 8px' }}>Çıkartmak istediklerini seç 👇</h3>
            <p style={{ fontSize: '12px', color: '#888', margin: '0 0 10px' }}>İstemediğin malzemenin kutusunu işaretle, biz onu eklemeden hazırlayalım.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {modalUrun.malzemeler.map((m: string) => (
                <label key={m} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: cikartilan.includes(m) ? '#fef2f2' : '#f9f9f9', padding: '10px 12px', borderRadius: '12px', border: cikartilan.includes(m) ? '1px solid #fecaca' : '1px solid #eee', cursor: 'pointer' }}>
                  <span style={{ textDecoration: cikartilan.includes(m) ? 'line-through' : 'none', color: cikartilan.includes(m) ? '#999' : '#333' }}>{m} {cikartilan.includes(m) ? ' — Çıkartılacak' : ''}</span>
                  <input type="checkbox" checked={cikartilan.includes(m)} onChange={() => toggleCikart(m)} style={{ width: '20px', height: '20px' }} />
                </label>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={() => setModalAdet(Math.max(1, modalAdet - 1))} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #ddd', background: 'white', fontSize: '20px', cursor: 'pointer' }}>-</button>
                <b style={{ fontSize: '18px' }}>{modalAdet}</b>
                <button onClick={() => setModalAdet(modalAdet + 1)} style={{ width: '36px', height: '36px', borderRadius: '50%', border: 'none', background: '#5b2c0e', color: 'white', fontSize: '20px', cursor: 'pointer' }}>+</button>
              </div>
              <b style={{ fontSize: '18px' }}>{(modalUrun.fiyat * modalAdet).toFixed(2)} TL</b>
            </div>
            {cikartilan.length > 0 ? <p style={{ fontSize: '12px', color: '#e11d48', margin: '10px 0 0' }}>Çıkartılacak: {cikartilan.join(', ')}</p> : null}
            <button onClick={modalSepeteEkle} style={{ width: '100%', marginTop: '14px', background: '#5b2c0e', color: 'white', border: 'none', padding: '14px', borderRadius: '14px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Sepete Ekle • {(modalUrun.fiyat * modalAdet).toFixed(2)} TL</button>
          </div>
        </div>
      )}
      {sepet.length > 0 && (
        <div style={{ position: 'fixed', left: 0, right: 0, bottom: '68px', padding: '0 12px', zIndex: 30 }}>
          <button onClick={() => setSepetAcik(!sepetAcik)} style={{ width: '100%', maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#5b2c0e', color: 'white', border: 'none', padding: '14px 18px', borderRadius: '16px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.25)' }}>
            <span>🛒 Sepeti Görüntüle • {sepet.length} ürün</span>
            <span>{toplam.toFixed(2)} TL →</span>
          </button>
          {sepetAcik && (
            <div style={{ maxWidth: '900px', margin: '8px auto 0', background: 'white', borderRadius: '16px', padding: '14px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', color: '#333' }}>
              {sepet.map((s, i) => (
                <div key={i} style={{ padding: '6px 0', borderBottom: '1px solid #eee', fontSize: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>{s.ad}</span><span>{s.fiyat} TL</span></div>
                  {s.cikartilan && s.cikartilan.length > 0 ? <div style={{ fontSize: '12px', color: '#e11d48' }}>Çıkartılan: {s.cikartilan.join(', ')}</div> : <div style={{ fontSize: '12px', color: '#888' }}>Tüm malzemelerle</div>}
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontWeight: 'bold' }}><span>Toplam</span><span>{toplam.toFixed(2)} TL</span></div>
              <button onClick={() => setSepet([])} style={{ marginTop: '10px', width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ddd', background: 'white', cursor: 'pointer' }}>Sepeti Temizle</button>
            </div>
          )}
        </div>
      )}
      <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, background: 'white', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-around', padding: '10px 0 14px', zIndex: 20 }}>
        <a href="#" style={{ textAlign: 'center', textDecoration: 'none', color: '#5b2c0e', fontSize: '12px', fontWeight: 'bold' }}><div style={{ fontSize: '20px' }}>🏠</div>Anasayfa</a>
        <a href="#menu" style={{ textAlign: 'center', textDecoration: 'none', color: '#888', fontSize: '12px' }}><div style={{ fontSize: '20px' }}>☰</div>Menü</a>
        <a href="#" style={{ textAlign: 'center', textDecoration: 'none', color: '#888', fontSize: '12px' }}><div style={{ fontSize: '20px' }}>🧾</div>Siparişler</a>
        <a href="/giris" style={{ textAlign: 'center', textDecoration: 'none', color: '#888', fontSize: '12px' }}><div style={{ fontSize: '20px' }}>👤</div>Profil</a>
      </div>
    </div>
  )
}
