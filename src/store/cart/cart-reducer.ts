import { AnyAction } from "redux-saga";
import { CartItem } from "./cart-types";
import { setCartIsVisible, setCartItem } from "./cart-actions";

export type CartSate = {
  readonly cartIsVisible: boolean;
  readonly cartItems: CartItem[];
};

const INITIAL_STATE: CartSate = {
  cartIsVisible: false,
  cartItems: [],
};

export const cartReducer = (
  state = INITIAL_STATE,
  action: AnyAction
): CartSate => {
  if (setCartIsVisible.match(action)) {
    return {
      ...state,
      cartIsVisible: action.payload,
    };
  }

  if (setCartItem.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }

  return state;
};
