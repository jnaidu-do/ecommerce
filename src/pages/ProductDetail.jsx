import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';

export default function ProductDetail() {
  const { id } = useParams();
  const p = getProduct(id);
  const { add } = useCart();
  const nav = useNavigate();
  if (!p) return <div style={{ padding: 16 }}>Not found.</div>;
  return (
    <div style={{ padding: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <img src={p.image} alt={p.name} style={{ width: '100%', borderRadius: 8 }} />
      <div>
        <h1>{p.name}</h1>
        <p style={{ color: '#333' }}>{p.description}</p>
        <p style={{ fontWeight: 700, fontSize: 20 }}>${p.price.toFixed(2)}</p>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => add(p.id)} style={btn}>Add to cart</button>
          <button onClick={() => { add(p.id); nav('/cart'); }} style={ghostBtn}>Buy now</button>
        </div>
      </div>
    </div>
  );
}

const btn = { padding: '10px 12px', borderRadius: 6, border: '1px solid #111', background: '#111', color: '#fff', cursor: 'pointer' };
const ghostBtn = { padding: '10px 12px', borderRadius: 6, border: '1px solid #ddd', background: '#fff', color: '#111', cursor: 'pointer' };
