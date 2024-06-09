import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer.util";
import { CategoryItem } from "../categories/categories-types";
import { CART_ACTION_TYPES, CartItem } from "./cart-types";

type SetCartIsVisible = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_VISIBILITY,
  boolean
>;

export const setCartIsVisible = withMatcher(
  (bool: boolean): SetCartIsVisible =>
    createAction(CART_ACTION_TYPES.SET_CART_VISIBILITY, bool)
);

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
  const exists = cartItems.find((item) => item.id === productToAdd.id);

  if (exists)
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
  cartItems: CartItem[],
  productToRemove: CartItem
): CartItem[] => {
  const exists = cartItems.find((item) => item.id === productToRemove.id);

  if (exists && exists.quantity === 1) {
    return cartItems.filter((item) => item.id !== exists.id);
  }

  return cartItems.map((item) =>
    item.id === productToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};

type SetCartItem = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;
export const setCartItem = withMatcher(
  (newCartItems: CartItem[]): SetCartItem =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
);

export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
) => {
  const newCartItems = addCartItem(cartItems, productToAdd);

  return setCartItem(newCartItems);
};

export const removeItemFromCart = (
  cartItems: CartItem[],
  productToRemove: CartItem
) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return setCartItem(newCartItems);
};

export const clearItem = (cartItems: CartItem[], productToClear: CartItem) => {
  const newCartItems = cartItems.filter(
    (item) => item.id !== productToClear.id
  );
  return setCartItem(newCartItems);
};
