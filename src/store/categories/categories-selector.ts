import { createSelector } from "reselect";
import { CategoryMap } from "./categories-types";
import { CategoriesState } from "./categories-reducer";
import { RootState } from "../store";
const categoriesSlice = (state:RootState): CategoriesState => state.categories;

const categoriesSelectorMemo = createSelector(
  [categoriesSlice],
  (categoriesMemo) => categoriesMemo.categories
);

export const selectCategories = createSelector(
  [categoriesSelectorMemo],
  (categories): CategoryMap =>
    categories.reduce((acc, docSnapshot) => {
      const { title, items } = docSnapshot;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap)
);

export const selectIsLoading = createSelector(
  [categoriesSlice],
  (categories) => categories.isLoading
);
