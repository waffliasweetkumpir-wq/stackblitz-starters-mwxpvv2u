'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const EKSTRA_WAFFLE = [
  { ad: 'Sütlü Çikolata Sosu', fiyat: 72 },
  { ad: 'Frambuaz Sosu', fiyat: 72 },
  { ad: 'Antep Fıstıklı Sosu', fiyat: 80 },
  { ad: 'Beyaz Sos', fiyat: 72 },
  { ad: 'Karamel Sosu', fiyat: 72 },
  { ad: 'Çilek', fiyat: 64 },
  { ad: 'Muz', fiyat: 60 },
  { ad: 'Kivi', fiyat: 64 },
  { ad: 'Antep Fıstığı', fiyat: 80 },
  { ad: 'Bitter Sos', fiyat: 72 },
  { ad: 'Lotus Karamelize Sos', fiyat: 72 },
  { ad: 'Beyaz Pirinç Patlağı', fiyat: 60 },
  { ad: 'Beyaz Damla Çikolata', fiyat: 48 },
  { ad: 'Çakıl Taşı', fiyat: 48 },
  { ad: 'Karışık Pirinç Patlağı', fiyat: 60 },
  { ad: 'Bonibon', fiyat: 48 },
  { ad: 'Bitter Pirinç Patlağı', fiyat: 60 },
  { ad: 'Bitter Damla Çikolata', fiyat: 48 },
  { ad: 'Biskrep Çıtır Kırıntı', fiyat: 60 },
  { ad: 'Oreo Tozu', fiyat: 64 },
  { ad: 'Sedef Pirinç Patlağı', fiyat: 60 },
  { ad: 'Sütlü Pirinç Patlağı', fiyat: 60 },
  { ad: 'Frambuazlı Damla Çikolata', fiyat: 48 },
]
const KUMPIR_MALZEMELER = ['Amerikan Salatası', 'Mısır', 'Sosis', 'Turşu', 'Yeşil Zeytin', 'Siyah Zeytin', 'Haydari', 'Kapya Biber', 'Jalapeno Biber', 'Mor Lahana', 'Ezme']
const URUNLER = [
  { id: 1, kat: 'Bowl Waffle', ad: 'Bitter Bowl', fiyat: 350, populer: true, begeni: '', resim: '/public/urunler/bitter-bowl.jpg', aciklama: 'Sütlü çikolata ve bitter çikolata soslu waffle hamuru üzerine dizilmiş taze muz dilimleri; bitter damla çikolata, bitter pirinç patlağı, bisküvi tozu, antep fıstığı ve fındık içi ile lezzetlendirilir.', malzemeler: ['Muz', 'Bitter Damla Çikolata', 'Bitter Pirinç Patlağı', 'Bisküvi Tozu', 'Antep Fıstığı', 'Fındık İçi', 'Sütlü Çikolata Sosu', 'Bitter Çikolata Sosu'] },
  { id: 2, kat: 'Bowl Waffle', ad: 'Choco Madness Bowl', fiyat: 345, populer: false, begeni: '', resim: '/public/urunler/choco-bowl.jpg', aciklama: 'Frambuaz ve beyaz çikolata sosları eşliğinde taze çilek dilimleri, muz, sütlü ve sedef pirinç patlağı, frambuazlı damla çikolata, biskrep çıtır kırıntı, fındık içi ile lezzetlendirilerek servis edilir.', malzemeler: ['Çilek', 'Muz', 'Sütlü Pirinç Patlağı', 'Sedef Pirinç Patlağı', 'Frambuazlı Damla Çikolata', 'Biskrep Çıtır Kırıntı', 'Fındık İçi', 'Frambuaz Sosu', 'Beyaz Çikolata Sosu'] },
  { id: 3, kat: 'Bowl Waffle', ad: 'Pistachio Dream Bowl', fiyat: 370, populer: true, begeni: '', resim: '/public/urunler/pistachio-bowl.jpg', aciklama: 'Zengin antep fıstığı kreması ve nefis waffle hamuru üzerine gezdirilen beyaz sos; muz dilimleri, toz antep fıstığı taneleri, beyaz damla çikolata, karışık pirinç patlağı ile buluşuyor.', malzemeler: ['Muz', 'Toz Antep Fıstığı', 'Beyaz Damla Çikolata', 'Karışık Pirinç Patlağı', 'Antep Fıstığı Kreması', 'Beyaz Sos'] },
  { id: 4, kat: 'Bowl Waffle', ad: 'Blast Bowl', fiyat: 320, populer: true, begeni: '', resim: '/public/urunler/blast-bowl.jpg', aciklama: 'Karamel sos kremalı waffle hamuru üzerinde beyaz sos, taze çilek dilimleri, kivi, muz, fındık tozu ve renkli bonibonlar ile hazırlanıp servis edilir.', malzemeler: ['Çilek', 'Kivi', 'Muz', 'Fındık Tozu', 'Renkli Bonibon', 'Karamel Sos Kreması', 'Beyaz Sos'] },
  { id: 5, kat: 'Bowl Waffle', ad: 'Lotus Bomb Bowl Waffle', fiyat: 340, populer: true, begeni: '', resim: '/public/urunler/lotus-bowl.jpg', aciklama: 'Karamelize bisküvili krema sosu ve karamel sosla tatlandırılmış waffle hamuru; bonibon, lotus tozu, bisküvi tozu, beyaz, sütlü, bitter ve sedef pirinç patlağı, taze muz dilimleriyle sunulur.', malzemeler: ['Muz', 'Bonibon', 'Lotus Tozu', 'Bisküvi Tozu', 'Beyaz Pirinç Patlağı', 'Sütlü Pirinç Patlağı', 'Bitter Pirinç Patlağı', 'Sedef Pirinç Patlağı', 'Karamelize Bisküvili Krema Sosu', 'Karamel Sos'] },
  { id: 6, kat: 'Bowl Waffle', ad: 'Ultimate Bowl Waffle', fiyat: 370, populer: true, begeni: '%81 Beğenildi (11 Değerlendirme)', resim: '/public/urunler/ultimate-bowl.jpg', aciklama: 'Waffle hamuruna eşlik eden frambuaz, çilek, beyaz ve sütlü çikolata sosları; bonibon, çakıl taşı, frambuazlı, beyaz ve sütlü damla çikolatalar, fındık tozu, lotus parçacıkları, taze çilek ve muz ile.', malzemeler: ['Çilek', 'Muz', 'Bonibon', 'Çakıl Taşı', 'Frambuazlı Damla Çikolata', 'Beyaz Damla Çikolata', 'Sütlü Damla Çikolata', 'Fındık Tozu', 'Lotus Parçacıkları', 'Frambuaz Sosu', 'Çilek Sosu', 'Beyaz Çikolata Sosu', 'Sütlü Çikolata Sosu'] },
  { id: 7, kat: 'Bowl Waffle', ad: 'Milk Chocolate Bowl', fiyat: 350, populer: true, begeni: '%100 Beğenildi (8 Değerlendirme)', resim: '/public/urunler/milk-bowl.jpg', aciklama: 'Nefis waffle hamuru üzeri beyaz ve sütlü çikolata soslarıyla buluşuyor. Üzerinde fındık, lotus, antep fıstığı tozu, sütlü pirinç patlağı, sütlü damla çikolata muz dilimleriyle servis edilir.', malzemeler: ['Muz', 'Fındık', 'Lotus', 'Antep Fıstığı Tozu', 'Sütlü Pirinç Patlağı', 'Sütlü Damla Çikolata', 'Beyaz Çikolata Sosu', 'Sütlü Çikolata Sosu'] },
  { id: 8, kat: 'Bowl Waffle', ad: 'Strawberry Bowl', fiyat: 325, populer: true, begeni: '', resim: '/public/urunler/strawberry-bowl.jpg', aciklama: 'Nefis waffle hamuru üzeri yoğun çilek ve frambuaz soslarıyla buluşuyor. Üzerinde taze çilek dilimleri, muz dilimleri, beyaz ve frambuazlı damla çikolata, fındık tozu ile servis edilir.', malzemeler: ['Çilek', 'Muz', 'Beyaz Damla Çikolata', 'Frambuazlı Damla Çikolata', 'Fındık Tozu', 'Çilek Sosu', 'Frambuaz Sosu'] },
  { id: 9, kat: 'Bowl Waffle', ad: 'Coconut Bowl', fiyat: 315, populer: true, begeni: '', resim: '/public/urunler/coconut-bowl.jpg', aciklama: 'Nefis waffle hamuru, hindistan cevizi sosu ve sütlü çikolata sosuyla buluşuyor. Üzerinde hindistan cevizi tozu, muz dilimleri, beyaz damla çikolata ve fındık tozu ile servis edilir.', malzemeler: ['Muz', 'Hindistan Cevizi Tozu', 'Beyaz Damla Çikolata', 'Fındık Tozu', 'Hindistan Cevizi Sosu', 'Sütlü Çikolata Sosu'] },
  { id: 10, kat: 'Kare Waffle', ad: 'Bitter Kare', fiyat: 350, populer: false, begeni: '', resim: '/public/urunler/bitter-kare.jpg', aciklama: 'Bitter çikolatalı, meyveli ve fındıklı kare waffle.', malzemeler: ['Muz', 'Çilek', 'Fındık', 'Bitter Çikolata Sosu'] },
  { id: 11, kat: 'Kare Waffle', ad: 'Choco Madness Kare', fiyat: 345, populer: false, begeni: '', resim: '/public/urunler/choco-kare.jpg', aciklama: 'Bol çikolatalı, brownie parçalı kare waffle.', malzemeler: ['Brownie', 'Çikolata Sosu', 'Fındık'] },
  { id: 12, kat: 'Kare Waffle', ad: 'Pistachio Dream Kare', fiyat: 370, populer: false, begeni: '', resim: '/public/urunler/pistachio-kare.jpg', aciklama: 'Antep fıstığı kremalı kare waffle.', malzemeler: ['Antep Fıstığı Kreması', 'Antep Fıstığı'] },
  { id: 13, kat: 'Kare Waffle', ad: 'Blast Kare', fiyat: 320, populer: false, begeni: '', resim: '/public/urunler/blast-kare.jpg', aciklama: 'Karamel ve çıtır parçalı kare waffle.', malzemeler: ['Karamel Sos', 'Çıtır Parça'] },
  { id: 14, kat: 'Kare Waffle', ad: 'Lotus Bomb Kare', fiyat: 340, populer: false, begeni: '', resim: '/public/urunler/lotus-kare.jpg', aciklama: 'Lotus kremalı kare waffle.', malzemeler: ['Lotus Kreması', 'Lotus Bisküvi'] },
  { id: 15, kat: 'Kare Waffle', ad: 'Ultimate Kare', fiyat: 370, populer: false, begeni: '', resim: '/public/urunler/ultimate-kare.jpg', aciklama: 'Her şeyden bol bol kare waffle.', malzemeler: ['Çikolata', 'Meyve', 'Fındık'] },
  { id: 33, kat: 'Kare Waffle', ad: 'Milk Kare', fiyat: 350, populer: false, begeni: '', resim: '/public/urunler/milk-kare.jpg', aciklama: 'Sütlü çikolata, muz ve fındık ile klasik kare waffle.', malzemeler: ['Muz', 'Fındık', 'Lotus', 'Antep Fıstığı Tozu', 'Sütlü Pirinç Patlağı', 'Sütlü Damla Çikolata', 'Beyaz Çikolata Sosu', 'Sütlü Çikolata Sosu'] },
  { id: 34, kat: 'Kare Waffle', ad: 'Strawberry Kare', fiyat: 325, populer: false, begeni: '', resim: '/public/urunler/strawberry-kare.jpg', aciklama: 'Çilek, çikolata ve krema ile ferah kare waffle.', malzemeler: ['Çilek', 'Muz', 'Beyaz Damla Çikolata', 'Frambuazlı Damla Çikolata', 'Fındık Tozu', 'Çilek Sosu', 'Frambuaz Sosu'] },
  { id: 35, kat: 'Kare Waffle', ad: 'Coconut Kare', fiyat: 315, populer: false, begeni: '', resim: '/public/urunler/coconut-kare.jpg', aciklama: 'Hindistan cevizi, beyaz çikolata ve meyveli kare waffle.', malzemeler: ['Muz', 'Hindistan Cevizi Tozu', 'Beyaz Damla Çikolata', 'Fındık Tozu', 'Hindistan Cevizi Sosu', 'Sütlü Çikolata Sosu'] },
  { id: 36, kat: 'Bowl Waffle', ad: 'Waffle & Cola Fırsat Kovası', fiyat: 1050, populer: true, begeni: '', resim: '/public/urunler/firsat-kovasi.jpg', aciklama: '2 adet enfes bowl waffle ve yanında 2 adet soğuk Coca-Cola! Paylaşmalık fırsat menüsü.', malzemeler: ['Beyaz Damla Çikolata', 'Çakıl Taşı', 'Bonibon', 'Oreo Tozu', 'Çilek', 'Antep Fıstığı', 'Sütlü Çikolata Sosu', 'Muz', 'Antep Fıstıklı Sosu', 'Lotus Tozu', 'Beyaz Sos'] },
  { id: 16, kat: 'Kumpir', ad: '0-1 Malzemeli Kumpir', fiyat: 340, limit: 1, populer: false, begeni: '', resim: '/public/urunler/0-1-malzemeli-kumpir.jpg', aciklama: '0 veya 1 malzeme seç.', malzemeler: KUMPIR_MALZEMELER },
  { id: 17, kat: 'Kumpir', ad: '3 Malzemeli Kumpir', fiyat: 360, limit: 3, populer: false, begeni: '', resim: '/public/urunler/3-malzemeli-kumpir.jpg', aciklama: '3 malzeme seç.', malzemeler: KUMPIR_MALZEMELER },
  { id: 18, kat: 'Kumpir', ad: '5 Malzemeli Kumpir', fiyat: 380, limit: 5, populer: false, begeni: '', resim: '/public/urunler/5-malzemeli-kumpir.jpg', aciklama: '5 malzeme seç.', malzemeler: KUMPIR_MALZEMELER },
  { id: 19, kat: 'Kumpir', ad: '7 Malzemeli Kumpir', fiyat: 400, limit: 7, populer: false, begeni: '', resim: '/public/urunler/7-malzemeli-kumpir.jpg', aciklama: '7 malzeme seç.', malzemeler: KUMPIR_MALZEMELER },
  { id: 20, kat: 'Kumpir', ad: '9 Malzemeli Kumpir', fiyat: 420, limit: 9, populer: false, begeni: '', resim: '/public/urunler/9-malzemeli-kumpir.jpg', aciklama: '9 malzeme seç.', malzemeler: KUMPIR_MALZEMELER },
  { id: 26, kat: 'Künefe & Katmer', ad: 'Peynirli Fıstıklı Künefe', fiyat: 520, populer: true, begeni: '', resim: '/public/urunler/kunefe.jpg', aciklama: 'Sıcak künefe, uzayan peynir ve bol Antep fıstığı.', malzemeler: ['Künefe', 'Peynir', 'Antep Fıstığı'] },
  { id: 27, kat: 'Künefe & Katmer', ad: 'Hasır Künefe', fiyat: 560, populer: false, begeni: '', resim: '/public/urunler/kunefe-dondurma.jpg', aciklama: 'Çıtır hasır künefe, peynir ve fıstık.', malzemeler: ['Künefe', 'Peynir', 'Antep Fıstığı'] },
  { id: 28, kat: 'Künefe & Katmer', ad: 'Fıstıklı Katmer', fiyat: 450, populer: false, begeni: '', resim: '/public/urunler/fistikli-katmer.jpg', aciklama: 'Çıtır katmer, bol Antep fıstığı.', malzemeler: ['Katmer', 'Antep Fıstığı'] },
  { id: 29, kat: 'Künefe & Katmer', ad: 'Çikolatalı Fıstıklı Katmer', fiyat: 500, populer: false, begeni: '', resim: '/public/urunler/katmer-dondurma.jpg', aciklama: 'Çikolatalı, fıstıklı çıtır katmer.', malzemeler: ['Katmer', 'Çikolata', 'Antep Fıstığı'] },
  { id: 31, kat: 'Sufle', ad: 'Çikolatalı Sufle', fiyat: 380, populer: false, begeni: '', aciklama: 'Akışkan çikolatalı sufle.', malzemeler: ['Sufle', 'Çikolata'] },
  { id: 32, kat: 'Sufle', ad: 'Beyaz Çikolatalı Tahinli Sufle', fiyat: 380, populer: false, begeni: '', aciklama: 'Beyaz çikolata ve tahinli, akışkan sufle.', malzemeler: ['Sufle', 'Beyaz Çikolata', 'Tahin'] }
]
const KATS = ['Tümü', 'Bowl Waffle', 'Kare Waffle', 'Kumpir', 'Künefe & Katmer', 'Sufle']
const ONE_CIKAN = [5, 6, 16]
const KAT_BILGI: Record<string, { emoji: string; aciklama: string }> = { 'Bowl Waffle': { emoji: '🧇', aciklama: 'Kasede bol malzemeli waffle' }, 'Kare Waffle': { emoji: '🧇', aciklama: 'Klasik kare waffle' }, 'Kumpir': { emoji: '🥔', aciklama: 'İstediğin malzemeyle kumpir' }, 'Künefe & Katmer': { emoji: '🍮', aciklama: 'Sıcak künefe ve çıtır katmer' }, 'Sufle': { emoji: '🍫', aciklama: 'Akışkan çikolatalı sufle' } }
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
  const [sayfa, setSayfa] = useState<'anasayfa' | 'menu'>('anasayfa')
  const [arama, setArama] = useState('')
  const [sepet, setSepet] = useState<any[]>([])
  const [sepetAcik, setSepetAcik] = useState(false)
  const [modalUrun, setModalUrun] = useState<any>(null)
  const [cikartilan, setCikartilan] = useState<string[]>([])
  const [ekstraSecilen, setEkstraSecilen] = useState<any[]>([])
  const [kumpirSecilen, setKumpirSecilen] = useState<string[]>([])
  const [modalAdet, setModalAdet] = useState(1)
  const [siparisSayisi, setSiparisSayisi] = useState(0)
  const [puan, setPuan] = useState(0)
  const [puanKullan, setPuanKullan] = useState(false)
  const [footerAcik, setFooterAcik] = useState('')
  const [odemeAcik, setOdemeAcik] = useState(false)
  const [siparisTamam, setSiparisTamam] = useState(false)
  const [adSoyad, setAdSoyad] = useState('')
  const [telefon, setTelefon] = useState('')
  const [adres, setAdres] = useState('')
  const [siparisNotu, setSiparisNotu] = useState('')
  const [kapiyaBirak, setKapiyaBirak] = useState(false)
  const [zileBasma, setZileBasma] = useState(false)
  const [odemeYontemi, setOdemeYontemi] = useState('Kapıda Nakit')
  const [gonderiliyor, setGonderiliyor] = useState(false)
  const siparisNo = siparisSayisi + 1
  useEffect(() => {
    supabase.auth.getSession().then((res) => setUser(res.data.session?.user || null))
    const kayitliPuan = localStorage.getItem('wafflia_puan')
    const kayitliSiparis = localStorage.getItem('wafflia_siparis')
    if (kayitliPuan) setPuan(parseInt(kayitliPuan))
    if (kayitliSiparis) setSiparisSayisi(parseInt(kayitliSiparis))
  }, [])
  const cikisYap = async () => {
    await supabase.auth.signOut()
    setUser(null)
    window.location.reload()
  }
  const isim = user?.user_metadata?.full_name || user?.email?.split('@')[0] || adSoyad || ''
  const urunAc = (urun: any) => {
    setModalUrun(urun)
    setCikartilan([])
    setEkstraSecilen([])
    setKumpirSecilen([])
    setModalAdet(1)
  }
  const toggleCikart = (m: string) => {
    if (cikartilan.includes(m)) setCikartilan(cikartilan.filter((x) => x !== m))
    else setCikartilan([...cikartilan, m])
  }
  const toggleEkstra = (e: any) => {
    if (ekstraSecilen.find((x) => x.ad === e.ad)) setEkstraSecilen(ekstraSecilen.filter((x) => x.ad !== e.ad))
    else setEkstraSecilen([...ekstraSecilen, e])
  }
  const toggleKumpir = (m: string) => {
    if (kumpirSecilen.includes(m)) setKumpirSecilen(kumpirSecilen.filter((x) => x !== m))
    else {
      if (modalUrun?.limit && kumpirSecilen.length >= modalUrun.limit) return
      setKumpirSecilen([...kumpirSecilen, m])
    }
  }
  const ekstraToplam = ekstraSecilen.reduce((t, e) => t + e.fiyat, 0)
  const modalToplam = modalUrun ? (modalUrun.fiyat + ekstraToplam) * modalAdet : 0
  const modalSepeteEkle = () => {
    if (!modalUrun) return
    const yeni = [...sepet]
    for (let i = 0; i < modalAdet; i++) yeni.push({ ...modalUrun, cikartilan: [...cikartilan], ekstralar: [...ekstraSecilen], kumpirMalzemeler: [...kumpirSecilen], birimFiyat: modalUrun.fiyat + ekstraToplam })
    setSepet(yeni)
    setModalUrun(null)
    setSepetAcik(true)
  }
  const azalt = (urun: any) => {
    const idx = sepet.findIndex((s) => s.id === urun.id)
    if (idx >= 0) {
      const yeni = [...sepet]
      yeni.splice(idx, 1)
      setSepet(yeni)
    }
  }
  const araToplam = sepet.reduce((t, u) => t + (u.birimFiyat || u.fiyat), 0)
  const indirimOrani = siparisNo === 1 ? 0.25 : siparisNo === 5 ? 0.40 : 0
  const indirimTutari = Math.round(araToplam * indirimOrani)
  const puanIndirimi = puanKullan && puan >= 150 ? 400 : 0
  const odenecek = Math.max(0, araToplam - indirimTutari - puanIndirimi)
  const aramali = URUNLER.filter((u) => u.ad.toLowerCase().includes(arama.toLowerCase()) || u.aciklama.toLowerCase().includes(arama.toLowerCase()))
  const gosterilecekKats = kat === 'Tümü' ? KATS.slice(1) : [kat]
  const oneCikanUrunler = URUNLER.filter((u) => ONE_CIKAN.includes(u.id))
  const siparisiTamamla = async () => {
    if (!adSoyad || !telefon || !adres) { alert('Lütfen ad, telefon ve adresi doldur'); return }
    setGonderiliyor(true)
    const notlar = [kapiyaBirak ? 'Kapıya Bırak' : '', zileBasma ? 'Zile Basma' : '', siparisNotu].filter(Boolean).join(' - ')
    const urunOzeti = sepet.map((s) => s.ad + ' (' + (s.birimFiyat || s.fiyat) + ' TL)' + (s.kumpirMalzemeler && s.kumpirMalzemeler.length ? ' [' + s.kumpirMalzemeler.join(', ') + ']' : '') + (s.ekstralar && s.ekstralar.length ? ' +Ekstra: ' + s.ekstralar.map((e: any) => e.ad).join(', ') : '') + (s.cikartilan && s.cikartilan.length ? ' -Cikar: ' + s.cikartilan.join(', ') : '')).join('\n')
    try {
      await supabase.from('siparisler').insert([{ musteri_adi: adSoyad, telefon, adres, not_text: notlar, teslimat: notlar, odeme: odemeYontemi, urunler: urunOzeti, ara_toplam: araToplam, indirim: indirimTutari + puanIndirimi, odenecek, puan_kazanilan: 10 }])
    } catch (e) {}
    const yeniPuan = puanKullan ? puan - 150 + 10 : puan + 10
    const yeniSiparisSayisi = siparisSayisi + 1
    setPuan(yeniPuan)
    setSiparisSayisi(yeniSiparisSayisi)
    localStorage.setItem('wafflia_puan', String(yeniPuan))
    localStorage.setItem('wafflia_siparis', String(yeniSiparisSayisi))
    const waMesaj = encodeURIComponent('YENI SIPARIS - ' + adSoyad + ' - ' + telefon + ' - ' + adres + ' - Not: ' + (notlar || 'Yok') + ' - Odeme: ' + odemeYontemi + ' - ' + urunOzeti + ' - Ara Toplam: ' + araToplam + ' TL - Indirim: -' + (indirimTutari + puanIndirimi) + ' TL - ODENECEK: ' + odenecek + ' TL')
    window.open('https://wa.me/905352732865?text=' + waMesaj, '_blank')
    setGonderiliyor(false)
    setSepet([])
    setOdemeAcik(false)
    setSiparisTamam(true)
    setPuanKullan(false)
  }
  const UrunKarti = ({ u }: { u: any }) => (
    <div style={{ background: 'white', borderRadius: '16px', padding: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start', boxShadow: '0 1px 6px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
      <div style={{ flex: 1, minWidth: 0, cursor: 'pointer' }} onClick={() => urunAc(u)}>
        <div style={{ fontWeight: '800', fontSize: '16px' }}>{u.ad}</div>
        <div style={{ color: '#777', fontSize: '13px', margin: '5px 0', lineHeight: '1.45' }}>{u.aciklama}</div>
        {u.begeni ? <div style={{ color: '#16a34a', fontSize: '12px', fontWeight: 'bold', margin: '4px 0' }}>👍 {u.begeni}</div> : null}
        <div style={{ marginTop: '6px' }}><b style={{ fontSize: '16px' }}>{u.fiyat} TL</b></div>
        <button onClick={(e) => { e.stopPropagation(); urunAc(u) }} style={{ marginTop: '8px', background: 'black', color: 'white', border: 'none', padding: '7px 14px', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>+ Sepete Ekle</button>
      </div>
      <div onClick={() => urunAc(u)} style={{ width: '104px', height: '104px', background: renkFor(u.kat), borderRadius: '14px', flexShrink: 0, position: 'relative', cursor: 'pointer', overflow: 'hidden' }}>
        {u.resim ? <img src={u.resim} alt={u.ad} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '44px' }}>{emojiFor(u.kat)}</div>}
        {u.populer ? <span style={{ position: 'absolute', bottom: '6px', right: '6px', background: '#e11d48', color: 'white', fontSize: '11px', padding: '3px 8px', borderRadius: '12px', fontWeight: 'bold' }}>🔥 Popüler</span> : null}
      </div>
    </div>
  )
  return (
    <div style={{ fontFamily: 'sans-serif', background: '#fff7ee', minHeight: '100vh', paddingBottom: '170px' }}>
      <div style={{ background: '#3b1d0a', color: 'white', padding: '16px', textAlign: 'center' }}>
        <div style={{ fontSize: '22px', fontWeight: '900' }}>WaffLia Sweet Kumpir</div>
        <div style={{ fontSize: '12px', color: '#e8c99a', marginTop: '4px' }}>Açık 17:00 - 05:00 • İstanbul • 30-45 dk teslimat</div>
      </div>
      <div style={{ background: '#3b1d0a', color: 'white', padding: '0 16px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontSize: '70px', lineHeight: '1.1' }}>🧇 🥔</div>
          <h1 style={{ fontSize: '28px', lineHeight: '1.2', margin: '12px 0' }}>Ne canın çekiyor?</h1>
          <p style={{ color: '#e8c99a', fontSize: '14px', margin: '0 0 14px' }}>Menüden birini seç, ürünler gelsin.</p>
          {user ? (
            <div style={{ background: 'white', color: '#333', borderRadius: '14px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Hoş geldin, <b>{isim}!</b> 👋 • ⭐ {puan} Puan {siparisSayisi > 0 ? '• ' + siparisSayisi + ' sipariş verdin' : '• Henüz siparişin yok'}</span>
              <button onClick={cikisYap} style={{ border: '1px solid #ddd', background: 'white', padding: '7px 14px', borderRadius: '20px', cursor: 'pointer' }}>Çıkış Yap</button>
            </div>
          ) : null}
          <button onClick={() => { setSayfa('menu'); setKat('Tümü'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ background: '#b45309', color: 'white', padding: '13px 28px', borderRadius: '12px', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>Menüyü Gör →</button>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 12px' }}>
        {sayfa === 'anasayfa' ? (
          <div>
            <h2 style={{ fontSize: '22px', margin: '20px 4px 10px' }}>Menüler</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
              {KATS.slice(1).map((k) => {
                const ilk = URUNLER.find((u) => u.kat === k)
                const adet = URUNLER.filter((u) => u.kat === k).length
                return (
                  <button key={k} onClick={() => { setKat(k); setSayfa('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ textAlign: 'left', background: 'white', border: '1px solid #eee', borderRadius: '16px', padding: 0, overflow: 'hidden', cursor: 'pointer', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
                    <div style={{ height: '140px', background: renkFor(k), overflow: 'hidden', position: 'relative' }}>
                      {ilk?.resim ? <img src={ilk.resim} alt={k} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '56px' }}>{KAT_BILGI[k]?.emoji || '🧇'}</div>}
                    </div>
                    <div style={{ padding: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><b style={{ fontSize: '18px' }}>{k}</b><span style={{ fontSize: '18px' }}>→</span></div>
                      <div style={{ color: '#777', fontSize: '13px', marginTop: '4px' }}>{KAT_BILGI[k]?.aciklama || ''}</div>
                      <div style={{ color: '#b45309', fontSize: '13px', fontWeight: 'bold', marginTop: '6px' }}>{adet} çeşit • Görüntüle</div>
                    </div>
                  </button>
                )
              })}
            </div>
            <h2 style={{ fontSize: '22px', margin: '20px 4px 10px' }}>Öne Çıkan Ürünler</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '14px' }}>{oneCikanUrunler.map((u) => <UrunKarti key={u.id} u={u} />)}</div>
          </div>
        ) : null}
        {sayfa === 'menu' ? (
          <div>
            <button onClick={() => { setSayfa('anasayfa'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ background: 'white', border: '1px solid #ddd', padding: '9px 14px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', margin: '20px 0 6px' }}>← Tüm Menüler</button>
            <h2 style={{ fontSize: '22px', margin: '8px 4px 10px' }}>{kat === 'Tümü' ? 'Tüm Menü' : kat}</h2>
            <input value={arama} onChange={(e) => setArama(e.target.value)} placeholder={kat === 'Tümü' ? 'Menüde ara...' : kat + ' içinde ara...'} style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid #ddd', outline: 'none', fontSize: '15px', boxSizing: 'border-box', marginBottom: '12px' }} />
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', whiteSpace: 'nowrap', paddingBottom: '6px' }}>
              {KATS.map((k) => (<button key={k} onClick={() => setKat(k)} style={{ padding: '9px 16px', borderRadius: '20px', border: kat === k ? '1px solid #5b2c0e' : '1px solid #ddd', background: kat === k ? '#5b2c0e' : 'white', color: kat === k ? 'white' : '#333', cursor: 'pointer', fontWeight: kat === k ? 'bold' : 'normal', flexShrink: 0 }}>{k}</button>))}
            </div>
            {gosterilecekKats.map((k) => {
              const liste = aramali.filter((u) => u.kat === k)
              if (liste.length === 0) return null
              return (
                <div key={k}>
                  <h3 style={{ fontSize: '18px', margin: '18px 4px 10px' }}>{k} <span style={{ color: '#999', fontSize: '13px', fontWeight: 'normal' }}>{liste.length} ürün</span></h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '14px' }}>{liste.map((u) => <UrunKarti key={u.id} u={u} />)}</div>
                </div>
              )
            })}
          </div>
        ) : null}
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px', overflowX: 'auto' }}>
          <div style={{ background: '#e11d48', color: 'white', borderRadius: '16px', padding: '14px', minWidth: '220px', flex: 1 }}><div style={{ fontSize: '22px', fontWeight: '900' }}>%25 İNDİRİM</div><div style={{ fontSize: '13px', marginTop: '4px' }}>1. Siparişine özel! İlk siparişinde %25 indirim sepette uygulanır.</div></div>
          <div style={{ background: '#5b2c0e', color: 'white', borderRadius: '16px', padding: '14px', minWidth: '220px', flex: 1 }}><div style={{ fontSize: '22px', fontWeight: '900' }}>%40 İNDİRİM</div><div style={{ fontSize: '13px', marginTop: '4px' }}>5. Siparişine özel! 5. siparişinde %40 indirim sepette uygulanır.</div></div>
          <div style={{ background: '#f59e0b', color: 'white', borderRadius: '16px', padding: '14px', minWidth: '220px', flex: 1 }}><div style={{ fontSize: '22px', fontWeight: '900' }}>150 PUAN = 400 TL</div><div style={{ fontSize: '13px', marginTop: '4px' }}>Her sipariş 10 puan. 150 puana ulaşınca 400 TL indirim kazan!</div></div>
        </div>
        <div style={{ background: 'white', borderRadius: '14px', padding: '12px', marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', fontSize: '13px' }}>
          <span style={{ fontWeight: 'bold' }}>⭐ Puanın: {puan} / 150</span>
          <span style={{ background: '#fef3c7', padding: '5px 10px', borderRadius: '12px' }}>Bu senin {siparisNo}. siparişin {indirimOrani > 0 ? '• %' + (indirimOrani * 100) + ' indirim uygulanacak' : ''}</span>
          {puan >= 150 ? <label style={{ cursor: 'pointer', fontWeight: 'bold', color: '#16a34a' }}><input type="checkbox" checked={puanKullan} onChange={(e) => setPuanKullan(e.target.checked)} /> 400 TL puan indirimi kullan</label> : <span style={{ color: '#888' }}>150 puana {150 - puan} puan kaldı</span>}
        </div>
        <div style={{ background: 'white', borderRadius: '16px', padding: '16px', marginTop: '24px' }}>
          <h3 style={{ margin: '0 0 10px' }}>ℹ️ Bilgilendirme</h3>
          {[
            { id: 'alerji', baslik: '⚠️ Alerji Uyarısı', icerik: 'Ürünlerimiz gluten, süt, yumurta, fındık, fıstık, susam, soya ve tahin içerebilir. Aynı tezgahta hazırlanır. Alerjiniz varsa sipariş öncesi 0535 273 28 65 numarasından bilgi alın.' },
            { id: 'kvkk', baslik: '🔒 KVKK Aydınlatma Metni', icerik: 'Veri Sorumlusu: WaffLia Sweet Kumpir (İstanbul). Topladığımız veriler: ad soyad, telefon, adres, sipariş notu ve sipariş içeriği. Amaç: siparişinizi hazırlamak, teslim etmek ve sizinle iletişim kurmak. Hukuki sebep: sözleşmenin kurulması ve ifası. Verileriniz pazarlama amacıyla kullanılmaz, 3. kişilerle paylaşılmaz ve satılmaz. Sipariş bilgileriniz yalnızca siparişin hazırlanması için gerekli süre boyunca saklanır. Haklarınız: verilerinize erişme, düzeltme, silinmesini isteme ve itiraz etme hakkınız vardır. Başvuru için: 0535 273 28 65 (WhatsApp) üzerinden bize ulaşabilirsiniz.' },
            { id: 'gizlilik', baslik: '🛡️ Gizlilik Politikası', icerik: 'Sitemizde paylaştığınız ad, telefon ve adres bilgileriniz yalnızca sipariş işlemleri için kullanılır. Bilgileriniz şifrelenerek iletilir ve yetkisiz kişilerle paylaşılmaz. Üye olmadan da sipariş verebilirsiniz. Hesap oluşturursanız bilgileriniz yalnızca hesabınıza giriş yapmanız için kullanılır.' },
            { id: 'mesafeli', baslik: '📄 Mesafeli Satış Sözleşmesi', icerik: 'Satıcı: WaffLia Sweet Kumpir - İstanbul. Alıcı: sipariş formunda bilgileri bulunan kişi. Ürünler: menüde listelenen gıda ürünleri. Fiyatlar: menüde yazan fiyatlar KDV dahildir, teslimat ücreti ayrıca alınmaz. Ödeme: kapıda nakit veya kapıda kredi kartı ile yapılır. Teslimat: sipariş onaylandıktan sonra ortalama 30-45 dakika içinde belirtilen adrese yapılır. Siparişi onayladığınızda bu sözleşmeyi kabul etmiş sayılırsınız.' },
            { id: 'cerez', baslik: '🍪 Çerez Politikası', icerik: 'Sitemiz, sepetinizin ve puanınızın kaybolmaması için cihazınızda küçük çerezler / yerel depolama kullanır. Bu bilgiler yalnızca sitedeki deneyiminizi iyileştirmek içindir. Reklam takibi yapılmaz, bilgileriniz reklam amacıyla satılmaz. Tarayıcınızdan çerezleri silebilirsiniz, bu durumda sepetiniz sıfırlanabilir.' },
            { id: 'iade', baslik: '↩️ İade & İptal', icerik: 'Gıda ürünleri hijyen gereği iade edilemez. Siparişiniz henüz hazırlanmadıysa iptal için hemen 0535 273 28 65 numarasından WhatsApp ile bize ulaşın. Yanlış / eksik ürün gelirse 30 dakika içinde ürünün fotoğrafı ile bize ulaşmanız halinde ürününüz yeniden gönderilir veya ücretiniz iade edilir.' },
            { id: 'kargo', baslik: '🛵 Teslimat & Çalışma Saatleri', icerik: 'Her gün 17:00 - 05:00 arası açığız. Ortalama teslimat 30-45 dakikadır.' },
            { id: 'iletisim', baslik: '📞 İletişim', icerik: 'Telefon / WhatsApp: 0535 273 28 65 • İstanbul • Instagram: @wafflia • Her gün 17:00 - 05:00' },
          ].map((b) => (
            <div key={b.id} style={{ borderBottom: '1px solid #eee' }}>
              <button onClick={() => setFooterAcik(footerAcik === b.id ? '' : b.id)} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '12px 0', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>{b.baslik} <span>{footerAcik === b.id ? '▲' : '▼'}</span></button>
              {footerAcik === b.id ? <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.6', margin: '0 0 12px' }}>{b.icerik}</p> : null}
            </div>
          ))}
          <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #eee', textAlign: 'center' }}>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#16a34a' }}>🔒 SSL ile Güvenli Bağlantı • Bilgileriniz şifrelenerek iletilir</div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '6px' }}>💳 Kapıda Nakit • 💳 Kapıda Kredi Kartı • Fiyatlara KDV dahildir</div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '6px' }}>WaffLia Sweet Kumpir • İstanbul • Telefon / WhatsApp: 0535 273 28 65 • Instagram: @wafflia</div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '6px' }}>Her gün 17:00 - 05:00 • Ortalama teslimat 30-45 dakika</div>
          </div>
          <p style={{ fontSize: '11px', color: '#999', marginTop: '12px', textAlign: 'center' }}>© 2026 WaffLia Sweet Kumpir • Tüm hakları saklıdır • Fiyatlara KDV dahildir</p>
        </div>
      </div>
            <a href="https://wa.me/905352732865?text=Merhaba%2C%20sipari%C5%9F%20vermek%20istiyorum" target="_blank" rel="noopener noreferrer" style={{ position: 'fixed', right: '16px', bottom: '92px', zIndex: 30, background: '#25D366', color: 'white', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', textDecoration: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }} aria-label="WhatsApp ile sipariş ver">💬</a>
      {modalUrun && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ background: 'white', width: '100%', maxWidth: '600px', maxHeight: '88vh', overflowY: 'auto', borderRadius: '20px 20px 0 0', padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div><h2 style={{ margin: '0 0 6px', fontSize: '20px' }}>{modalUrun.ad}</h2><p style={{ color: '#666', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>{modalUrun.aciklama}</p></div>
              <button onClick={() => setModalUrun(null)} style={{ border: 'none', background: '#eee', width: '32px', height: '32px', borderRadius: '50%', fontSize: '18px', cursor: 'pointer', flexShrink: 0 }}>✕</button>
            </div>
            {modalUrun.kat === 'Kumpir' ? (
              <div>
                <h3 style={{ fontSize: '16px', margin: '16px 0 6px' }}>Malzemeni Seç 👇</h3>
                <p style={{ fontSize: '13px', color: modalUrun.limit && kumpirSecilen.length >= modalUrun.limit ? '#e11d48' : '#888', fontWeight: 'bold', margin: '0 0 10px' }}>{kumpirSecilen.length} / {modalUrun.limit} seçildi {modalUrun.limit && kumpirSecilen.length >= modalUrun.limit ? '• Limit doldu' : ''}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {KUMPIR_MALZEMELER.map((m) => {
                    const secili = kumpirSecilen.includes(m)
                    const dolu = !secili && modalUrun.limit && kumpirSecilen.length >= modalUrun.limit
                    return (
                      <label key={m} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: secili ? '#dcfce7' : dolu ? '#f3f3f3' : '#f9f9f9', padding: '10px 12px', borderRadius: '12px', border: secili ? '1px solid #86efac' : '1px solid #eee', cursor: dolu ? 'not-allowed' : 'pointer', opacity: dolu ? 0.5 : 1 }}>
                        <span>{m} {secili ? ' ✓' : ''}</span>
                        <input type="checkbox" checked={secili} disabled={dolu} onChange={() => toggleKumpir(m)} style={{ width: '20px', height: '20px' }} />
                      </label>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: '15px', margin: '16px 0 8px' }}>Çıkartmak istediklerini seç 👇</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {modalUrun.malzemeler.map((m: string) => (
                    <label key={m} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: cikartilan.includes(m) ? '#fef2f2' : '#f9f9f9', padding: '10px 12px', borderRadius: '12px', border: cikartilan.includes(m) ? '1px solid #fecaca' : '1px solid #eee', cursor: 'pointer' }}>
                      <span style={{ textDecoration: cikartilan.includes(m) ? 'line-through' : 'none', color: cikartilan.includes(m) ? '#999' : '#333' }}>{m} {cikartilan.includes(m) ? ' — Çıkartılacak' : ''}</span>
                      <input type="checkbox" checked={cikartilan.includes(m)} onChange={() => toggleCikart(m)} style={{ width: '20px', height: '20px' }} />
                    </label>
                  ))}
                </div>
                <h3 style={{ fontSize: '15px', margin: '18px 0 8px' }}>Ekstra Malzeme Ekle ➕</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {EKSTRA_WAFFLE.map((e) => {
                    const secili = !!ekstraSecilen.find((x) => x.ad === e.ad)
                    return (
                      <label key={e.ad} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: secili ? '#dcfce7' : '#f9f9f9', padding: '10px 12px', borderRadius: '12px', border: secili ? '1px solid #86efac' : '1px solid #eee', cursor: 'pointer' }}>
                        <span>{e.ad} {secili ? ' ✓' : ''}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><b>+{e.fiyat} TL</b><input type="checkbox" checked={secili} onChange={() => toggleEkstra(e)} style={{ width: '20px', height: '20px' }} /></span>
                      </label>
                    )
                  })}
                </div>
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={() => setModalAdet(Math.max(1, modalAdet - 1))} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #ddd', background: 'white', fontSize: '20px', cursor: 'pointer' }}>-</button>
                <b style={{ fontSize: '18px' }}>{modalAdet}</b>
                <button onClick={() => setModalAdet(modalAdet + 1)} style={{ width: '36px', height: '36px', borderRadius: '50%', border: 'none', background: '#5b2c0e', color: 'white', fontSize: '20px', cursor: 'pointer' }}>+</button>
              </div>
              <b style={{ fontSize: '18px' }}>{modalToplam.toFixed(2)} TL</b>
            </div>
            <button onClick={modalSepeteEkle} style={{ width: '100%', marginTop: '14px', background: '#5b2c0e', color: 'white', border: 'none', padding: '14px', borderRadius: '14px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Sepete Ekle • {modalToplam.toFixed(2)} TL</button>
          </div>
        </div>
      )}
      {sepet.length > 0 && (
        <div style={{ position: 'fixed', left: 0, right: 0, bottom: '68px', padding: '0 12px', zIndex: 30 }}>
          <button onClick={() => setSepetAcik(!sepetAcik)} style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#5b2c0e', color: 'white', border: 'none', padding: '14px 18px', borderRadius: '16px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.25)' }}>
            <span>🛒 Sepeti Görüntüle • {sepet.length} ürün</span>
            <span>{odenecek.toFixed(2)} TL →</span>
          </button>
          {sepetAcik && (
            <div style={{ maxWidth: '1200px', margin: '8px auto 0', background: 'white', borderRadius: '16px', padding: '14px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', color: '#333', maxHeight: '60vh', overflowY: 'auto' }}>
              {sepet.map((s, i) => (
                <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #eee', fontSize: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>{s.ad}</span><span>{(s.birimFiyat || s.fiyat)} TL <button onClick={() => azalt(s)} style={{ border: '1px solid #ddd', background: 'white', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', marginLeft: '6px' }}>−</button></span></div>
                  {s.kumpirMalzemeler && s.kumpirMalzemeler.length > 0 ? <div style={{ fontSize: '12px', color: '#16a34a' }}>Kumpir: {s.kumpirMalzemeler.join(', ')}</div> : null}
                  {s.cikartilan && s.cikartilan.length > 0 ? <div style={{ fontSize: '12px', color: '#e11d48' }}>Çıkartılan: {s.cikartilan.join(', ')}</div> : null}
                  {s.ekstralar && s.ekstralar.length > 0 ? <div style={{ fontSize: '12px', color: '#16a34a' }}>Ekstra: {s.ekstralar.map((e: any) => e.ad).join(', ')}</div> : null}
                </div>
              ))}
              <div style={{ fontSize: '14px', marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Ara Toplam</span><span>{araToplam.toFixed(2)} TL</span></div>
                {indirimTutari > 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a', fontWeight: 'bold' }}><span>{siparisNo}. Sipariş İndirimi (%{indirimOrani * 100})</span><span>-{indirimTutari} TL</span></div> : null}
                {puanIndirimi > 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a', fontWeight: 'bold' }}><span>150 Puan İndirimi</span><span>-{puanIndirimi} TL</span></div> : null}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '16px', borderTop: '1px solid #eee', paddingTop: '8px' }}><span>Ödenecek</span><span>{odenecek.toFixed(2)} TL</span></div>
                <div style={{ fontSize: '12px', color: '#888', textAlign: 'center', marginTop: '4px' }}>Bu siparişten +10 puan kazanacaksın ⭐</div>
              </div>
              <button onClick={() => { setSepetAcik(false); setOdemeAcik(true) }} style={{ marginTop: '12px', width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: '#16a34a', color: 'white', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Siparişi Tamamla • {odenecek.toFixed(2)} TL →</button>
              <button onClick={() => setSepet([])} style={{ marginTop: '8px', width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ddd', background: 'white', cursor: 'pointer' }}>Sepeti Temizle</button>
            </div>
          )}
        </div>
      )}
      {odemeAcik && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 60 }}>
          <div style={{ background: 'white', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', borderRadius: '20px 20px 0 0', padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><h2 style={{ margin: 0 }}>Siparişi Tamamla</h2><button onClick={() => setOdemeAcik(false)} style={{ border: 'none', background: '#eee', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer' }}>✕</button></div>
            <p style={{ fontSize: '13px', color: '#666' }}>Toplam: <b>{odenecek.toFixed(2)} TL</b> • +10 puan kazanacaksın</p>
            <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Ad Soyad *</label>
            <input value={adSoyad} onChange={(e) => setAdSoyad(e.target.value)} placeholder="Ad Soyad" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', margin: '6px 0 12px', boxSizing: 'border-box' }} />
            <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Telefon *</label>
            <input value={telefon} onChange={(e) => setTelefon(e.target.value)} placeholder="05xx xxx xx xx" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', margin: '6px 0 12px', boxSizing: 'border-box' }} />
            <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Adres *</label>
            <textarea value={adres} onChange={(e) => setAdres(e.target.value)} placeholder="Mahalle, sokak, bina, daire..." rows={3} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', margin: '6px 0 12px', boxSizing: 'border-box' }} />
            <h3 style={{ fontSize: '15px', margin: '6px 0' }}>Teslimat Notu</h3>
            <label style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '10px', background: kapiyaBirak ? '#dcfce7' : '#f9f9f9', borderRadius: '10px', marginBottom: '8px', cursor: 'pointer' }}><input type="checkbox" checked={kapiyaBirak} onChange={(e) => setKapiyaBirak(e.target.checked)} /> 🚪 Kapıya Bırak</label>
            <label style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '10px', background: zileBasma ? '#dcfce7' : '#f9f9f9', borderRadius: '10px', marginBottom: '8px', cursor: 'pointer' }}><input type="checkbox" checked={zileBasma} onChange={(e) => setZileBasma(e.target.checked)} /> 🔕 Zile Basma</label>
            <textarea value={siparisNotu} onChange={(e) => setSiparisNotu(e.target.value)} placeholder="Diğer notun varsa yaz... Örn: Bebek uyuyor, aramadan bırakın" rows={2} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', marginBottom: '12px', boxSizing: 'border-box' }} />
            <h3 style={{ fontSize: '15px', margin: '6px 0' }}>Ödeme Yöntemi</h3>
            {['Kapıda Nakit', 'Kapıda Kredi Kartı'].map((y) => (
              <label key={y} style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '12px', background: odemeYontemi === y ? '#dcfce7' : '#f9f9f9', borderRadius: '10px', marginBottom: '8px', cursor: 'pointer', border: odemeYontemi === y ? '1px solid #86efac' : '1px solid #eee' }}>
                <input type="radio" name="odeme" checked={odemeYontemi === y} onChange={() => setOdemeYontemi(y)} /> {y === 'Kapıda Nakit' ? '💵 Kapıda Nakit' : '💳 Kapıda Kredi Kartı'}
              </label>
            ))}
            <button onClick={siparisiTamamla} disabled={gonderiliyor} style={{ width: '100%', marginTop: '12px', background: '#16a34a', color: 'white', border: 'none', padding: '15px', borderRadius: '14px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>{gonderiliyor ? 'Gönderiliyor...' : 'Siparişi Onayla • ' + odenecek.toFixed(2) + ' TL'}</button>
            <p style={{ fontSize: '11px', color: '#999', textAlign: 'center', marginTop: '8px' }}>Onaylayınca siparişin bize WhatsApp + Supabase tablosuna düşer.</p>
          </div>
        </div>
      )}
      {siparisTamam && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 70, padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '24px', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
            <div style={{ fontSize: '50px' }}>✅</div>
            <h2 style={{ margin: '10px 0' }}>Siparişin Alındı!</h2>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>Teşekkürler! Siparişin hazırlanıyor.<br />+10 puan kazandın ⭐<br />Toplam puanın: <b>{puan}</b></p>
            <button onClick={() => setSiparisTamam(false)} style={{ width: '100%', marginTop: '12px', background: '#5b2c0e', color: 'white', border: 'none', padding: '13px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Tamam</button>
          </div>
        </div>
      )}
      <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, background: 'white', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-around', padding: '10px 0 14px', zIndex: 20 }}>
        <button onClick={() => { setSayfa('anasayfa'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'center', color: sayfa === 'anasayfa' ? '#5b2c0e' : '#888', fontSize: '12px', fontWeight: 'bold' }}><div style={{ fontSize: '20px' }}>🏠</div>Anasayfa</button>
        <button onClick={() => { setSayfa('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'center', color: sayfa === 'menu' ? '#5b2c0e' : '#888', fontSize: '12px' }}><div style={{ fontSize: '20px' }}>☰</div>Menü</button>
        <a href="#" style={{ textAlign: 'center', textDecoration: 'none', color: '#888', fontSize: '12px' }}><div style={{ fontSize: '20px' }}>🧾</div>Siparişler</a>
        <a href="/giris" style={{ textAlign: 'center', textDecoration: 'none', color: '#888', fontSize: '12px' }}><div style={{ fontSize: '20px' }}>👤</div>Profil</a>
      </div>
    </div>
  )
}
