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
  { id: 22, kat: 'Kumpir', ad: '0-1 Malzemeli Kumpir', fiyat: 220, aciklama: 'Sade, az malzemeli kumpir.' },
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
