import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const exists = cartItems.find((item) => item.id === productToAdd.id);

  if (exists)
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  const exists = cartItems.find((item) => item.id === productToRemove.id);

  if (exists.quantity === 1) {
    return cartItems.filter((item) => item.id !== exists.id);
  }

  return cartItems.map((item) =>
    item.id === productToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};

export const CartContext = createContext({
  cartIsVisible: false,
  setCartIsVisible: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItem: () => {},
  cartCount: 0,
  total: 0,
});

export const CartProvider = ({ children }) => {
  const [cartIsVisible, setCartIsVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setCartCount(cartItems.reduce((acc, item) => acc + item.quantity, 0));
  }, [cartItems]);

  useEffect(() => {
    setTotal(
      cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
    );
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const clearItem = (productToClear) => {
    setCartItems(cartItems.filter((item) => item.id !== productToClear.id));
  };

  const value = {
    cartIsVisible,
    setCartIsVisible,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItem,
    cartCount,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
