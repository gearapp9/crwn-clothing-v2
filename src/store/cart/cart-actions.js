import { createAction } from "../../utils/reducer.util";
import { CART_ACTION_TYPES } from "./cart-types";

export const setCartIsVisible = (bool) => 
  createAction(CART_ACTION_TYPES.SET_CART_VISIBILITY, bool);


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

export const addItemToCart = (cartItems,productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
};

export const removeItemFromCart = (cartItems,productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
};

export const clearItem = (cartItems,productToClear) => {
  const newCartItems = cartItems.filter(
    (item) => item.id !== productToClear.id
  );
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
};
