import { useContext } from "react";

import "./checkout.styles.scss";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { useSelector } from "react-redux";
import { selecCartTotal, selectCartItems } from "../../store/cart/cart-selector";
import PaymentForm  from "./../../components/payment-form/payment-form-component"
const Checkout = () => {
  
  

  const cartItems = useSelector(selectCartItems)
  const total = useSelector(selecCartTotal)

    return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((item) => {
        return <CheckoutItem key={item.id} cartItem={item} />;
      })}
      <span className="total">Total: {total}</span>
      <PaymentForm/>
      
    </div>
  );
};
export default Checkout;
