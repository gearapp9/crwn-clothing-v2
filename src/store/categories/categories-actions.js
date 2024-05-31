import { CATEGORIES_ACTIONS_TYPES } from "./categories-types";
import { createAction } from "../../utils/reducer.util";
import { getCategoriesAndDocument } from "../../utils/firebase.util";

export const fatchCategoriesStart = () =>
  createAction(CATEGORIES_ACTIONS_TYPES.SET_CATEGORIES_START);

export const fatchCategoriesSuccess = (categories) =>
  createAction(CATEGORIES_ACTIONS_TYPES.SET_CATEGORIES_SUCCESS, categories);

export const fatchCategoriesFailed = (categories) =>
  createAction(CATEGORIES_ACTIONS_TYPES.SET_CATEGORIES_FAILED, categories);
