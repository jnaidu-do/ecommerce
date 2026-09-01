import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Header() {
  const { items } = useCart();
  const count = Object.values(items).reduce((a, b) => a + b, 0);
  return (
    <header style={styles.header}>
      <Link to="/" style={styles.brand}>mini.shop</Link>
      <nav style={styles.nav}>
        <NavLink to="/" style={styles.link}>Products</NavLink>
        <NavLink to="/cart" style={styles.link}>Cart ({count})</NavLink>
      </nav>
    </header>
  );
}

const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #eee', position: 'sticky', top: 0, background: '#fff', zIndex: 10 },
  brand: { fontWeight: 700, textDecoration: 'none', color: '#111', fontSize: 20 },
  nav: { display: 'flex', gap: 12 },
  link: ({ isActive }) => ({ textDecoration: 'none', color: isActive ? '#111' : '#444' })
};
