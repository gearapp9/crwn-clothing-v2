import { createContext, useEffect, useReducer, useState } from "react";
import {createAction} from './../utils/reducer.util'


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

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_CART_VISIBILITY: "SET_CART_VISIBILITY",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      };

    case CART_ACTION_TYPES.SET_CART_VISIBILITY:
      return {
        ...state,
        cartIsVisible:payload
      };

    default:
      break;
  }
};

const INITIAL_STATE = {
  cartIsVisible: false,
  cartItems: [],
  cartCount: 0,
  total: 0,
};

export const CartProvider = ({ children }) => {
  const [{ cartIsVisible, cartItems, cartCount, total }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE
  );

  
  // const [cartIsVisible, setCartIsVisible] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  // const [total, setTotal] = useState(0);

  // useEffect(() => {
  //   setCartCount(cartItems.reduce((acc, item) => acc + item.quantity, 0));
  // }, [cartItems]);

  // useEffect(() => {
  //   setTotal(
  //     cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
  //   );
  // }, [cartItems]);

  const setCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    const newCartTotal = newCartItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );

    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS,{
      cartItems: newCartItems,
      cartCount: newCartCount,
      total: newCartTotal,
    }))

    
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    setCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    setCartItemsReducer(newCartItems);
  };

  const clearItem = (productToClear) => {
    const newCartItems = cartItems.filter(
      (item) => item.id !== productToClear.id
    );
    setCartItemsReducer(newCartItems);
  };

  const setCartIsVisible = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_VISIBILITY,bool));
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
