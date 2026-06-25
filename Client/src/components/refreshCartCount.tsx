import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const refreshCartCount = async () => {
  const token = localStorage.getItem("token");
  const { setCartCount } = useContext(CartContext)!;
  const res = await fetch("http://localhost:3000/api/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  const count = data.cart.products.reduce(
    (sum: number, item: any) => sum + item.quantity,
    0
  );
  setCartCount(count);
};

export default refreshCartCount;