'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbyK-ZD63aNO9Qhbrk0ZxVjAghx7kUu0pTpGOUXRMrcidd6BoDDKXoiZs_IZ-Xq_9wIU/exec'
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
  if (kat === 'Kumpir') return '#FFFBEB'
  if (kat === 'Künefe & Katmer') return '#FFF7ED'
  if (kat === 'Sufle') return '#F5F3FF'
  if (kat === 'Kare Waffle') return '#FFF1F2'
  return '#FFF8E1'
}
export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [kat, setKat] = useState('Tümü')
  const [sayfa, setSayfa] = useState<'anasayfa' | 'menu' | 'profil'>('anasayfa')
  const [menuAcik, setMenuAcik] = useState(false)

  const [gecmisAcik, setGecmisAcik] = useState(false)
  const [gecmisSiparisler, setGecmisSiparisler] = useState<any[]>([])
  const [gecmisYukleniyor, setGecmisYukleniyor] = useState(false)
  const gecmisiGetir = (acModal: boolean = true) => {
    // 1. ONCE ANINDA AC - telefondaki listeyi hemen goster, Supabase'i bekleme
    let yerel: any[] = []
    try {
      const hamListe = JSON.parse(localStorage.getItem('wafflia_gecmis_siparisler') || '[]')
      const buTel = (user?.user_metadata?.telefon || '').replace(/[^0-9]/g, '')
      const oturumTel = (() => { try { return (JSON.parse(localStorage.getItem('wafflia_oturum') || 'null')?.telefon || '').replace(/[^0-9]/g, '') } catch (e) { return '' } })()
      const gecerliTeller = [buTel, oturumTel].filter(Boolean)
      yerel = gecerliTeller.length ? hamListe.filter((s: any) => { const t = String(s.telefon || '').replace(/[^0-9]/g, ''); return gecerliTeller.includes(t) || gecerliTeller.some((g: string) => t.endsWith(g.slice(-10)) || g.endsWith(t.slice(-10))) }) : []
    } catch (e) {}
    setGecmisSiparisler(yerel)
    if (acModal) setGecmisAcik(true)
    // 2. SONRA ARKADA GUNCELLE - tek sorgu, 8 kere degil 1 kere sor
    setGecmisYukleniyor(true)
    ;(async () => {
      try {
        const kayitliOturum: any = (() => { try { return JSON.parse(localStorage.getItem('wafflia_oturum') || 'null') } catch (e) { return null } })()
        const buHesabinTelefonu = user?.user_metadata?.telefon || kayitliOturum?.telefon || profilTelefon || ''
        if (!buHesabinTelefonu) { setGecmisYukleniyor(false); return }
        const h = String(buHesabinTelefonu).replace(/[^0-9]/g, '')
        const varyantlar = [buHesabinTelefonu, h, h.startsWith('0') ? h.slice(1) : '0' + h, '90' + h.replace(/^0/, '')]
        const tekil = varyantlar.filter((v: any, i: number, a: any[]) => a.indexOf(v) === i)
        const { data } = await supabase.from('siparisler').select('*').in('telefon', tekil).order('created_at', { ascending: false }).limit(20)
        if (data && data.length) {
          const supaOrders = data.map((o: any) => ({ tarih: o.created_at ? new Date(o.created_at).toLocaleString('tr-TR') : '', ad: o.musteri_adi || '', telefon: o.telefon || '', adres: o.adres || '', urunler: o.urunler || '', odenecek: o.odenecek || '', odeme: o.odeme || '', puan: o.puan_kazanilan || 10 }))
          setGecmisSiparisler(supaOrders)
          const toplamPuan = data.reduce((s: number, o: any) => s + (Number(o.puan_kazanilan) || 0), 0)
          setPuan(Math.max(0, toplamPuan))
          setSiparisSayisi(data.length)
        }
      } catch (e) {}
      setGecmisYukleniyor(false)
    })()
  }
  // Hesabim acilinca siparisleri modal acmadan yukle - tek sayfada gorunsun diye
  useEffect(() => { if (sayfa === 'profil' && user) gecmisiGetir(false) }, [sayfa, user?.email])
  const [profilModu, setProfilModu] = useState<'giris' | 'kayit'>('giris')
  const [profilAd, setProfilAd] = useState('')
  const [profilTelefon, setProfilTelefon] = useState('')
  const [profilEmail, setProfilEmail] = useState('')
  const [profilSifre, setProfilSifre] = useState('')
  const telefonNormalize = (tel: string) => {
    let d = (tel || '').replace(/[^0-9]/g, '')
    if (d.length === 12 && d.startsWith('90')) d = d.slice(2)
    if (d.length === 10) d = '0' + d
    return d
  }

  const yerelKullanicilariGetir = () => { try { return JSON.parse(localStorage.getItem('wafflia_kullanicilar') || '[]') } catch (e) { return [] } }
  const yerelKayitYap = () => {
    const liste: any[] = yerelKullanicilariGetir()
    const emailKucuk = profilEmail.trim().toLowerCase()
    const normTel = telefonNormalize(profilTelefon)
    if (liste.find((k: any) => k.email === emailKucuk || k.telefon === normTel)) { alert('Bu e-posta veya telefon zaten kayıtlı, Giriş Yap yap'); setProfilModu('giris'); return false }
    liste.push({ ad: profilAd, telefon: normTel, hamTelefon: profilTelefon, email: emailKucuk, sifre: profilSifre })
    localStorage.setItem('wafflia_kullanicilar', JSON.stringify(liste))
    localStorage.setItem('wafflia_telefon', profilTelefon)
    localStorage.setItem('wafflia_oturum', JSON.stringify({ ad: profilAd, telefon: normTel, email: emailKucuk }))
    setUser({ user_metadata: { full_name: profilAd, telefon: normTel }, email: emailKucuk } as any)
    setProfilModu('giris')
    alert('Kaydın oluşturuldu, hoş geldin ' + profilAd + ' (telefona kaydedildi)')
    return true
  }
  const yerelGirisYap = () => {
    const liste: any[] = yerelKullanicilariGetir()
    const emailKucuk = profilEmail.trim().toLowerCase()
    const normTel = telefonNormalize(profilTelefon)
    const bulunan = liste.find((k: any) => (k.email === emailKucuk || k.telefon === normTel) && k.sifre === profilSifre)
    if (!bulunan) { alert('Giriş olmadı: Önce Kayıt Ol yap. Aynı telefon, e-posta ve şifre ile kayıt olman lazım.'); return false }
    localStorage.setItem('wafflia_telefon', profilTelefon)
    localStorage.setItem('wafflia_oturum', JSON.stringify({ ad: bulunan.ad, telefon: bulunan.telefon, email: bulunan.email }))
    setUser({ user_metadata: { full_name: bulunan.ad, telefon: bulunan.telefon }, email: bulunan.email } as any)
    alert('Hoş geldin ' + bulunan.ad)
    return true
  }
  const kayitOl = async () => {
    if (!profilAd || !profilTelefon || !profilSifre) { alert('Lütfen ad, telefon ve şifre yaz'); return }
    if (!profilEmail || !profilEmail.includes('@')) { alert('Lütfen geçerli bir e-posta yaz'); return }
    const email = profilEmail.trim().toLowerCase()
    try {
    const { data, error } = await supabase.auth.signUp({ email, password: profilSifre, options: { data: { full_name: profilAd, telefon: telefonNormalize(profilTelefon), real_email: profilEmail || '' } } })
    if (error) {
      const msg = (error.message || '').toLowerCase()
      if (msg.includes('already')) { alert('Bu telefon zaten kayıtlı, giriş yap'); setProfilModu('giris'); return }
      if (msg.includes('fetch') || msg.includes('network') || msg.includes('failed')) { yerelKayitYap(); return }
      alert('Kayıt olmadı: ' + error.message)
      return
    }
    localStorage.setItem('wafflia_telefon', profilTelefon)
    try { if (GOOGLE_SHEETS_URL) { await fetch(GOOGLE_SHEETS_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'register', name: profilAd, phone: profilTelefon, email: profilEmail }) }) } } catch (e) {}
    if (data.user) setUser(data.user)
    setProfilModu('giris')
    alert('Kaydın oluşturuldu, hoş geldin ' + profilAd)
    } catch (e: any) { yerelKayitYap(); return }
  }
  const girisYapForm = async () => {
    if (!profilTelefon || !profilSifre) { alert('Lütfen telefon ve şifre yaz'); return }
    if (!profilEmail || !profilEmail.includes('@')) { alert('Giriş için e-postanı yaz. Tarayıcıyı silsen bile hesabına e-postanla gireceksin.'); return }
    const ham = (profilTelefon || '').replace(/[^0-9]/g, '')
    const norm = telefonNormalize(profilTelefon)
    const adaylar = [profilEmail.trim().toLowerCase(), norm + '@wafflia.local', ham + '@wafflia.local', (ham.startsWith('0') ? ham.slice(1) : '0' + ham) + '@wafflia.local', '90' + norm.replace(/^0/, '') + '@wafflia.local']
    let data: any = null; let error: any = null
    try {
    for (const aday of adaylar.filter((v: any, i: number, a: any[]) => a.indexOf(v) === i)) {
      const res = await supabase.auth.signInWithPassword({ email: aday, password: profilSifre })
      if (!res.error) { data = res.data; error = null; break }
      error = res.error
    }
    } catch (e: any) { yerelGirisYap(); return }
    if (error) {
      const msg = (error.message || '').toLowerCase()
      if (msg.includes('fetch') || msg.includes('network') || msg.includes('failed')) { yerelGirisYap(); return }
      // Supabase ulasiliyor ama sifre yanlis olabilir - yerelde de dene
      const liste: any[] = yerelKullanicilariGetir()
      if (liste.length) { if (yerelGirisYap()) return }
      alert('Giriş olmadı: Telefon veya şifre yanlış. Kayıt olurken yazdığın aynı telefon, e-posta ve şifreyi yaz.'); return
    }
    localStorage.setItem('wafflia_telefon', profilTelefon)
    if (data.user) setUser(data.user)
    alert('Hoş geldin ' + (data.user?.user_metadata?.full_name || ''))
  }
  const [hesapSilAcik, setHesapSilAcik] = useState(false)
  const [hesapSilindi, setHesapSilindi] = useState(false)
  const [carkAci, setCarkAci] = useState(0)
  const [carkDonuyor, setCarkDonuyor] = useState(false)
  const [carkOdul, setCarkOdul] = useState('')
  const CARK_ODULLER = ['%10 İndirim', '%25 İndirim', 'Ücretsiz Cola', '10 Puan', 'Tekrar Dene', '%15 İndirim', 'Bedava Ekstra Sos', '5 Puan']
  const bugun = new Date().toISOString().slice(0, 10)
  const carkBugunCevrildi = typeof window !== 'undefined' && localStorage.getItem('wafflia_cark_tarih') === bugun
  const carkCevir = () => {
    if (!user) { alert('Çarkı çevirmek ve indirim kazanmak için giriş yap'); setProfilModu('giris'); setSayfa('profil'); window.scrollTo({ top: 0, behavior: 'smooth' }); return }
    if (carkDonuyor || carkBugunCevrildi) return
    setCarkDonuyor(true)
    setCarkOdul('')
    const secilen = CARK_ODULLER[Math.floor(Math.random() * CARK_ODULLER.length)]
    const yeniAci = carkAci + 1440 + Math.floor(Math.random() * 360)
    setCarkAci(yeniAci)
    setTimeout(() => {
      setCarkDonuyor(false)
      setCarkOdul(secilen)
      localStorage.setItem('wafflia_cark_tarih', bugun)
      localStorage.setItem('wafflia_cark_odul', secilen)
    }, 1800)
  }
  const hesabiSil = async () => {
    if (!user) { setHesapSilAcik(false); alert('Hesabın yok, silinecek bir hesap yok. Önce giriş yap.'); setProfilModu('giris'); setSayfa('profil'); window.scrollTo({ top: 0, behavior: 'smooth' }); return }
    try { await supabase.from('hesap_silme_talepleri').insert([{ email: user?.email || '', isim: isim, tarih: new Date().toISOString() }]) } catch (e) {}
    try { await supabase.auth.signOut() } catch (e) {}
    localStorage.removeItem('wafflia_puan')
    localStorage.removeItem('wafflia_siparis')
    localStorage.removeItem('wafflia_cark_tarih')
    localStorage.removeItem('wafflia_cark_odul')
    setUser(null)
    setPuan(0)
    setSiparisSayisi(0)
    setHesapSilAcik(false)
    setHesapSilindi(true)
  }
  const [arama, setArama] = useState('')
  const [sepet, setSepet] = useState<any[]>([])
  const [sepetAcik, setSepetAcik] = useState(false)
  const [sepetYuklendi, setSepetYuklendi] = useState(false)
  useEffect(() => { try { const kayitliSepet = JSON.parse(localStorage.getItem('wafflia_sepet') || '[]'); if (kayitliSepet.length) setSepet(kayitliSepet) } catch (e) {} setSepetYuklendi(true) }, [])
  useEffect(() => { if (!sepetYuklendi) return; try { localStorage.setItem('wafflia_sepet', JSON.stringify(sepet)) } catch (e) {} }, [sepet, sepetYuklendi])
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
  const [sonWaMesaj, setSonWaMesaj] = useState('')
  const [siparisBannerKapali, setSiparisBannerKapali] = useState(false)
  const [hazirlanmaBaslangic, setHazirlanmaBaslangic] = useState(0)
  const [gecenDakika, setGecenDakika] = useState(0)
  const [gecenSaniye, setGecenSaniye] = useState(0)
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
    if (!siparisTamam || !hazirlanmaBaslangic) return
    const id = setInterval(() => {
      const fark = Math.floor((Date.now() - hazirlanmaBaslangic) / 1000)
      setGecenDakika(Math.floor(fark / 60))
      setGecenSaniye(fark % 60)
    }, 1000)
    return () => clearInterval(id)
  }, [siparisTamam, hazirlanmaBaslangic])
  useEffect(() => {
    // Yeni hesapta eski hesabin puani gozukmesin diye global puani burada yukleme, user gelince hesaba gore yuklenecek
    supabase.auth.getSession().then((res) => {
      if (res.data.session?.user) setUser(res.data.session.user)
      else { try { const o = JSON.parse(localStorage.getItem('wafflia_oturum') || 'null'); if (o) setUser({ user_metadata: { full_name: o.ad, telefon: o.telefon }, email: o.email } as any) } catch (e) {} }
    }).catch(() => { try { const o = JSON.parse(localStorage.getItem('wafflia_oturum') || 'null'); if (o) setUser({ user_metadata: { full_name: o.ad, telefon: o.telefon }, email: o.email } as any) } catch (e) {} })
    // Global puan yukleme yok - puan user effect'te hesaba gore yukleniyor, yoksa 0 kalir
  }, [])
  useEffect(() => {
    if (!user) { setPuan(0); setSiparisSayisi(0); return }
    const emailKey = (user?.email || '').trim().toLowerCase()
    if (emailKey) {
      const ozelPuan = localStorage.getItem('wafflia_puan_' + emailKey)
      const ozelSiparis = localStorage.getItem('wafflia_siparis_' + emailKey)
      if (ozelPuan) setPuan(parseInt(ozelPuan)); else setPuan(0)
      if (ozelSiparis) setSiparisSayisi(parseInt(ozelSiparis)); else setSiparisSayisi(0)
    }
    const tel: any = user?.user_metadata?.telefon || (() => { try { return JSON.parse(localStorage.getItem('wafflia_oturum') || 'null')?.telefon || '' } catch (e) { return '' } })() || ''
    if (!tel) return
    const ham = String(tel).replace(/[^0-9]/g, '')
    const varyantlar: any[] = [tel, ham, ham.startsWith('0') ? ham.slice(1) : '0' + ham]
    const yukle = async () => {
      for (const v of varyantlar) {
        try {
          const res: any = await supabase.from('siparisler').select('*').eq('telefon', v).order('created_at', { ascending: false }).limit(50)
          const data = res.data
          if (data && data.length) {
            const toplamPuan = data.reduce((s: number, o: any) => s + (Number(o.puan_kazanilan) || 0), 0)
            setPuan(Math.max(0, toplamPuan))
            setSiparisSayisi(data.length)
            try { const ek = (user?.email || '').trim().toLowerCase(); if (ek) { localStorage.setItem('wafflia_puan_' + ek, String(Math.max(0, toplamPuan))); localStorage.setItem('wafflia_siparis_' + ek, String(data.length)) } } catch (e) {}
            break
          }
        } catch (e) {}
      }
    }
    yukle()
  }, [user])
  const cikisYap = async () => {
    try { await supabase.auth.signOut() } catch (e) {}
    try { localStorage.removeItem('wafflia_oturum') } catch (e) {}
    setPuan(0); setSiparisSayisi(0)
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
  const indirimOrani = user ? (siparisNo === 1 ? 0.25 : siparisNo === 5 ? 0.40 : 0) : 0
  const indirimTutari = Math.round(araToplam * indirimOrani)
  const puanIndirimi = user && puanKullan && puan >= 150 ? 400 : 0
  const odenecek = Math.max(0, araToplam - indirimTutari - puanIndirimi)
  const aramali = URUNLER.filter((u) => u.ad.toLowerCase().includes(arama.toLowerCase()) || u.aciklama.toLowerCase().includes(arama.toLowerCase()))
  const gosterilecekKats = kat === 'Tümü' ? KATS.slice(1) : [kat]
  const oneCikanUrunler = URUNLER.filter((u) => ONE_CIKAN.includes(u.id))
  const siparisiTamamla = async () => {
    if (sepet.length === 0) { alert('Sepetin boş, önce ürün ekle'); return }
    if (odenecek < 200) { alert('Minimum sipariş tutarı 200 TL. Sepetine ' + (200 - odenecek).toFixed(0) + ' TL daha ekle'); return }
    if (!adSoyad || !telefon || !adres) { alert('Lütfen ad, telefon ve adresi doldur'); return }
    if (!user) { alert('Üye olmadan indirim uygulanmaz. Sadece +10 puan kazanacaksın. İndirim istiyorsan giriş yap.') }
    setGonderiliyor(true)
    const notlar = [kapiyaBirak ? 'Kapıya Bırak' : '', zileBasma ? 'Zile Basma' : '', siparisNotu].filter(Boolean).join(' - ')
    const urunOzeti = sepet.map((s) => s.ad + ' (' + (s.birimFiyat || s.fiyat) + ' TL)' + (s.kumpirMalzemeler && s.kumpirMalzemeler.length ? ' [' + s.kumpirMalzemeler.join(', ') + ']' : '') + (s.ekstralar && s.ekstralar.length ? ' +Ekstra: ' + s.ekstralar.map((e: any) => e.ad).join(', ') : '') + (s.cikartilan && s.cikartilan.length ? ' -Cikar: ' + s.cikartilan.join(', ') : '')).join('\n')
    try {
      await supabase.from('siparisler').insert([{ musteri_adi: adSoyad, telefon, adres, not_text: notlar, teslimat: notlar, odeme: odemeYontemi, urunler: urunOzeti, ara_toplam: araToplam, indirim: indirimTutari + puanIndirimi, odenecek, puan_kazanilan: puanKullan ? -140 : 10 }])
    } catch (e) {}
    try {
      if (GOOGLE_SHEETS_URL) {
        await fetch(GOOGLE_SHEETS_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'order', tarih: new Date().toLocaleString('tr-TR'), musteri_adi: adSoyad, telefon, adres, not: notlar, odeme: odemeYontemi, urunler: urunOzeti, ara_toplam: araToplam, indirim: indirimTutari + puanIndirimi, odenecek, puan_kazanilan: 10 }) })
      }
    } catch (e) {}
    const yeniPuan = puanKullan ? puan - 150 + 10 : puan + 10
    const yeniSiparisSayisi = siparisSayisi + 1
    setPuan(yeniPuan)
    setSiparisSayisi(yeniSiparisSayisi)
    try {
      const eski = JSON.parse(localStorage.getItem('wafflia_gecmis_siparisler') || '[]')
      eski.unshift({ tarih: new Date().toLocaleString('tr-TR'), ad: adSoyad, telefon, adres, urunler: urunOzeti, odenecek, odeme: odemeYontemi, puan: 10 })
      localStorage.setItem('wafflia_gecmis_siparisler', JSON.stringify(eski.slice(0, 20)))
      localStorage.setItem('wafflia_telefon', telefon)
    } catch (e) {}
    localStorage.setItem('wafflia_puan', String(yeniPuan))
    localStorage.setItem('wafflia_siparis', String(yeniSiparisSayisi))
    try { const ek = (user?.email || profilEmail || '').trim().toLowerCase(); if (ek) { localStorage.setItem('wafflia_puan_' + ek, String(yeniPuan)); localStorage.setItem('wafflia_siparis_' + ek, String(yeniSiparisSayisi)) } } catch (e) {}
    const waMesaj = encodeURIComponent('YENI SIPARIS - ' + adSoyad + ' - ' + telefon + ' - ' + adres + ' - Not: ' + (notlar || 'Yok') + ' - Odeme: ' + odemeYontemi + ' - ' + urunOzeti + ' - Ara Toplam: ' + araToplam + ' TL - Indirim: -' + (indirimTutari + puanIndirimi) + ' TL - ODENECEK: ' + odenecek + ' TL')
    setSonWaMesaj(waMesaj)
    // WhatsApp otomatik acilmiyor - mail Google'a gitti, isteyen butonla gonderir
    setHazirlanmaBaslangic(Date.now())
    setGonderiliyor(false)
    setSepet([])
    setOdemeAcik(false)
    setHazirlanmaBaslangic(Date.now())
    setGecenDakika(0)
    setGecenSaniye(0)
    setSiparisBannerKapali(false)
    setSiparisTamam(true)
    setPuanKullan(false)
  }
  const UrunKarti = ({ u }: { u: any }) => (
    <div style={{ background: 'white', borderRadius: '18px', padding: '0 0 12px', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 8px rgba(255,46,122,0.10)', overflow: 'hidden', border: '1px solid #F0EDE6' }}>
      <div onClick={() => urunAc(u)} style={{ width: '100%', height: '170px', background: renkFor(u.kat), position: 'relative', cursor: 'pointer', overflow: 'hidden' }}>
        {u.resim ? <img src={u.resim} alt={u.ad} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '56px' }}>{emojiFor(u.kat)}</div>}
        {u.populer ? <span style={{ position: 'absolute', top: '10px', left: '10px', background: '#FF7A00', color: '#FF2E7A', fontSize: '11px', padding: '4px 10px', borderRadius: '20px', fontWeight: '900' }}>ÇOK SATAN</span> : null}
      </div>
      <div style={{ padding: '12px 12px 0', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ color: '#8A8A8A', fontSize: '11px', fontWeight: '800', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{u.kat}</div>
        <div style={{ fontWeight: '800', fontSize: '15px', color: '#FF2E7A', lineHeight: '1.3', marginTop: '4px', cursor: 'pointer' }} onClick={() => urunAc(u)}>{u.ad}</div>
        <div style={{ color: '#777', fontSize: '12px', margin: '6px 0', lineHeight: '1.45', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{u.aciklama}</div>
        {u.begeni ? <div style={{ color: '#16a34a', fontSize: '12px', fontWeight: 'bold', margin: '2px 0' }}>👍 {u.begeni}</div> : <div style={{ height: '18px' }}></div>}
        <div style={{ marginTop: 'auto', paddingTop: '8px' }}><b style={{ fontSize: '18px', color: '#FF2E7A' }}>{u.fiyat.toLocaleString('tr-TR')},00 TL</b></div>
        <button onClick={(e) => { e.stopPropagation(); urunAc(u) }} style={{ marginTop: '10px', width: '100%', background: '#FF2E7A', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontSize: '14px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>🛒 Sepete Ekle</button>
      </div>
    </div>
  )
  return (
    <div style={{ fontFamily: 'sans-serif', background: '#FFF5F2', minHeight: '100vh', paddingBottom: '170px' }}>
      <div style={{ background: 'white', padding: '10px 12px 0', position: 'sticky', top: 0, zIndex: 40, boxShadow: '0 1px 8px rgba(255,46,122,0.10)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', maxWidth: '1200px', margin: '0 auto' }}>
          <button onClick={() => setMenuAcik(true)} style={{ background: 'none', border: 'none', fontSize: '26px', cursor: 'pointer', color: '#FF2E7A', padding: '4px' }}>☰</button>
          <div onClick={() => { setSayfa('anasayfa'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ background: '#FF2E7A', color: 'white', padding: '8px 10px', fontWeight: '900', fontSize: '15px', letterSpacing: '-0.3px', cursor: 'pointer', lineHeight: 1.15, textAlign: 'center', borderRadius: '6px', maxWidth: '170px' }}>WaffLia Sweet Kumpir</div>
          <div style={{ flex: 1 }}></div>
          {user ? <span style={{ fontSize: '12px', fontWeight: '800', color: '#FF2E7A' }}>Merhaba, {isim}</span> : null}
          <button onClick={() => { setSepetAcik(true) }} style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', fontSize: '26px', padding: '4px' }}>🛒{sepet.length > 0 ? <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#FF7A00', color: '#FF2E7A', fontSize: '11px', fontWeight: '900', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{sepet.length}</span> : null}</button>
        </div>
        <div style={{ maxWidth: '1200px', margin: '10px auto 0', paddingBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#FFF5F2', border: '1px solid #EDEBE6', borderRadius: '14px', padding: '10px 12px', gap: '8px' }}>
            <span style={{ fontSize: '18px', color: '#FF2E7A' }}>🔍</span>
            <input value={arama} onChange={(e) => { setArama(e.target.value); if (e.target.value) setSayfa('menu') }} placeholder="Ürün, kategori ara" style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: '15px', color: '#FF2E7A' }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '0 0 10px', maxWidth: '1200px', margin: '0 auto' }}>
          <button onClick={() => { setSayfa('menu'); setKat('Tümü') }} style={{ background: kat === 'Tümü' && sayfa === 'menu' ? '#FF7A00' : '#FFF5F2', color: '#FF2E7A', border: '1px solid #EDEBE6', padding: '8px 14px', borderRadius: '20px', fontWeight: '800', fontSize: '13px', whiteSpace: 'nowrap', cursor: 'pointer' }}>🍽️ Tümü</button>
          {KATS.slice(1).map((k) => (<button key={k} onClick={() => { setKat(k); setSayfa('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ background: kat === k && sayfa === 'menu' ? '#FF7A00' : '#FFF5F2', color: '#FF2E7A', border: '1px solid #EDEBE6', padding: '8px 14px', borderRadius: '20px', fontWeight: '800', fontSize: '13px', whiteSpace: 'nowrap', cursor: 'pointer' }}>{emojiFor(k)} {k}</button>))}
        </div>
      </div>
      {menuAcik ? (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 80 }} onClick={() => setMenuAcik(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: 'white', width: '85%', maxWidth: '340px', height: '100%', overflowY: 'auto', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ background: '#FF2E7A', color: 'white', padding: '10px 12px', fontWeight: '900', fontSize: '16px', borderRadius: '6px' }}>WaffLia Sweet Kumpir</div>
              <button onClick={() => setMenuAcik(false)} style={{ background: '#F1EFE9', border: 'none', width: '36px', height: '36px', borderRadius: '50%', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column' }}>
              {KATS.slice(1).map((k) => (
                <button key={k} onClick={() => { setKat(k); setSayfa('menu'); setMenuAcik(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'none', border: 'none', borderBottom: '1px solid #F1EFE9', padding: '16px 4px', fontSize: '16px', fontWeight: '700', color: '#FF2E7A', cursor: 'pointer', textAlign: 'left', width: '100%' }}><span style={{ background: '#FFF5F2', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>{emojiFor(k)}</span>{k}<span style={{ marginLeft: 'auto', color: '#FF2E7A' }}>›</span></button>
              ))}
              <button onClick={() => { setSayfa('profil'); setMenuAcik(false) }} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'none', border: 'none', borderBottom: '1px solid #F1EFE9', padding: '16px 4px', fontSize: '16px', fontWeight: '700', color: '#FF2E7A', cursor: 'pointer', textAlign: 'left', width: '100%' }}><span style={{ background: '#FFF5F2', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>👤</span>Hesabım<span style={{ marginLeft: 'auto' }}>›</span></button>
              <button onClick={() => { gecmisiGetir(); setMenuAcik(false) }} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'none', border: 'none', borderBottom: '1px solid #F1EFE9', padding: '16px 4px', fontSize: '16px', fontWeight: '700', color: '#FF2E7A', cursor: 'pointer', textAlign: 'left', width: '100%' }}><span style={{ background: '#FFF5F2', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>📦</span>Siparişlerim<span style={{ marginLeft: 'auto' }}>›</span></button>
            </div>
            <div style={{ marginTop: '20px', background: '#FF2E7A', borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
              <div style={{ color: '#FF7A00', fontWeight: '900', fontSize: '16px' }}>14:00 - 02:00 • İstanbul</div>
              <div style={{ color: 'white', fontSize: '13px', marginTop: '6px' }}>30-45 dk teslimat • 0535 273 28 65</div>
            </div>
          </div>
        </div>
      ) : null}
      <div style={{ background: '#FF2E7A', color: 'white', padding: '18px 16px 22px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontSize: '56px', lineHeight: '1.1' }}>🧇 🥔</div>
          <h1 style={{ fontSize: '30px', lineHeight: '1.15', margin: '10px 0', fontWeight: '900' }}>Ne canın çekiyor?</h1>
          <p style={{ color: '#FF7A00', fontSize: '14px', margin: '0 0 14px' }}>Menüden birini seç, ürünler gelsin. 14:00 - 02:00 • İstanbul</p>
          {user ? (
            <div style={{ background: 'white', color: '#FF2E7A', borderRadius: '14px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', textAlign: 'left' }}>Hoş geldin, <b>{isim}!</b> 👋 • ⭐ {puan} Puan {siparisSayisi > 0 ? '• ' + siparisSayisi + ' sipariş verdin' : '• Henüz siparişin yok'}</span>
              <button onClick={cikisYap} style={{ border: '1px solid #ddd', background: 'white', padding: '7px 12px', borderRadius: '20px', cursor: 'pointer', fontSize: '12px', whiteSpace: 'nowrap' }}>Çıkış Yap</button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button onClick={() => { setProfilModu('giris'); setSayfa('profil'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ background: '#FF7A00', color: '#FF2E7A', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: '900', fontSize: '15px', cursor: 'pointer' }}>Giriş Yap</button>
              <button onClick={() => { setProfilModu('kayit'); setSayfa('profil'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ background: 'white', color: '#FF2E7A', padding: '12px 24px', borderRadius: '12px', fontWeight: '900', fontSize: '15px', cursor: 'pointer', border: 'none' }}>Kayıt Ol</button>
            </div>
          )}
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 12px' }}>
        {sayfa === 'anasayfa' ? (
          <div>
            <div style={{ background: 'white', borderRadius: '16px', padding: '18px', marginTop: '20px', textAlign: 'center', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
              <h2 style={{ fontSize: '20px', margin: '0 0 4px' }}>🎡 Çarkıfelek</h2>
              {!user ? (
                <div>
                  <p style={{ color: '#e11d48', fontSize: '14px', fontWeight: 'bold', margin: '8px 0' }}>Çarkıfelek sadece üyelere</p>
                  <p style={{ color: '#666', fontSize: '13px', margin: '0 0 14px' }}>Çarkı çevirmek ve indirim kazanmak için giriş yap ya da üye ol.</p>
                  <div style={{ fontSize: '48px', opacity: 0.3 }}>🎡🔒</div>
                  <button onClick={() => { setProfilModu('giris'); setSayfa('profil'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ marginTop: '14px', background: '#FF2E7A', color: 'white', border: 'none', padding: '13px 28px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>Giriş Yap</button>
                  <button onClick={() => { setProfilModu('kayit'); setSayfa('profil'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ marginTop: '8px', background: 'white', color: '#FF2E7A', border: '1px solid #FF2E7A', padding: '12px 28px', borderRadius: '12px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>Üye Ol</button>
                </div>
              ) : (
                <div>
                  <p style={{ color: '#666', fontSize: '13px', margin: '0 0 14px' }}>Günde 1 kere çevir, ödülünü kazan. {carkBugunCevrildi ? 'Bugünkü hakkını kullandın, yarın tekrar dene.' : 'Bugünkü hakkın duruyor.'}</p>
                  <div style={{ width: '200px', height: '200px', margin: '0 auto', borderRadius: '50%', border: '6px solid #FF2E7A', overflow: 'hidden', transform: 'rotate(' + carkAci + 'deg)', transition: 'transform 1.8s ease-out', background: 'conic-gradient(#e11d48 0 45deg, #f59e0b 45deg 90deg, #16a34a 90deg 135deg, #FF2E7A 135deg 180deg, #e11d48 180deg 225deg, #f59e0b 225deg 270deg, #16a34a 270deg 315deg, #FF2E7A 315deg 360deg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: 'white', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: '900', transform: 'rotate(-' + carkAci + 'deg)' }}>🎡</div>
                  </div>
                  <div style={{ fontSize: '20px', marginTop: '8px' }}>▼</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', marginTop: '8px' }}>{CARK_ODULLER.map((o) => (<span key={o} style={{ background: '#FFF5F2', border: '1px solid #eee', padding: '5px 10px', borderRadius: '16px', fontSize: '12px', fontWeight: 'bold' }}>{o}</span>))}</div>
                  <button onClick={carkCevir} disabled={carkDonuyor || carkBugunCevrildi} style={{ marginTop: '14px', background: carkBugunCevrildi ? '#ddd' : '#e11d48', color: 'white', border: 'none', padding: '13px 28px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', cursor: carkBugunCevrildi ? 'not-allowed' : 'pointer' }}>{carkDonuyor ? 'Çark Dönüyor...' : carkBugunCevrildi ? 'Bugünkü Hakkın Bitti' : 'Çarkı Çevir'}</button>
                  {carkOdul ? <div style={{ marginTop: '12px', background: '#dcfce7', padding: '12px', borderRadius: '12px', fontWeight: 'bold', color: '#166534' }}>🎉 Kazandın: {carkOdul} {carkOdul.includes('İndirim') ? '• Sipariş notuna yazman yeterli.' : carkOdul.includes('Puan') ? '• Puanın siparişinde eklenecek.' : ''}</div> : null}
                </div>
              )}
            </div>
            <h2 id="urunler" style={{ fontSize: '24px', fontWeight: '900', color: '#FF2E7A', margin: '20px 4px 6px', scrollMarginTop: '120px' }}>{kat === 'Tümü' ? 'Tüm Ürünler' : kat} • {URUNLER.filter((u) => (kat === 'Tümü' || u.kat === kat) && (arama === '' || u.ad.toLowerCase().includes(arama.toLowerCase()) || u.aciklama.toLowerCase().includes(arama.toLowerCase()))).length} çeşit</h2>
            <p style={{ fontSize: '13px', color: '#666', margin: '0 4px 10px' }}>{kat === 'Tümü' ? 'Hepsi burada, saklı ürün yok. İstediğini seç, Sepete Ekle’ye bas, opsiyonlar açılacak.' : kat + ' menüsündesin. Başka menü için yukarıdan birine bas.'}</p>
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px' }}>{KATS.map((k) => (<button key={k} onClick={() => { setKat(k); const el = document.getElementById('urunler'); if (el) el.scrollIntoView({ behavior: 'smooth' }) }} style={{ padding: '9px 16px', borderRadius: '20px', border: kat === k ? '1px solid #FF2E7A' : '1px solid #ddd', background: kat === k ? '#FF2E7A' : 'white', color: kat === k ? 'white' : '#333', fontWeight: 'bold', fontSize: '13px', whiteSpace: 'nowrap', cursor: 'pointer' }}>{k}</button>))}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '14px' }}>{URUNLER.filter((u) => (kat === 'Tümü' || u.kat === kat) && (arama === '' || u.ad.toLowerCase().includes(arama.toLowerCase()) || u.aciklama.toLowerCase().includes(arama.toLowerCase()))).map((u) => <UrunKarti key={u.id} u={u} />)}</div>
          </div>
        ) : null}
        {sayfa === 'menu' ? (
          <div>
            <button onClick={() => { setSayfa('anasayfa'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ background: 'white', border: '1px solid #ddd', padding: '9px 14px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', margin: '20px 0 6px' }}>← Tüm Menüler</button>
            <h2 style={{ fontSize: '22px', margin: '8px 4px 10px' }}>{kat === 'Tümü' ? 'Tüm Menü' : kat}</h2>

            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', whiteSpace: 'nowrap', paddingBottom: '6px' }}>
              {KATS.map((k) => (<button key={k} onClick={() => setKat(k)} style={{ padding: '9px 16px', borderRadius: '20px', border: kat === k ? '1px solid #FF2E7A' : '1px solid #ddd', background: kat === k ? '#FF2E7A' : 'white', color: kat === k ? 'white' : '#333', cursor: 'pointer', fontWeight: kat === k ? 'bold' : 'normal', flexShrink: 0 }}>{k}</button>))}
            </div>
            {gosterilecekKats.map((k) => {
              const liste = aramali.filter((u) => u.kat === k)
              if (liste.length === 0) return null
              return (
                <div key={k}>
                  <h3 style={{ fontSize: '18px', margin: '18px 4px 10px' }}>{k} <span style={{ color: '#999', fontSize: '13px', fontWeight: 'normal' }}>{liste.length} ürün</span></h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '14px' }}>{liste.map((u) => <UrunKarti key={u.id} u={u} />)}</div>
                </div>
              )
            })}
          </div>
        ) : null}
                {sayfa === 'profil' ? (
          <div style={{ background: 'white', borderRadius: '16px', padding: '18px', marginTop: '20px' }}>
            <h2 style={{ fontSize: '22px', margin: '0 0 6px' }}>Hesabım</h2>
            {user ? (
              <div>
                <p style={{ color: '#333', fontSize: '15px' }}>Hoş geldin, <b>{isim}!</b> 👋<br />⭐ <b>{puan} Puan</b> • <b>{siparisSayisi} sipariş</b> verdin</p>
                <div style={{ background: '#FFF5F2', border: '1px solid #FFE4EC', borderRadius: '14px', padding: '14px', margin: '12px 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #FFE4EC' }}><span style={{ color: '#888', fontSize: '13px' }}>Ad Soyad</span><b style={{ fontSize: '14px', textAlign: 'right' }}>{isim || '-'}</b></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #FFE4EC' }}><span style={{ color: '#888', fontSize: '13px' }}>E-posta</span><b style={{ fontSize: '13px', textAlign: 'right', wordBreak: 'break-all' }}>{user?.email || profilEmail || '-'}</b></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #FFE4EC' }}><span style={{ color: '#888', fontSize: '13px' }}>Telefon</span><b style={{ fontSize: '14px' }}>{user?.user_metadata?.telefon || telefon || profilTelefon || gecmisSiparisler[0]?.telefon || '-'}</b></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}><span style={{ color: '#888', fontSize: '13px' }}>Adres</span><b style={{ fontSize: '13px', textAlign: 'right', maxWidth: '65%' }}>{gecmisSiparisler[0]?.adres || adres || 'Henüz adres eklenmemiş - ilk siparişinde eklenecek'}</b></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '16px 0 8px' }}><h3 style={{ margin: 0, fontSize: '17px' }}>Siparişlerim</h3><button onClick={() => gecmisiGetir(false)} style={{ background: 'white', border: '1px solid #ddd', padding: '7px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>↻ Yenile</button></div>
                {gecmisYukleniyor ? <div style={{ background: '#FFFBEB', padding: '10px', borderRadius: '10px', fontSize: '13px', fontWeight: 'bold', color: '#92400E', marginBottom: '10px' }}>⏳ Siparişler yükleniyor...</div> : null}
                {gecmisSiparisler.length === 0 && !gecmisYukleniyor ? <div style={{ textAlign: 'center', padding: '18px 0', color: '#888', background: '#F9F9F9', borderRadius: '12px', fontSize: '13px' }}>Henüz siparişin yok.<br />İlk siparişini verince burada görünecek.</div> : gecmisSiparisler.map((s: any, i: number) => (
                  <div key={i} style={{ border: '1px solid #eee', borderRadius: '14px', padding: '12px', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '13px' }}><span>{s.tarih}</span><span>{s.odenecek} TL</span></div>
                    <div style={{ fontSize: '13px', color: '#555', marginTop: '6px', whiteSpace: 'pre-line' }}>{s.urunler}</div>
                    <div style={{ fontSize: '12px', color: '#888', marginTop: '6px' }}>{s.odeme} • +{s.puan} puan • {s.adres}</div>
                  </div>
                ))}
                <button onClick={cikisYap} style={{ width: '100%', background: 'white', border: '1px solid #ddd', padding: '13px', borderRadius: '12px', cursor: 'pointer', marginBottom: '8px', marginTop: '12px' }}>Çıkış Yap</button>
                <button onClick={() => setHesapSilAcik(true)} style={{ width: '100%', background: '#fef2f2', border: '1px solid #fecaca', color: '#e11d48', padding: '13px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Hesabımı Sil</button>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <button onClick={() => setProfilModu('giris')} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', background: profilModu === 'giris' ? '#FF2E7A' : '#eee', color: profilModu === 'giris' ? 'white' : '#333', fontWeight: 'bold', cursor: 'pointer' }}>Giriş Yap</button>
                  <button onClick={() => setProfilModu('kayit')} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', background: profilModu === 'kayit' ? '#FF2E7A' : '#eee', color: profilModu === 'kayit' ? 'white' : '#333', fontWeight: 'bold', cursor: 'pointer' }}>Kayıt Ol</button>
                </div>
                {profilModu === 'kayit' ? (<div><label style={{ fontSize: '13px', fontWeight: 'bold' }}>Ad Soyad</label>
                <input value={profilAd} onChange={(e) => setProfilAd(e.target.value)} placeholder="Adın Soyadın - örn: Haktan Başalan" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', margin: '6px 0 12px', boxSizing: 'border-box' }} /></div>) : null}
                <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Telefon</label>
                <input value={profilTelefon} onChange={(e) => setProfilTelefon(e.target.value)} placeholder="Telefonun - örn: 0535 273 28 65" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', margin: '6px 0 12px', boxSizing: 'border-box' }} />
                <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Şifre</label>
                <input type="password" value={profilSifre} onChange={(e) => setProfilSifre(e.target.value)} placeholder="Şifreni yaz" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', margin: '6px 0 12px', boxSizing: 'border-box' }} />
                {true ? (<div><label style={{ fontSize: '13px', fontWeight: 'bold' }}>E-posta *</label><input value={profilEmail} onChange={(e) => setProfilEmail(e.target.value)} placeholder="mail@ornek.com" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', margin: '6px 0 12px', boxSizing: 'border-box' }} /></div>) : null}
                {profilModu === 'giris' ? <button onClick={girisYapForm} style={{ width: '100%', background: '#FF2E7A', color: 'white', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Giriş Yap</button> : <button onClick={kayitOl} style={{ width: '100%', background: '#FF2E7A', color: 'white', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Kayıt Ol</button>}
                <button onClick={() => setHesapSilAcik(true)} style={{ width: '100%', background: '#fef2f2', border: '1px solid #fecaca', color: '#e11d48', padding: '13px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px' }}>Hesabımı Sil</button>
                <p style={{ fontSize: '12px', color: '#888', textAlign: 'center', marginTop: '10px' }}>Bilgilerin güvenle saklanır, tarayıcıyı silsen bile hesabın durur.</p>
              </div>
            )}
          </div>
        ) : null}
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px', overflowX: 'auto' }}>
          <div onClick={() => { if (!user) { setProfilModu('kayit'); setSayfa('profil'); window.scrollTo({ top: 0, behavior: 'smooth' }) } }} style={{ background: '#e11d48', color: 'white', borderRadius: '16px', padding: '14px', minWidth: '220px', flex: 1, cursor: !user ? 'pointer' : 'default' }}><div style={{ fontSize: '22px', fontWeight: '900' }}>%25 İNDİRİM</div><div style={{ fontSize: '13px', marginTop: '4px' }}>{!user ? 'Sadece üyelere! Üye ol, ilk siparişinde %25 indirim kazan. Üye olmadan indirim yok.' : '1. Siparişine özel! İlk siparişinde %25 indirim sepette uygulanır.'}</div></div>
          <div onClick={() => { if (!user) { setProfilModu('kayit'); setSayfa('profil'); window.scrollTo({ top: 0, behavior: 'smooth' }) } }} style={{ background: '#FF2E7A', color: 'white', borderRadius: '16px', padding: '14px', minWidth: '220px', flex: 1, cursor: !user ? 'pointer' : 'default' }}><div style={{ fontSize: '22px', fontWeight: '900' }}>%40 İNDİRİM</div><div style={{ fontSize: '13px', marginTop: '4px' }}>{!user ? 'Sadece üyelere! 5. siparişinde %40 indirim sadece üyelere.' : '5. Siparişine özel! 5. siparişinde %40 indirim sepette uygulanır.'}</div></div>
          <div style={{ background: '#f59e0b', color: 'white', borderRadius: '16px', padding: '14px', minWidth: '220px', flex: 1 }}><div style={{ fontSize: '22px', fontWeight: '900' }}>150 PUAN = 400 TL</div><div style={{ fontSize: '13px', marginTop: '4px' }}>Her sipariş 10 puan. 150 puana ulaşınca 400 TL indirim kazan!</div></div>
        </div>
        {siparisTamam && !siparisBannerKapali && (
          <div style={{ background: '#dcfce7', border: '2px solid #16a34a', borderRadius: '16px', padding: '14px', marginTop: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <b style={{ fontSize: '15px' }}>🍳 Siparişin Hazırlanıyor</b>
              <button onClick={() => setSiparisBannerKapali(true)} style={{ border: 'none', background: 'transparent', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ fontSize: '13px', marginTop: '6px', lineHeight: '1.6' }}>Geçen süre: <b>{gecenDakika} dk {gecenSaniye} sn</b> • Tahmini teslim: <b>30-45 dk</b> • Tahmini varış: <b>{new Date(hazirlanmaBaslangic + 40 * 60000).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</b><br />Siparişin mutfağa düştü, hazırlanıyor.</div>
            <button onClick={() => gecmisiGetir()} style={{ marginTop: '10px', background: '#16a34a', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>Siparişlerimi Gör</button>
          </div>
        )}
        <div style={{ background: 'white', borderRadius: '14px', padding: '12px', marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', fontSize: '13px' }}>
          <span style={{ fontWeight: 'bold' }}>⭐ Puanın: {puan} / 150</span>
          <span style={{ background: '#fef3c7', padding: '5px 10px', borderRadius: '12px' }}>{!user ? 'Giriş yapmadın, indirim uygulanmıyor • Sadece +10 puan kazanacaksın' : 'Bu senin ' + siparisNo + '. siparişin ' + (indirimOrani > 0 ? '• %' + (indirimOrani * 100) + ' indirim uygulanacak' : '')}</span>
          {user && puan >= 150 ? <label style={{ cursor: 'pointer', fontWeight: 'bold', color: '#16a34a' }}><input type="checkbox" checked={puanKullan} onChange={(e) => setPuanKullan(e.target.checked)} /> 400 TL puan indirimi kullan</label> : <span style={{ color: '#888' }}>150 puana {150 - puan} puan kaldı</span>}
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
            { id: 'kargo', baslik: '🛵 Teslimat & Çalışma Saatleri', icerik: 'Her gün 14:00 - 02:00 arası açığız. Ortalama teslimat 30-45 dakikadır.' },
            { id: 'iletisim', baslik: '📞 İletişim', icerik: 'Telefon / WhatsApp: 0535 273 28 65 • İstanbul • Instagram: @wafflia • Her gün 14:00 - 02:00' },
          ].map((b) => (
            <div key={b.id} style={{ borderBottom: '1px solid #eee' }}>
              <button onClick={() => setFooterAcik(footerAcik === b.id ? '' : b.id)} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '12px 0', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>{b.baslik} <span>{footerAcik === b.id ? '▲' : '▼'}</span></button>
              {footerAcik === b.id ? <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.6', margin: '0 0 12px' }}>{b.icerik}</p> : null}
            </div>
          ))}
          <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #eee', textAlign: 'center' }}>
            <button onClick={() => setHesapSilAcik(true)} style={{ width: '100%', background: '#fef2f2', border: '1px solid #fecaca', color: '#e11d48', padding: '13px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Hesabımı Sil</button>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#16a34a', marginTop: '12px' }}>🔒 SSL ile Güvenli Bağlantı • Bilgileriniz şifrelenerek iletilir</div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '6px' }}>💳 Kapıda Nakit • 💳 Kapıda Kredi Kartı • Fiyatlara KDV dahildir</div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '6px' }}>WaffLia Sweet Kumpir • İstanbul • Telefon / WhatsApp: 0535 273 28 65 • Instagram: @wafflia</div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '6px' }}>Her gün 14:00 - 02:00 • Ortalama teslimat 30-45 dakika</div>
          </div>
          <p style={{ fontSize: '11px', color: '#999', marginTop: '12px', textAlign: 'center' }}>© 2026 WaffLia Sweet Kumpir • Tüm hakları saklıdır • Fiyatlara KDV dahildir</p>
        </div>
      </div>
            <a href="https://wa.me/905352732865?text=Merhaba%2C%20sipari%C5%9F%20vermek%20istiyorum" target="_blank" rel="noopener noreferrer" style={{ position: 'fixed', right: '16px', bottom: '92px', zIndex: 30, background: '#25D366', color: 'white', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', textDecoration: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }} aria-label="WhatsApp ile sipariş ver">💬</a>
            {hesapSilAcik && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 70, padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '24px', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
            <div style={{ fontSize: '50px' }}>⚠️</div>
            <h2 style={{ margin: '10px 0' }}>{!user ? 'Hesabın yok' : 'Hesabını silmek istiyor musun?'}</h2>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>{!user ? 'Giriş yapmadın, silinecek bir hesabın yok. Önce giriş yap.' : 'Hesabın ve puanların silinecek. Bu işlem geri alınamaz. Emin misin?'}</p>
            <button onClick={hesabiSil} style={{ width: '100%', marginTop: '12px', background: '#e11d48', color: 'white', border: 'none', padding: '13px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>{!user ? 'Giriş Yap' : 'Evet, Hesabımı Sil'}</button>
            <button onClick={() => setHesapSilAcik(false)} style={{ width: '100%', marginTop: '8px', background: 'white', border: '1px solid #ddd', padding: '13px', borderRadius: '12px', cursor: 'pointer' }}>Vazgeç</button>
          </div>
        </div>
      )}
      {hesapSilindi && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 70, padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '24px', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
            <div style={{ fontSize: '50px' }}>✅</div>
            <h2 style={{ margin: '10px 0' }}>Hesabın Silindi</h2>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>Hesabın ve kayıtlı verilerin silindi. Tekrar görüşmek üzere.</p>
            <button onClick={() => setHesapSilindi(false)} style={{ width: '100%', marginTop: '12px', background: '#FF2E7A', color: 'white', border: 'none', padding: '13px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Tamam</button>
          </div>
        </div>
      )}
            {gecmisAcik && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 70 }}>
          <div style={{ background: 'white', width: '100%', maxWidth: '600px', maxHeight: '88vh', overflowY: 'auto', borderRadius: '20px 20px 0 0', padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><h2 style={{ margin: 0 }}>Siparişlerim</h2><button onClick={() => setGecmisAcik(false)} style={{ border: 'none', background: '#eee', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer' }}>✕</button></div>
            <p style={{ fontSize: '13px', color: '#666' }}>{user ? isim + ' hesabının geçmiş siparişleri' : 'Geçmiş siparişlerin bu telefonda saklanıyor.'}</p>
            {gecmisYukleniyor ? <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', padding: '8px 12px', borderRadius: '10px', fontSize: '13px', fontWeight: 'bold', color: '#92400E', marginBottom: '10px' }}>⏳ Siparişler güncelleniyor...</div> : null}
            {gecmisSiparisler.length === 0 && !gecmisYukleniyor ? (
              <div style={{ textAlign: 'center', padding: '30px 0', color: '#888' }}>Henüz siparişin yok.<br />İlk siparişini verince burada görünecek.</div>
            ) : gecmisSiparisler.map((s: any, i: number) => (
              <div key={i} style={{ border: '1px solid #eee', borderRadius: '14px', padding: '12px', marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}><span>{s.tarih}</span><span>{s.odenecek} TL</span></div>
                <div style={{ fontSize: '13px', color: '#555', marginTop: '6px', whiteSpace: 'pre-line' }}>{s.urunler}</div>
                <div style={{ fontSize: '12px', color: '#888', marginTop: '6px' }}>{s.odeme} • +{s.puan} puan • {s.adres}</div>
              </div>
            ))}
          </div>
        </div>
      )}
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
                <button onClick={() => setModalAdet(modalAdet + 1)} style={{ width: '36px', height: '36px', borderRadius: '50%', border: 'none', background: '#FF2E7A', color: 'white', fontSize: '20px', cursor: 'pointer' }}>+</button>
              </div>
              <b style={{ fontSize: '18px' }}>{modalToplam.toFixed(2)} TL</b>
            </div>
            <button onClick={modalSepeteEkle} style={{ width: '100%', marginTop: '14px', background: '#FF2E7A', color: 'white', border: 'none', padding: '14px', borderRadius: '14px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Sepete Ekle • {modalToplam.toFixed(2)} TL</button>
          </div>
        </div>
      )}
      {true && (
        <div style={{ position: 'fixed', left: 0, right: 0, bottom: '68px', padding: '0 12px', zIndex: 30 }}>
          <button onClick={() => setSepetAcik(!sepetAcik)} style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FF2E7A', color: 'white', border: 'none', padding: '14px 18px', borderRadius: '16px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.25)' }}>
            <span>{sepet.length > 0 ? '🛒 Sepeti Görüntüle • ' + sepet.length + ' ürün' : '🛒 Sepet • Henüz ürün yok'}</span>
            <span>{odenecek.toFixed(2)} TL →</span>
          </button>
          {sepetAcik && (
            <div style={{ maxWidth: '1200px', margin: '8px auto 0', background: 'white', borderRadius: '16px', padding: '14px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', color: '#333', maxHeight: '60vh', overflowY: 'auto' }}>
              {sepet.length === 0 ? <p style={{ textAlign: 'center', color: '#888', padding: '12px 0' }}>Sepetin boş, menüden ürün ekle</p> : null}
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
                {!user ? <div style={{ display: 'flex', justifyContent: 'space-between', color: '#e11d48', fontWeight: 'bold', fontSize: '13px' }}><span>İndirim (Üye değilsin)</span><span>0 TL</span></div> : null}
                {indirimTutari > 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a', fontWeight: 'bold' }}><span>{siparisNo}. Sipariş İndirimi (%{indirimOrani * 100})</span><span>-{indirimTutari} TL</span></div> : null}
                {puanIndirimi > 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a', fontWeight: 'bold' }}><span>150 Puan İndirimi</span><span>-{puanIndirimi} TL</span></div> : null}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '16px', borderTop: '1px solid #eee', paddingTop: '8px' }}><span>Ödenecek</span><span>{odenecek.toFixed(2)} TL</span></div>
                <div style={{ fontSize: '12px', color: '#888', textAlign: 'center', marginTop: '4px' }}>Bu siparişten +10 puan kazanacaksın ⭐</div>
              </div>
              {odenecek < 200 ? <div style={{ marginTop: '12px', background: '#FFF1F2', border: '1px solid #FECDD3', padding: '10px', borderRadius: '10px', fontSize: '13px', fontWeight: 'bold', color: '#BE123C', textAlign: 'center' }}>Minimum sipariş 200 TL • {sepet.length === 0 ? 'Sepetin boş' : (200 - odenecek).toFixed(0) + ' TL daha eklemen lazım'}</div> : null}
              <button onClick={() => { if (sepet.length === 0) { alert('Sepetin boş, önce ürün ekle'); return } if (odenecek < 200) { alert('Minimum sipariş tutarı 200 TL. ' + (200 - odenecek).toFixed(0) + ' TL daha ekle'); return } setSepetAcik(false); setOdemeAcik(true) }} style={{ marginTop: '12px', width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: odenecek < 200 ? '#FDA4AF' : '#16a34a', color: 'white', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>{sepet.length === 0 ? 'Sepetin Boş • Ürün Ekle' : odenecek < 200 ? 'Min 200 TL • ' + (200 - odenecek).toFixed(0) + ' TL Kaldı' : 'Siparişi Tamamla • ' + odenecek.toFixed(2) + ' TL →'}</button>
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
            <input value={telefon} onChange={(e) => setTelefon(e.target.value)} placeholder="Telefonun - örn: 0535 273 28 65" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', margin: '6px 0 12px', boxSizing: 'border-box' }} />
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
            <p style={{ fontSize: '11px', color: '#999', textAlign: 'center', marginTop: '8px' }}>Onaylayınca siparişin bize hemen ulaşır.</p>
          </div>
        </div>
      )}
      {siparisTamam && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 70, padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '24px', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
            <div style={{ fontSize: '50px' }}>✅</div>
            <h2 style={{ margin: '10px 0' }}>Siparişiniz Hazırlanıyor...</h2>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>Teşekkürler! Siparişin mutfağa düştü, hazırlanıyor.<br />Geçen süre: <b>{gecenDakika} dk {gecenSaniye} sn</b><br />Tahmini teslimat: <b>30-45 dakika</b><br />+10 puan kazandın ⭐<br />Toplam puanın: <b>{puan}</b></p>
            <button onClick={() => { if (sonWaMesaj) window.open('https://wa.me/905352732865?text=' + sonWaMesaj, '_blank') }} style={{ width: '100%', marginTop: '12px', background: '#25D366', color: 'white', border: 'none', padding: '13px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>💬 WhatsApp ile de Gönder (İstersen)</button>
            <button onClick={() => setSiparisTamam(false)} style={{ width: '100%', marginTop: '8px', background: '#FF2E7A', color: 'white', border: 'none', padding: '13px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Tamam - Siparişimi Takip Et</button>
          </div>
        </div>
      )}
      <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, background: 'white', borderTop: '1px solid #EDEBE6', display: 'flex', justifyContent: 'space-around', padding: '8px 4px 12px', zIndex: 20 }}>
        <button onClick={() => { setSayfa('anasayfa'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ background: sayfa === 'anasayfa' ? '#F1EFE9' : 'none', border: 'none', cursor: 'pointer', textAlign: 'center', color: '#FF2E7A', fontSize: '12px', fontWeight: sayfa === 'anasayfa' ? '800' : '500', borderRadius: '12px', padding: '6px 10px' }}><div style={{ fontSize: '22px' }}>🏠</div>Anasayfa</button>
        <button onClick={() => { setSayfa('menu'); setKat('Tümü'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ background: sayfa === 'menu' ? '#F1EFE9' : 'none', border: 'none', cursor: 'pointer', textAlign: 'center', color: '#FF2E7A', fontSize: '12px', fontWeight: sayfa === 'menu' ? '800' : '500', borderRadius: '12px', padding: '6px 10px' }}><div style={{ fontSize: '22px' }}>☰</div>Kategoriler</button>
        <button onClick={() => gecmisiGetir()} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'center', color: '#FF2E7A', fontSize: '12px', fontWeight: '500', borderRadius: '12px', padding: '6px 10px' }}><div style={{ fontSize: '22px' }}>📦</div>Siparişler</button>
        <button onClick={() => { setSayfa('profil'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ background: sayfa === 'profil' ? '#F1EFE9' : 'none', border: 'none', cursor: 'pointer', textAlign: 'center', color: '#FF2E7A', fontSize: '12px', fontWeight: sayfa === 'profil' ? '800' : '500', borderRadius: '12px', padding: '6px 10px' }}><div style={{ fontSize: '22px' }}>👤</div>Hesabım</button>
        <button onClick={() => { setSepetAcik(true) }} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'center', color: '#FF2E7A', fontSize: '12px', fontWeight: '500', borderRadius: '12px', padding: '6px 10px', position: 'relative' }}><div style={{ fontSize: '22px' }}>🛒</div>Sepet{sepet.length > 0 ? <span style={{ position: 'absolute', top: '-2px', right: '6px', background: '#FF7A00', color: '#FF2E7A', fontSize: '10px', fontWeight: '900', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{sepet.length}</span> : null}</button>
      </div>
    </div>
  )
}
