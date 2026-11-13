import { useEffect, useState } from 'react';
import './App.css';
function App() {
  const base_url = 'http://localhost:3000';

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${base_url}/products`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
     <main>
      <h2>Mahsulotlar</h2>
      <div className="grid">
        {products.map((item) =>
          <div className="card" key={item.id}>
            <span className="image">{item.image}</span>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <strong>{item.price} so'm</strong>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;