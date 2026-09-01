import { Link } from 'react-router-dom';
import { products } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';

export default function ProductList() {
  const { add } = useCart();
  return (
    <div style={{ padding: 16 }}>
      <h1 style={{ marginBottom: 16 }}>Products</h1>
      <div style={grid}>
        {products.map(p => (
          <article key={p.id} style={card}>
            <Link to={`/product/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <img src={p.image} alt={p.name} style={img} />
              <h3 style={{ margin: '8px 0 4px' }}>{p.name}</h3>
            </Link>
            <p style={{ margin: 0, color: '#333' }}>${p.price.toFixed(2)}</p>
            <button onClick={() => add(p.id)} style={btn}>Add to cart</button>
          </article>
        ))}
      </div>
    </div>
  );
}

const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 };
const card = { border: '1px solid #eee', borderRadius: 8, padding: 12, background: '#fff', display: 'flex', flexDirection: 'column' };
const img = { width: '100%', height: 140, objectFit: 'cover', borderRadius: 6, background: '#f6f6f6' };
const btn = { marginTop: 'auto', padding: '8px 10px', borderRadius: 6, border: '1px solid #ddd', background: '#111', color: '#fff', cursor: 'pointer' };
