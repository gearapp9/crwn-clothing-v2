import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.components";
import "./shop.styles.scss";
import Category from "../category/category.component";

import { fatchCategoriesAsync } from "../../store/categories/categories-actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fatchCategoriesAsync());
  }, []);

  return (
 
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
