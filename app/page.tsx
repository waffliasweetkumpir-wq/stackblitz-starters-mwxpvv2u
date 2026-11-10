export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: '#fff7ed', padding: '24px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '8px' }}>Wafflia Sweet Kumpir</h1>
        <p style={{ fontSize: '18px', color: '#555' }}>En tatli waffle ve kumpir burada</p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', margin: '24px 0' }}>
          <a href="/kayit" style={{ background: '#ea580c', color: 'white', padding: '12px 24px', borderRadius: '999px', textDecoration: 'none', fontWeight: 'bold' }}>Kayit Ol</a>
          <a href="/giris" style={{ background: 'white', color: '#ea580c', padding: '12px 24px', borderRadius: '999px', textDecoration: 'none', fontWeight: 'bold', border: '2px solid #ea580c' }}>Giris Yap</a>
        </div>

        <h2 style={{ marginTop: '32px' }}>En Cok Sevilenler</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginTop: '16px' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '16px' }}>
            <h3>Lotus Bomb Waffle</h3>
            <p>340 TL</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '16px' }}>
            <h3>Ultimate Bowl Waffle</h3>
            <p>370 TL</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '16px' }}>
            <h3>Milk Chocolate Bowl</h3>
            <p>350 TL</p>
          </div>
        </div>

        <p style={{ marginTop: '32px', color: '#777' }}>waffliasweetkumpir.com</p>
      </div>
    </main>
  )
}