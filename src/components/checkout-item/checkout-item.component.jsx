import { useContext } from "react";
import "./checkout-item.styles.scss";

import {addItemToCart,clearItem,removeItemFromCart} from "../../store/cart/cart-actions"
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart-selector";


const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const cartItems = useSelector(selectCartItems)

  const dipatch = useDispatch()
  const clearItemHandler = ()=>dipatch(clearItem(cartItems,cartItem));
 const removeItemHandler = ()=> dipatch(removeItemFromCart(cartItems,cartItem))
  const addItemHandler = ()=> dipatch(addItemToCart(cartItems,cartItem))


  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemHandler}>&#10094;</div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>&#10095;</div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={clearItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
