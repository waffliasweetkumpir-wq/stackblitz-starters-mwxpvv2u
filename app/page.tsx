"use client";
import { useState, useEffect, useMemo } from "react";

type Urun = {
  id: number;
  kat: string;
  ad: string;
  fiyat: number;
  populer?: boolean;
  resim: string;
  aciklama: string;
  malzemeler?: string[];
  kumpirLimit?: number;
};

const WAFFLE_MALZEMELER = [
  "Beyaz Damla Çikolata",
  "Çakıl Taşı",
  "Bonibon",
  " Oreo Tozu",
  "Çilek",
  "Antep Fıstığı",
  "Sütlü Çikolata Sosu",
  "Muz",
  "Antep Fıstıklı Sosu",
  "Lotus Tozu",
  "Beyaz Sos",
];

const KUMPIR_MALZEMELER = [
  "Amerikan Salatası",
  "Mısır",
  "Sosis",
  "Turşu",
  "Yeşil Zeytin",
  "Siyah Zeytin",
  "Haydari",
  "Kapya Biber",
  "Jalapeno Biber",
  "Mor Lahana",
  "Ezme",
];

const URUNLER: Urun[] = [
  {
    id: 1,
    kat: "Bowl Waffle",
    ad: "Bitter Bowl",
    fiyat: 350,
    populer: true,
    resim: "/public/urunler/bitter-bowl.jpg",
    aciklama: "Bitter çikolata soslu bowl waffle.",
    malzemeler: WAFFLE_MALZEMELER,
  },
  {
    id: 2,
    kat: "Bowl Waffle",
    ad: "Choco Madness Bowl",
    fiyat: 345,
    populer: true,
    resim: "/public/urunler/choco-bowl.jpg",
    aciklama: "Bol çikolatalı bowl waffle.",
    malzemeler: WAFFLE_MALZEMELER,
  },
  {
    id: 3,
    kat: "Bowl Waffle",
    ad: "Pistachio Dream Bowl",
    fiyat: 370,
    populer: true,
    resim: "/public/urunler/pistachio-bowl.jpg",
    aciklama: "Antep fıstıklı bowl waffle.",
    malzemeler: WAFFLE_MALZEMELER,
  },
  {
    id: 4,
    kat: "Bowl Waffle",
    ad: "Blast Bowl",
    fiyat: 320,
    resim: "/public/urunler/blast-bowl.jpg",
    aciklama: "Blast bowl waffle.",
    malzemeler: WAFFLE_MALZEMELER,
  },
  {
    id: 5,
    kat: "Bowl Waffle",
    ad: "Lotus Bomb Bowl Waffle",
    fiyat: 340,
    populer: true,
    resim: "/public/urunler/lotus-bowl.jpg",
    aciklama: "Lotus soslu bowl waffle.",
    malzemeler: WAFFLE_MALZEMELER,
  },
  {
    id: 6,
    kat: "Bowl Waffle",
    ad: "Ultimate Bowl Waffle",
    fiyat: 370,
    populer: true,
    resim: "/public/urunler/ultimate-bowl.jpg",
    aciklama: "Karışık ultimate bowl.",
    malzemeler: WAFFLE_MALZEMELER,
  },
  {
    id: 7,
    kat: "Bowl Waffle",
    ad: "Milk Chocolate Bowl",
    fiyat: 350,
    resim: "/public/urunler/milk-bowl.jpg",
    aciklama: "Sütlü çikolatalı bowl.",
    malzemeler: WAFFLE_MALZEMELER,
  },
  {
    id: 8,
    kat: "Bowl Waffle",
    ad: "Strawberry Bowl",
    fiyat: 325,
    resim: "/public/urunler/strawberry-bowl.jpg",
    aciklama: "Çilekli bowl waffle.",
    malzemeler: WAFFLE_MALZEMELER,
  },
  {
    id: 9,
    kat: "Bowl Waffle",
    ad: "Coconut Bowl",
    fiyat: 315,
    populer: true,
    resim: "/public/urunler/coconut-bowl.jpg",
    aciklama: "Nefis waffle hamuru, hindistan cevizi sosu ve sütlü çikolata sosuyla buluşuyor.",
    malzemeler: WAFFLE_MALZEMELER,
  },
  {
    id: 10,
    kat: "Kare Waffle",
    ad: "Bitter Kare",
    fiyat: 350,
    resim: "/public/urunler/bitter-kare.jpg",
    aciklama: "Bitter çikolatalı kare waffle.",
    malzemeler: WAFFLE_MALZEMELER,
  },
  {
    id: 11,
    kat: "Kare Waffle",
    ad: "Choco Madness Kare",
    fiyat: 345,
    resim: "/public/urunler/choco-kare.jpg",
    aciklama: "Bol çikolatalı kare waffle.",
    malzemeler: WAFFLE_MALZEMELER,
  },
  {
    id: 12,
    kat: "Kare Waffle",
    ad: "Pistachio Dream Kare",
    fiyat: 370,
    resim: "/public/urunler/pistachio-kare.jpg",
    aciklama: "Antep fıstıklı kare waffle.",
    malzemeler: WAFFLE_MALZEMELER,
  },
  {
    id: 13,
    kat: "Kare Waffle",
    ad: "Blast Kare",
    fiyat: 320,
    resim: "/public/urunler/blast-kare.jpg",
    aciklama: "Blast kare waffle.",
    malzemeler: WAFFLE_MALZEMELER,
  },
  {
    id: 14,
    kat: "Kare Waffle",
    ad: "Lotus Bomb Kare",
    fiyat: 340,
    resim: "/public/urunler/lotus-kare.jpg",
    aciklama: "Lotus soslu kare waffle.",
    malzemeler: WAFFLE_MALZEMELER,
  },
  {
    id: 15,
    kat: "Kare Waffle",
    ad: "Ultimate Kare",
    fiyat: 370,
    resim: "/public/urunler/ultimate-kare.jpg",
    aciklama: "Karışık ultimate kare.",
    malzemeler: WAFFLE_MALZEMELER,
  },
  {
    id: 16,
    kat: "Kare Waffle",
    ad: "Milk Kare",
    fiyat: 350,
    resim: "/public/urunler/milk-kare.jpg",
    aciklama: "Sütlü çikolatalı kare.",
    malzemeler: WAFFLE_MALZEMELER,
  },
  {
    id: 17,
    kat: "Kare Waffle",
    ad: "Strawberry Kare",
    fiyat: 325,
    resim: "/public/urunler/strawberry-kare.jpg",
    aciklama: "Çilekli kare waffle.",
    malzemeler: WAFFLE_MALZEMELER,
  },
  {
    id: 18,
    kat: "Kare Waffle",
    ad: "Coconut Kare",
    fiyat: 315,
    resim: "/public/urunler/coconut-kare.jpg",
    aciklama: "Hindistan cevizli kare waffle.",
    malzemeler: WAFFLE_MALZEMELER,
  },
  {
    id: 19,
    kat: "Kumpir",
    ad: "0-1 Malzemeli Kumpir",
    fiyat: 340,
    resim: "/public/urunler/0-1-malzemeli-kumpir.jpg",
    aciklama: "Patates + tereyağı + kaşar, 1 malzeme seç.",
    malzemeler: KUMPIR_MALZEMELER,
    kumpirLimit: 1,
  },
  {
    id: 20,
    kat: "Kumpir",
    ad: "3 Malzemeli Kumpir",
    fiyat: 360,
    resim: "/public/urunler/3-malzemeli-kumpir.jpg",
    aciklama: "3 malzeme seç.",
    malzemeler: KUMPIR_MALZEMELER,
    kumpirLimit: 3,
  },
  {
    id: 21,
    kat: "Kumpir",
    ad: "5 Malzemeli Kumpir",
    fiyat: 380,
    populer: true,
    resim: "/public/urunler/5-malzemeli-kumpir.jpg",
    aciklama: "5 malzeme seç.",
    malzemeler: KUMPIR_MALZEMELER,
    kumpirLimit: 5,
  },
  {
    id: 22,
    kat: "Kumpir",
    ad: "7 Malzemeli Kumpir",
    fiyat: 400,
    resim: "/public/urunler/7-malzemeli-kumpir.jpg",
    aciklama: "7 malzeme seç.",
    malzemeler: KUMPIR_MALZEMELER,
    kumpirLimit: 7,
  },
  {
    id: 23,
    kat: "Kumpir",
    ad: "9 Malzemeli Kumpir",
    fiyat: 420,
    resim: "/public/urunler/9-malzemeli-kumpir.jpg",
    aciklama: "9 malzeme seç.",
    malzemeler: KUMPIR_MALZEMELER,
    kumpirLimit: 9,
  },
  {
    id: 24,
    kat: "Künefe & Katmer",
    ad: "Peynirli Fıstıklı Künefe",
    fiyat: 520,
    resim: "/public/urunler/kunefe.jpg",
    aciklama: "Sıcak künefe, uzayan peynir ve bol Antep fıstığı.",
  },
  {
    id: 25,
    kat: "Künefe & Katmer",
    ad: "Hasır Künefe",
    fiyat: 560,
    resim: "/public/urunler/kunefe-dondurma.jpg",
    aciklama: "Çıtır hasır künefe, peynir ve fıstık.",
  },
  {
    id: 26,
    kat: "Künefe & Katmer",
    ad: "Fıstıklı Katmer",
    fiyat: 450,
    resim: "/public/urunler/fistikli-katmer.jpg",
    aciklama: "Çıtır katmer, bol Antep fıstığı.",
  },
  {
    id: 27,
    kat: "Künefe & Katmer",
    ad: "Çikolatalı Fıstıklı Katmer",
    fiyat: 500,
    resim: "/public/urunler/katmer-dondurma.jpg",
    aciklama: "Çikolatalı, fıstıklı çıtır katmer.",
  },
  {
    id: 28,
    kat: "Sufle",
    ad: "Çikolatalı Sufle",
    fiyat: 380,
    resim: "/public/urunler/cikolatali-sufle.jpg",
    aciklama: "Akışkan çikolatalı sufle.",
  },
  {
    id: 29,
    kat: "Sufle",
    ad: "Beyaz Çikolatalı Tahinli Sufle",
    fiyat: 380,
    resim: "/public/urunler/beyaz-cikolatali-tahinli-sufle.jpg",
    aciklama: "Beyaz çikolata ve tahinli, akışkan sufle.",
  },
  {
    id: 30,
    kat: "Bowl Waffle",
    ad: "Waffle & Cola İkili Fırsat Kovası",
    fiyat: 1000,
    populer: true,
    resim: "/public/urunler/firsat-kovasi.jpg",
    aciklama: "2 adet enfes bowl waffle ve yanında 2 adet soğuk Coca-Cola! Waffle içeriğinden çıkarmak istediğiniz malzemeleri sipariş notunda belirtebilirsiniz.",
    malzemeler: WAFFLE_MALZEMELER,
  },
];

const EKSTRALAR = [
  { ad: "Sütlü Çikolata Sosu", fiyat: 72 },
  { ad: "Antep Fıstıklı Sosu", fiyat: 80 },
  { ad: " Oreo Tozu", fiyat: 64 },
  { ad: "Lotus Tozu", fiyat: 64 },
  { ad: "Beyaz Sos", fiyat: 60 },
  { ad: "Çilek", fiyat: 55 },
  { ad: "Muz", fiyat: 45 },
  { ad: "Antep Fıstığı", fiyat: 75 },
  { ad: "Bonibon", fiyat: 50 },
  { ad: "Çakıl Taşı", fiyat: 50 },
  { ad: "Beyaz Damla Çikolata", fiyat: 55 },
];

type SepetItem = {
  urun: Urun;
  adet: number;
  cikarilan: string[];
  ekstralar: string[];
};
export default function Page() {
  const [sepet, setSepet] = useState<SepetItem[]>([]);
  const [acikUrun, setAcikUrun] = useState<Urun | null>(null);
  const [seciliCikar, setSeciliCikar] = useState<string[]>([]);
  const [seciliEkstra, setSeciliEkstra] = useState<string[]>([]);
  const [adres, setAdres] = useState("");
  const [not, setNot] = useState("");
  const [notTipi, setNotTipi] = useState("");
  const [odeme, setOdeme] = useState("Kapıda Nakit");
  const [siparisSayisi, setSiparisSayisi] = useState(0);
  const [puan, setPuan] = useState(0);
  const [puanKullan, setPuanKullan] = useState(false);
  const [kat, setKat] = useState("Tümü");
  const [sayfa, setSayfa] = useState("Anasayfa");
  const [kullanici, setKullanici] = useState("");
  const [girisIsim, setGirisIsim] = useState("");
  const [girisAcik, setGirisAcik] = useState(false);
  const [kvkkAcik, setKvkkAcik] = useState(false);
  const [alerjiAcik, setAlerjiAcik] = useState(false);

  useEffect(() => {
    setSiparisSayisi(Number(localStorage.getItem("wafflia_siparis") || "0"));
    setPuan(Number(localStorage.getItem("wafflia_puan") || "0"));
    setKullanici(localStorage.getItem("wafflia_kullanici") || "");
  }, []);

  function girisYap() {
    if (!girisIsim) return;
    localStorage.setItem("wafflia_kullanici", girisIsim);
    setKullanici(girisIsim);
    setGirisAcik(false);
  }

  function cikisYap() {
    localStorage.removeItem("wafflia_kullanici");
    setKullanici("");
  }

  const kategoriler = [
    "Tümü",
    "Bowl Waffle",
    "Kare Waffle",
    "Kumpir",
    "Künefe & Katmer",
    "Sufle",
  ];

  const liste =
    kat === "Tümü" ? URUNLER : URUNLER.filter((u) => u.kat === kat);

  const opsiyonVar = (u: Urun) => {
    return (
      u.kat === "Bowl Waffle" ||
      u.kat === "Kare Waffle" ||
      u.kat === "Kumpir"
    );
  };

  function urunAc(u: Urun) {
    setAcikUrun(u);
    setSeciliCikar([]);
    setSeciliEkstra([]);
  }

  function toggleCikar(m: string) {
    if (!acikUrun) return;
    if (acikUrun.kat === "Kumpir") {
      if (seciliCikar.includes(m)) {
        setSeciliCikar(seciliCikar.filter((x) => x !== m));
      } else {
        if (seciliCikar.length >= (acikUrun.kumpirLimit || 0)) return;
        setSeciliCikar([...seciliCikar, m]);
      }
    } else {
      if (seciliCikar.includes(m)) {
        setSeciliCikar(seciliCikar.filter((x) => x !== m));
      } else {
        setSeciliCikar([...seciliCikar, m]);
      }
    }
  }

  function toggleEkstra(ad: string) {
    if (seciliEkstra.includes(ad)) {
      setSeciliEkstra(seciliEkstra.filter((x) => x !== ad));
    } else {
      setSeciliEkstra([...seciliEkstra, ad]);
    }
  }

  function sepeteEkle() {
    if (!acikUrun) return;
    setSepet([
      ...sepet,
      {
        urun: acikUrun,
        adet: 1,
        cikarilan: seciliCikar,
        ekstralar: seciliEkstra,
      },
    ]);
    setAcikUrun(null);
  }

  const araToplam = useMemo(() => {
    return sepet.reduce((t, i) => {
      const ek = i.ekstralar.reduce((s, ad) => {
        const b = EKSTRALAR.find((e) => e.ad === ad);
        return s + (b ? b.fiyat : 0);
      }, 0);
      return t + (i.urun.fiyat + ek) * i.adet;
    }, 0);
  }, [sepet]);

  let indirim = 0;
  let indirimAciklama = "";
  if (siparisSayisi === 0) {
    indirim = araToplam * 0.25;
    indirimAciklama = "İlk Sipariş %25 İndirim";
  } else if ((siparisSayisi + 1) % 5 === 0) {
    indirim = araToplam * 0.4;
    indirimAciklama = "5. Sipariş %40 İndirim";
  }

  let puanIndirim = 0;
  if (puanKullan && puan >= 150) puanIndirim = 400;
  const toplam = Math.max(0, araToplam - indirim - puanIndirim);

  function siparisVer() {
    if (!adres) {
      alert("Lütfen adres yaz");
      return;
    }
    const urunMetni = sepet
      .map((i) => {
        let p = i.adet + "x " + i.urun.ad;
        if (i.cikarilan.length) p += " (Çıkarılan: " + i.cikarilan.join(", ") + ")";
        if (i.ekstralar.length) p += " (Ekstra: " + i.ekstralar.join(", ") + ")";
        return p;
      })
      .join(" | ");
    const mesaj =
      "WaffLia Sipariş - Toplam: " +
      toplam +
      " TL - Adres: " +
      adres +
      " - Not: " +
      notTipi +
      " " +
      not +
      " - Ödeme: " +
      odeme +
      " - Ürünler: " +
      urunMetni;
    localStorage.setItem("wafflia_siparis", String(siparisSayisi + 1));
    localStorage.setItem(
      "wafflia_puan",
      String(puanKullan && puan >= 150 ? puan - 150 + 10 : puan + 10)
    );
    window.open(
      "https://wa.me/905352732865?text=" + encodeURIComponent(mesaj),
      "_blank"
    );
    setSepet([]);
    setAdres("");
    setNot("");
  }

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        background: "#fff7ee",
        minHeight: "100vh",
        paddingBottom: 130,
      }}
    >
      <header
        style={{
          background: "#2b1708",
          color: "#fff",
          padding: 16,
          textAlign: "center",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ fontWeight: 900, fontSize: 20 }}>
          🧇 WaffLia Sweet Kumpir
        </div>
        <div style={{ fontSize: 12, opacity: 0.8 }}>
          17:00 - 05:00 | 0535 273 28 65
        </div>
        <div
          style={{
            fontSize: 12,
            marginTop: 6,
            background: "#fff",
            color: "#2b1708",
            display: "inline-block",
            padding: "4px 10px",
            borderRadius: 20,
          }}
        >
          ⭐ Puanın: {puan} | Sipariş Sayın: {siparisSayisi}
        </div>
        <div style={{ marginTop: 8 }}>
          {kullanici ? (
            <span style={{ fontSize: 13 }}>
              Merhaba, {kullanici} 👋{" "}
              <button
                onClick={cikisYap}
                style={{
                  background: "#fff",
                  color: "#2b1708",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: 20,
                  fontWeight: 800,
                }}
              >
                Çıkış Yap
              </button>
            </span>
          ) : (
            <button
              onClick={() => setGirisAcik(true)}
              style={{
                background: "#fff",
                color: "#2b1708",
                border: "none",
                padding: "6px 14px",
                borderRadius: 20,
                fontWeight: 800,
              }}
            >
              Giriş Yap
            </button>
          )}
        </div>
      </header>

      {siparisSayisi === 0 && (
        <div
          style={{
            background: "#ffcc00",
            textAlign: "center",
            padding: 10,
            fontWeight: 900,
            fontSize: 14,
          }}
        >
          🎉 İlk siparişine özel %25 indirim!
        </div>
      )}
      {(siparisSayisi + 1) % 5 === 0 && siparisSayisi !== 0 && (
        <div
          style={{
            background: "#ffcc00",
            textAlign: "center",
            padding: 10,
            fontWeight: 900,
            fontSize: 14,
          }}
        >
          🎉 Bu 5. siparişin, %40 indirim kazandın!
        </div>
      )}

      {sayfa === "Profil" ? (
        <div style={{ padding: 16 }}>
          <h2>Profilim</h2>
          <p>Adın: {kullanici || "Giriş yapmadın"}</p>
          <p>Puanın: {puan} (150 puan = 400 TL indirim)</p>
          <p>Sipariş Sayın: {siparisSayisi}</p>
          {kullanici ? (
            <button
              onClick={cikisYap}
              style={{
                background: "#111",
                color: "#fff",
                border: "none",
                padding: 12,
                borderRadius: 10,
                width: "100%",
                fontWeight: 800,
              }}
            >
              Çıkış Yap
            </button>
          ) : (
            <button
              onClick={() => setGirisAcik(true)}
              style={{
                background: "#111",
                color: "#fff",
                border: "none",
                padding: 12,
                borderRadius: 10,
                width: "100%",
                fontWeight: 800,
              }}
            >
              Giriş Yap
            </button>
          )}
        </div>
      ) : sayfa === "Siparişler" ? (
        <div style={{ padding: 16 }}>
          <h2>Siparişlerim</h2>
          <p>Toplam sipariş sayın: {siparisSayisi}</p>
          <p>Şu an sepette: {sepet.length} ürün</p>
          <p>İndirim: {siparisSayisi === 0 ? "İlk siparişe %25" : "Her 5. siparişe %40"}</p>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: 12 }}>
            {kategoriler.map((k) => (
              <button
                key={k}
                onClick={() => setKat(k)}
                style={{
                  whiteSpace: "nowrap",
                  padding: "8px 14px",
                  borderRadius: 20,
                  border: "none",
                  background: kat === k ? "#2b1708" : "#fff",
                  color: kat === k ? "#fff" : "#2b1708",
                  fontWeight: 700,
                }}
              >
                {k}
              </button>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              padding: 12,
            }}
          >
            {liste.map((u) => (
              <div
                key={u.id}
                onClick={() => urunAc(u)}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
                  cursor: "pointer",
                }}
              >
                <img
                  src={u.resim}
                  alt={u.ad}
                  style={{
                    width: "100%",
                    aspectRatio: "1/1",
                    objectFit: "cover",
                    display: "block",
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div style={{ padding: 10 }}>
                  <div style={{ fontWeight: 800, fontSize: 14 }}>{u.ad}</div>
                  <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
                    {u.aciklama}
                  </div>
                  <div style={{ fontWeight: 900, marginTop: 8 }}>
                    {u.fiyat} TL {u.populer ? "🔥" : ""}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      urunAc(u);
                    }}
                    style={{
                      marginTop: 8,
                      width: "100%",
                      background: "#111",
                      color: "#fff",
                      border: "none",
                      padding: 10,
                      borderRadius: 10,
                      fontWeight: 800,
                    }}
                  >
                    + Sepete Ekle
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "#fff", margin: 12, borderRadius: 16, padding: 14 }}>
            <div style={{ fontWeight: 900 }}>ℹ️ Bilgilendirme</div>
            <button
              onClick={() => setAlerjiAcik(!alerjiAcik)}
              style={{
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                padding: "10px 0",
                fontWeight: 700,
              }}
            >
              ⚠️ Alerji Uyarısı {alerjiAcik ? "▲" : "▼"}
            </button>
            {alerjiAcik && (
              <p style={{ fontSize: 13, color: "#555" }}>
                Ürünlerimiz gluten, süt, yumurta, fındık, fıstık ve soya
                içerebilir. Alerjiniz varsa sipariş notuna yazınız.
              </p>
            )}
            <button
              onClick={() => setKvkkAcik(!kvkkAcik)}
              style={{
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                padding: "10px 0",
                fontWeight: 700,
              }}
            >
              🔒 KVKK Aydınlatma Metni {kvkkAcik ? "▲" : "▼"}
            </button>
            {kvkkAcik && (
              <p style={{ fontSize: 13, color: "#555" }}>
                WaffLia Sweet Kumpir olarak kişisel verileriniz yalnızca
                siparişinizi hazırlamak ve size ulaştırmak için kullanılır.
                Verileriniz üçüncü kişilerle paylaşılmaz. Detaylı bilgi için
                bize ulaşabilirsiniz.
              </p>
            )}
          </div>
        </>
      )}

      {girisAcik && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ background: "#fff", padding: 20, borderRadius: 16, width: "85%" }}>
            <h3>Giriş Yap</h3>
            <input
              value={girisIsim}
              onChange={(e) => setGirisIsim(e.target.value)}
              placeholder="Adını yaz"
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 10,
                border: "1px solid #ddd",
                boxSizing: "border-box",
              }}
            />
            <button
              onClick={girisYap}
              style={{
                width: "100%",
                marginTop: 10,
                background: "#111",
                color: "#fff",
                border: "none",
                padding: 12,
                borderRadius: 10,
                fontWeight: 900,
              }}
            >
              Giriş Yap
            </button>
            <button
              onClick={() => setGirisAcik(false)}
              style={{
                width: "100%",
                marginTop: 8,
                background: "#eee",
                border: "none",
                padding: 10,
                borderRadius: 10,
              }}
            >
              Vazgeç
            </button>
          </div>
        </div>
      )}

      {acikUrun && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 50,
            overflowY: "auto",
          }}
        >
          <div
            style={{
              background: "#fff",
              margin: 16,
              borderRadius: 16,
              padding: 16,
              marginTop: 40,
            }}
          >
            <button
              onClick={() => setAcikUrun(null)}
              style={{
                float: "right",
                border: "none",
                background: "#eee",
                padding: "6px 12px",
                borderRadius: 10,
              }}
            >
              X Kapat
            </button>
            <img
              src={acikUrun.resim}
              alt={acikUrun.ad}
              style={{
                width: "100%",
                borderRadius: 12,
                aspectRatio: "1/1",
                objectFit: "cover",
              }}
            />
            <h2>{acikUrun.ad}</h2>
            <p style={{ color: "#555" }}>{acikUrun.aciklama}</p>
            <div style={{ fontWeight: 900, fontSize: 20 }}>
              {acikUrun.fiyat} TL
            </div>
            {opsiyonVar(acikUrun) && acikUrun.malzemeler && (
              <div style={{ marginTop: 14 }}>
                <div style={{ fontWeight: 800 }}>
                  {acikUrun.kat === "Kumpir"
                    ? "Malzemeni Seç (En fazla " + acikUrun.kumpirLimit + " adet)"
                    : "Çıkarmak İstediğin Malzemeleri Seç"}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    marginTop: 8,
                  }}
                >
                  {acikUrun.malzemeler.map((m) => (
                    <button
                      key={m}
                      onClick={() => toggleCikar(m)}
                      style={{
                        padding: "8px 10px",
                        borderRadius: 20,
                        border: "1px solid #ddd",
                        background: seciliCikar.includes(m) ? "#2b1708" : "#fff",
                        color: seciliCikar.includes(m) ? "#fff" : "#111",
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {opsiyonVar(acikUrun) && (
              <div style={{ marginTop: 14 }}>
                <div style={{ fontWeight: 800 }}>Ekstra Malzeme Ekle</div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    marginTop: 8,
                  }}
                >
                  {EKSTRALAR.map((e) => (
                    <button
                      key={e.ad}
                      onClick={() => toggleEkstra(e.ad)}
                      style={{
                        padding: "8px 10px",
                        borderRadius: 20,
                        border: "1px solid #ddd",
                        background: seciliEkstra.includes(e.ad) ? "#ffcc00" : "#fff",
                      }}
                    >
                      {e.ad} +{e.fiyat} TL
                    </button>
                  ))}
                </div>
              </div>
            )}
            <button
              onClick={sepeteEkle}
              style={{
                marginTop: 16,
                width: "100%",
                background: "#111",
                color: "#fff",
                border: "none",
                padding: 14,
                borderRadius: 12,
                fontWeight: 900,
              }}
            >
              Sepete Ekle
            </button>
          </div>
        </div>
      )}

      {sepet.length > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: 70,
            left: 0,
            right: 0,
            background: "#fff",
            borderTop: "1px solid #eee",
            padding: 14,
            zIndex: 40,
            maxHeight: "45vh",
            overflowY: "auto",
          }}
        >
          <div style={{ fontWeight: 900 }}>Sepetin ({sepet.length} ürün)</div>
          {sepet.map((i, idx) => (
            <div
              key={idx}
              style={{
                fontSize: 13,
                padding: "6px 0",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              {i.adet}x {i.urun.ad} - {i.urun.fiyat} TL{" "}
              {i.cikarilan.length ? " | Çıkarılan: " + i.cikarilan.join(", ") : ""}{" "}
              {i.ekstralar.length ? " | Ekstra: " + i.ekstralar.join(", ") : ""}{" "}
              <button
                onClick={() => setSepet(sepet.filter((_, j) => j !== idx))}
                style={{
                  border: "none",
                  background: "#ffe0e0",
                  borderRadius: 6,
                  padding: "2px 6px",
                }}
              >
                Sil
              </button>
            </div>
          ))}
          <div style={{ fontSize: 13, marginTop: 8 }}>Ara Toplam: {araToplam} TL</div>
          {indirim > 0 && (
            <div style={{ fontSize: 13, color: "green" }}>
              {indirimAciklama}: -{Math.round(indirim)} TL
            </div>
          )}
          {puan >= 150 && (
            <label style={{ fontSize: 13, display: "block", marginTop: 6 }}>
              <input
                type="checkbox"
                checked={puanKullan}
                onChange={(e) => setPuanKullan(e.target.checked)}
              />{" "}
              150 puan kullan, 400 TL indirim al (Puanın: {puan})
            </label>
          )}
          <div style={{ fontWeight: 900, marginTop: 6 }}>Toplam: {toplam} TL</div>
          <input
            value={adres}
            onChange={(e) => setAdres(e.target.value)}
            placeholder="Adresini yaz"
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 10,
              border: "1px solid #ddd",
              marginTop: 8,
              boxSizing: "border-box",
            }}
          />
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button
              onClick={() => setNotTipi("Kapıya Bırak")}
              style={{
                flex: 1,
                padding: 8,
                borderRadius: 10,
                border: "1px solid #ddd",
                background: notTipi === "Kapıya Bırak" ? "#111" : "#fff",
                color: notTipi === "Kapıya Bırak" ? "#fff" : "#111",
              }}
            >
              Kapıya Bırak
            </button>
            <button
              onClick={() => setNotTipi("Zile Basma")}
              style={{
                flex: 1,
                padding: 8,
                borderRadius: 10,
                border: "1px solid #ddd",
                background: notTipi === "Zile Basma" ? "#111" : "#fff",
                color: notTipi === "Zile Basma" ? "#fff" : "#111",
              }}
            >
              Zile Basma
            </button>
          </div>
          <input
            value={not}
            onChange={(e) => setNot(e.target.value)}
            placeholder="Özel notun"
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 10,
              border: "1px solid #ddd",
              marginTop: 8,
              boxSizing: "border-box",
            }}
          />
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button
              onClick={() => setOdeme("Kapıda Nakit")}
              style={{
                flex: 1,
                padding: 8,
                borderRadius: 10,
                border: "1px solid #ddd",
                background: odeme === "Kapıda Nakit" ? "#111" : "#fff",
                color: odeme === "Kapıda Nakit" ? "#fff" : "#111",
              }}
            >
              Kapıda Nakit
            </button>
            <button
              onClick={() => setOdeme("Kapıda Kredi Kartı")}
              style={{
                flex: 1,
                padding: 8,
                borderRadius: 10,
                border: "1px solid #ddd",
                background: odeme === "Kapıda Kredi Kartı" ? "#111" : "#fff",
                color: odeme === "Kapıda Kredi Kartı" ? "#fff" : "#111",
              }}
            >
              Kapıda Kart
            </button>
          </div>
          <button
            onClick={siparisVer}
            style={{
              width: "100%",
              marginTop: 10,
              background: "#111",
              color: "#fff",
              border: "none",
              padding: 14,
              borderRadius: 12,
              fontWeight: 900,
            }}
          >
            Siparişi Ver - {toplam} TL
          </button>
        </div>
      )}

      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#fff",
          borderTop: "1px solid #eee",
          display: "flex",
          justifyContent: "space-around",
          padding: "10px 0",
          zIndex: 45,
        }}
      >
        <button
          onClick={() => setSayfa("Anasayfa")}
          style={{ background: "none", border: "none", fontWeight: sayfa === "Anasayfa" ? 900 : 400 }}
        >
          🏠<br />Anasayfa
        </button>
        <button
          onClick={() => setSayfa("Anasayfa")}
          style={{ background: "none", border: "none", fontWeight: sayfa === "Anasayfa" ? 900 : 400 }}
        >
          ☰<br />Menü
        </button>
        <button
          onClick={() => setSayfa("Siparişler")}
          style={{ background: "none", border: "none", fontWeight: sayfa === "Siparişler" ? 900 : 400 }}
        >
          🧾<br />Siparişler
        </button>
        <button
          onClick={() => setSayfa("Profil")}
          style={{ background: "none", border: "none", fontWeight: sayfa === "Profil" ? 900 : 400 }}
        >
          👤<br />Profil
        </button>
      </nav>

      <footer
        style={{
          textAlign: "center",
          fontSize: 12,
          color: "#888",
          padding: 20,
        }}
      >
        WaffLia Sweet Kumpir - Her sipariş 10 puan kazandırır. 150 puan = 400 TL indirim.
      </footer>
    </div>
  );
}
