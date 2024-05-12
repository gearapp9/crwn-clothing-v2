import { createContext, useState } from "react";

export const CartContext = createContext({
  cartIsVisible: false,
  setCartIsVisible: () => null,
});

export const CartProvider = ({ children }) => {
  const [cartIsVisible, setCartIsVisible] = useState(false);

  const value = { cartIsVisible, setCartIsVisible };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
