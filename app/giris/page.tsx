'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Giris() {
  const [email, setEmail] = useState('')
  const [kod, setKod] = useState('')
  
  const [kodGonderildi, setKodGonderildi] = useState(false)

  async function kodGonder() {
    await supabase.auth.signInWithOtp({ email })
    setKodGonderildi(true)
  }

  async function koduDogrula() {
    const { error } = await supabase.auth.verifyOtp({
      email, token: kod, type: 'email'
    })
    if (!error) window.location.href = '/'
    else alert('Kod yanlış!')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4">
 <h1 className="text-3xl font-bold text-center">Wafflia&rsquo;ya Giriş</h1>
        {!kodGonderildi ? (
          <>
            <input placeholder="E-posta" value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-3 rounded-xl" />
            <button onClick={kodGonder} className="w-full bg-black text-white p-3 rounded-xl">Kod Gönder</button>
          </>
        ) : (
          <>
            <input placeholder="Kodu gir" value={kod} onChange={e => setKod(e.target.value)} className="w-full border p-3 rounded-xl text-center" />
            <button onClick={koduDogrula} className="w-full bg-black text-white p-3 rounded-xl">Giriş Yap</button>
          </>
        )}
      </div>
    </div>
  )
}