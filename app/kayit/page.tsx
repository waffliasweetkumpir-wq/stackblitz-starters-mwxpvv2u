'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function Kayit() {
  const [adSoyad, setAdSoyad] = useState('')
  const [telefon, setTelefon] = useState('')
  const [dogumGunu, setDogumGunu] = useState('')
  const [email, setEmail] = useState('')
  const [kod, setKod] = useState('')
  const [kodGonderildi, setKodGonderildi] = useState(false)
  const [girisYapildi, setGirisYapildi] = useState(false)
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setGirisYapildi(true)
    })
  }, [])
  async function kodGonder() {
    const yas = new Date().getFullYear() - new Date(dogumGunu).getFullYear()
    if (yas < 18) return alert('18 yaşından küçükler kayıt olamaz')
    if (!adSoyad || !telefon || !dogumGunu || !email) {
      return alert('Lütfen tüm alanları doldur')
    }
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: window.location.origin + '/kayit',
        data: {
          full_name: adSoyad,
          phone: telefon,
          birth_date: dogumGunu
        }
      }
    })
    if (error) alert(error.message)
    else {
      setKodGonderildi(true)
      alert('E-postana onay kodu gönderdik!')
    }
  }

  async function koduDogrula() {
    const { data, error } = await supabase.auth.verifyOtp({
      email: email,
      token: kod,
      type: 'email'
    })
    if (error) alert('Kod yanlış!')
    else {
      alert('Hoş geldin ' + data.user.user_metadata.full_name)
      window.location.href = '/'
    }
  }
  if (girisYapildi) {
    return <div>Giriş Yapıldı</div>
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2">Wafflia</h1>
        <p className="text-center text-gray-500 mb-6">Aramıza katıl</p>
        {!kodGonderildi ? (
          <div className="space-y-4">
            <input placeholder="Ad Soyad" value={adSoyad} onChange={e => setAdSoyad(e.target.value)} className="w-full border p-3 rounded-xl" />
            <input placeholder="Telefon - örn: +90 532 123 45 67" value={telefon} onChange={e => setTelefon(e.target.value)} className="w-full border p-3 rounded-xl" />
            <div>
              <label className="text-sm text-gray-500">Doğum Günü</label>
              <input type="date" value={dogumGunu} onChange={e => setDogumGunu(e.target.value)} className="w-full border p-3 rounded-xl" />
            </div>
            <input placeholder="E-posta" type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-3 rounded-xl" />
            <button onClick={kodGonder} className="w-full bg-black text-white p-3 rounded-xl font-bold">Onay Kodu Gönder</button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-center">{email} adresine kod gönderdik</p>
            <input placeholder="6 haneli kod" value={kod} onChange={e => setKod(e.target.value)} className="w-full border p-3 rounded-xl text-center text-2xl tracking-widest" />
            <button onClick={koduDogrula} className="w-full bg-black text-white p-3 rounded-xl font-bold">Doğrula ve Giriş Yap</button>
          </div>
        )}
      </div>
    </div>
  )
}