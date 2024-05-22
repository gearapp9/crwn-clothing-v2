import { Fragment, useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import "./category.styles.scss";
import { useSelector } from "react-redux";
import {selectCategories} from "../../store/categories/categories-selector"

const Category = () => {
  const { category } = useParams();
  
  const categories = useSelector(selectCategories)
  const [products, setProducts] = useState(categories[category]);

  useEffect(() => {
    setProducts(categories[category]);
  }, [category, categories]);

  return (
    <Fragment>
      <h2 className="category-title">{category.toLocaleUpperCase()}</h2>
      <div className="category-container">
        {products &&
          products.map((prod) => {
            return <ProductCard key={prod.id} product={prod} />;
          })}
      </div>
    </Fragment>
  );
};

export default Category;
