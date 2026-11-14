import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const base_url = 'http://localhost:3000';

  // Serverdan kelgan mahsulotlar
  const [products, setProducts] = useState([]);
  const [xato, setXato] = useState('');

  // Buyurtma formasi maydonlari
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [productId, setProductId] = useState('');
  const [xabar, setXabar] = useState('');

  // Sahifa ochilganda mahsulotlarni serverdan olamiz
  useEffect(() => {
    fetch(`${base_url}/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setXato("Serverga ulanib bo'lmadi. Backend ishlab turganini tekshiring."));
  }, []);

  // Buyurtmani serverga yuborish: POST /orders
  const buyurtmaBerish = async () => {
    try {
      const res = await fetch(`${base_url}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, productId: Number(productId) }),
      });
      const data = await res.json();

      if (res.status === 201) {
        setXabar(`Rahmat, ${data.order.name}! "${data.order.product}" uchun buyurtmangiz qabul qilindi.`);
        setName('');
        setPhone('');
        setProductId('');
      } else {
        setXabar(data.error);
      }
    } catch (err) {
      setXabar("Serverga ulanib bo'lmadi.");
    }
  };

  return (
    <>
      <header className="header">
        <span className="logo">TechShop</span>
        <nav>
          <a href="#mahsulotlar">Mahsulotlar</a>
          <a href="#afzalliklar">Afzalliklar</a>
          <a href="#buyurtma">Buyurtma</a>
        </nav>
      </header>

      <section className="hero">
        <h1>Zamonaviy texnika — qulay narxda</h1>
        <p>Noutbuk, smartfon va aksessuarlar. Buyurtma bering, biz yetkazib beramiz.</p>
        <a className="button" href="#mahsulotlar">Mahsulotlarni ko'rish</a>
      </section>

      <main>
        <section id="mahsulotlar">
          <h2>Mahsulotlar</h2>
          {xato && <p className="error">{xato}</p>}
          <div className="grid">
            {products.map((item) =>
              <div className="card" key={item.id}>
                <span className="image">{item.image}</span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <strong>{item.price.toLocaleString('ru-RU')} so'm</strong>
                <a className="button" href="#buyurtma" onClick={() => setProductId(String(item.id))}>
                  Buyurtma berish
                </a>
              </div>
            )}
          </div>
        </section>

        <section id="afzalliklar">
          <h2>Nega aynan biz?</h2>
          <div className="grid">
            <div className="card">
              <span className="image">🚚</span>
              <h3>Tez yetkazib berish</h3>
              <p>Shahar bo'ylab 1 kun ichida.</p>
            </div>
            <div className="card">
              <span className="image">🛡️</span>
              <h3>Kafolat</h3>
              <p>Barcha mahsulotlarga 1 yil kafolat.</p>
            </div>
            <div className="card">
              <span className="image">💳</span>
              <h3>Qulay to'lov</h3>
              <p>Naqd, karta yoki bo'lib to'lash.</p>
            </div>
          </div>
        </section>

        <section id="buyurtma">
          <h2>Buyurtma qoldirish</h2>
          <div className="form">
            <input
              type="text"
              placeholder="Ismingiz"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Telefon: +998901234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <select value={productId} onChange={(e) => setProductId(e.target.value)}>
              <option value="">Mahsulotni tanlang</option>
              {products.map((item) =>
                <option key={item.id} value={item.id}>
                  {item.name} — {item.price.toLocaleString('ru-RU')} so'm
                </option>
              )}
            </select>
            <button className="button" onClick={buyurtmaBerish}>Yuborish</button>
          </div>
          {xabar && <p className="message">{xabar}</p>}
        </section>
      </main>

      <footer className="footer">
        <p>TechShop · Aloqa: support@example.com · +998901234567</p>
      </footer>
    </>
  );
}

export default App;
