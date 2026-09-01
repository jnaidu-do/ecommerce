import { createContext, useContext, useMemo, useReducer } from 'react';

// Simple cart reducer storing items as {id, qty}
function cartReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { id } = action;
      const qty = (state.items[id] || 0) + 1;
      return { ...state, items: { ...state.items, [id]: qty } };
    }
    case 'remove': {
      const { id } = action;
      const next = { ...state.items };
      delete next[id];
      return { ...state, items: next };
    }
    case 'setQty': {
      const { id, qty } = action;
      const next = { ...state.items };
      if (qty <= 0) delete next[id]; else next[id] = qty;
      return { ...state, items: next };
    }
    case 'clear':
      return { items: {} };
    default:
      return state;
  }
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: {} });

  const api = useMemo(() => ({
    items: state.items,
    add: id => dispatch({ type: 'add', id }),
    remove: id => dispatch({ type: 'remove', id }),
    setQty: (id, qty) => dispatch({ type: 'setQty', id, qty }),
    clear: () => dispatch({ type: 'clear' })
  }), [state]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
