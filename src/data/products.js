// Minimal product catalog for demo purposes
export const products = [
  {
    id: 'p1',
    name: 'Basic Tee',
    price: 20,
    image: 'https://picsum.photos/seed/shirt/400/300',
    description: 'Soft cotton tee in classic fit.'
  },
  {
    id: 'p2',
    name: 'Everyday Hoodie',
    price: 45,
    image: 'https://picsum.photos/seed/hoodie/400/300',
    description: 'Cozy fleece hoodie for all seasons.'
  },
  {
    id: 'p3',
    name: 'Trail Sneakers',
    price: 75,
    image: 'https://picsum.photos/seed/sneakers/400/300',
    description: 'Lightweight sneakers with great grip.'
  }
];

export function getProduct(id) {
  return products.find(p => p.id === id);
}
