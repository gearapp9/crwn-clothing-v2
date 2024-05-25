import { useContext } from "react";
import {CartIconContainer,ItemCount,ShoppingIcon} from "./cart-icon.styles.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectCartCount, selectIsCartOpen } from "../../store/cart/cart-selector.js";
import {setCartIsVisible} from "../../store/cart/cart-actions.js"

const CartIcon = () => {
  const cartIsVisible = useSelector(selectIsCartOpen)
  const cartCount = useSelector(selectCartCount)
  const dispatch = useDispatch()
  const toggleCart = () => dispatch(setCartIsVisible(!cartIsVisible));
  

  return (
    <CartIconContainer onClick={toggleCart}>
      <ShoppingIcon />
      <ItemCount >{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
