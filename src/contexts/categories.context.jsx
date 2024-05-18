import { createContext, useEffect, useState } from "react";
import SHOP_DATA from "../shop-data.js";
import {
  addCollectionAndDoc,
  getCategoriesAndDocument,
} from "../utils/firebase.util.js";

export const CategoriesContext = createContext({
  categories: [],
});

export const CategoriesProvider = ({ children }) => {
  const [categories, setcategories] = useState([]);
  const value = { categories };

  //adding data into firestore only once
  // useEffect(() => {
  //   addCollectionAndDoc("categories", SHOP_DATA, "title");
  // }, []);

  useEffect(() => {
    const getCategoriesData = async () => {
      const data = await getCategoriesAndDocument();
      setcategories(data);

    };
    getCategoriesData();
  }, []);
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
