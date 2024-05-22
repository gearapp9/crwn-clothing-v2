import { CATEGORIES_ACTIONS_TYPES } from "./categories-types";
import { createAction } from "../../utils/reducer.util";

export const setCategories = (categories) =>
  createAction(CATEGORIES_ACTIONS_TYPES.SET_CATEGORIES, categories);
