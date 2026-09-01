import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { products } from '../data/products.js';

export default function Checkout() {
  const { items, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', address: '' });

  const lines = Object.entries(items).map(([id, qty]) => {
    const p = products.find(x => x.id === id);
    return p ? { ...p, qty, lineTotal: p.price * qty } : null;
  }).filter(Boolean);
  const total = lines.reduce((s, l) => s + l.lineTotal, 0);

  function placeOrder(e) {
    e.preventDefault();
    // Fake checkout
    setPlaced(true);
    clear();
  }

  if (placed) {
    return (
      <div style={{ padding: 16 }}>
        <h1>Thank you!</h1>
        <p>Your order has been placed. A confirmation email will be sent to {form.email || 'you'}.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <section>
        <h1>Checkout</h1>
        <form onSubmit={placeOrder} style={{ display: 'grid', gap: 12 }}>
          <label style={label}>Full name<input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required style={input} /></label>
          <label style={label}>Email<input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required style={input} /></label>
          <label style={label}>Address<textarea value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} required rows={3} style={input} /></label>
          <button type="submit" style={btn} disabled={!lines.length}>Place Order</button>
        </form>
      </section>
      <aside>
        <h2>Order Summary</h2>
        <div style={{ display: 'grid', gap: 8 }}>
          {lines.length ? lines.map(l => (
            <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>{l.name} × {l.qty}</div>
              <div>${l.lineTotal.toFixed(2)}</div>
            </div>
          )) : <p>No items in cart.</p>}
          <hr />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
            <div>Total</div>
            <div>${total.toFixed(2)}</div>
          </div>
        </div>
      </aside>
    </div>
  );
}

const label = { display: 'grid', gap: 6, fontSize: 14 };
const input = { padding: '10px 12px', borderRadius: 6, border: '1px solid #ddd' };
const btn = { marginTop: 8, padding: '10px 12px', borderRadius: 6, border: '1px solid #111', background: '#111', color: '#fff', cursor: 'pointer' };
