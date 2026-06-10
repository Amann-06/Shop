import { createContext, useState } from "react";
import type { ReactNode } from "react";

interface CartContextType {
  cartCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
}

export const CartContext = createContext<CartContextType | null>(null);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({
  children,
}: CartProviderProps) => {
  const [cartCount, setCartCount] = useState(0);

  return (
    <CartContext.Provider
      value={{ cartCount, setCartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};