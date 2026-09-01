import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { products } from '../data/products.js';

export default function Cart() {
  const { items, setQty, remove, clear } = useCart();
  const nav = useNavigate();
  const lines = Object.entries(items).map(([id, qty]) => {
    const p = products.find(x => x.id === id);
    return p ? { ...p, qty, lineTotal: p.price * qty } : null;
  }).filter(Boolean);
  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);

  if (!lines.length) {
    return (
      <div style={{ padding: 16 }}>
        <h1>Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/" style={link}>Browse products</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 16 }}>
      <h1>Cart</h1>
      <div style={{ display: 'grid', gap: 12 }}>
        {lines.map(l => (
          <div key={l.id} style={row}>
            <img src={l.image} alt="" style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{l.name}</div>
              <div style={{ color: '#444' }}>${l.price.toFixed(2)}</div>
            </div>
            <input type="number" min={1} value={l.qty} onChange={e => setQty(l.id, Number(e.target.value))} style={qty} />
            <div style={{ width: 90, textAlign: 'right' }}>${l.lineTotal.toFixed(2)}</div>
            <button onClick={() => remove(l.id)} style={rm}>×</button>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, alignItems: 'center' }}>
        <button onClick={clear} style={ghost}>Clear</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontWeight: 700 }}>Subtotal: ${subtotal.toFixed(2)}</div>
          <button onClick={() => nav('/checkout')} style={btn}>Checkout</button>
        </div>
      </div>
    </div>
  );
}

const link = { color: '#0b5' };
const row = { display: 'flex', gap: 12, alignItems: 'center', border: '1px solid #eee', padding: 12, borderRadius: 8 };
const qty = { width: 64, padding: '6px 8px', borderRadius: 6, border: '1px solid #ddd' };
const rm = { border: '1px solid #eee', background: '#fff', borderRadius: 6, width: 32, height: 32, cursor: 'pointer' };
const btn = { padding: '10px 12px', borderRadius: 6, border: '1px solid #111', background: '#111', color: '#fff', cursor: 'pointer' };
const ghost = { padding: '8px 10px', borderRadius: 6, border: '1px solid #ddd', background: '#fff', color: '#111', cursor: 'pointer' };
