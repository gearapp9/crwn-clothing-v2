import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.components";
import "./shop.styles.scss";
import Category from "../category/category.component";
import { getCategoriesAndDocument } from "../../utils/firebase.util";
import { setCategories } from "../../store/categories/categories-actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Shop = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const getCategoriesData = async () => {
      const data = await getCategoriesAndDocument();
      dispatch(setCategories(data));

    };
    getCategoriesData();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
