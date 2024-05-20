import { useContext } from "react";
import {CartIconContainer,ItemCount,ShoppingIcon} from "./cart-icon.styles.jsx";
import { CartContext } from "../../contexts/cart.context";

const CartIcon = () => {
  const { cartIsVisible, setCartIsVisible,cartItems,cartCount } = useContext(CartContext);
  const toggleCart = () => setCartIsVisible(!cartIsVisible);
  

  return (
    <CartIconContainer onClick={toggleCart}>
      <ShoppingIcon />
      <ItemCount >{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
