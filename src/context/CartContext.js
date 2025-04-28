// context/CartContext.js
import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (item) => {
    setCartItems(prev => [...prev, item]);
  };

  const toggleCart = () => setShowCart(!showCart);
  const closeCart = () => setShowCart(false);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      showCart, 
      toggleCart, 
      closeCart 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);