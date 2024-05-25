import { createSelector } from "reselect";

const cartSlice = (state) => state.cart;

export const selectCartItems = createSelector(
  [cartSlice],
  (cartMemo) => cartMemo.cartItems
);

export const selectIsCartOpen = createSelector(
  [cartSlice],
  (cart) => cart.cartIsVisible
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((acc, item) => acc + item.quantity, 0)
);

export const selecCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
);
