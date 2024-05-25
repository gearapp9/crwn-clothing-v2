import { Fragment } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useSelector } from "react-redux";
import {
  selectCategories,
  selectIsLoading,
} from "../../store/categories/categories-selector";
import Spinner from "../../components/spinner/spinner.component";

const CategoriesPreview = () => {
  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectIsLoading);
  
  
  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categories).map((title) => {
          const products = categories[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })
      )}
    </Fragment>
  );
};

export default CategoriesPreview;
