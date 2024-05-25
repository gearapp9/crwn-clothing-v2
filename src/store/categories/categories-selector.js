import { createSelector } from "reselect";

const categoriesSlice = (state) => state.categories;

const categoriesSelectorMemo = createSelector(
  [categoriesSlice],
  (categoriesMemo) => categoriesMemo.categories
);

export const selectCategories = createSelector(
  [categoriesSelectorMemo],
  (categories) => 
   categories.reduce((acc, docSnapshot) => {
      const { title, items } = docSnapshot;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
  
);
