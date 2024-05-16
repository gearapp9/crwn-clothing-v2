import { useContext } from "react";
import Button from "../button/button.component";
import "./product-card.styles.scss";
import { CartContext } from "../../contexts/cart.context";


const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const {addItemToCart,cartItems} = useContext(CartContext)
  const addToCart = ()=>{
    addItemToCart(product)
  }
  
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addToCart}>Add to cart</Button>
    </div>
  );
};

export default ProductCard;
