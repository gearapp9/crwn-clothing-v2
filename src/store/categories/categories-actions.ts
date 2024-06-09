import { CATEGORIES_ACTIONS_TYPES, Category } from "./categories-types";
import {
  ActionWithPayload,
  createAction,
  Action,
  withMatcher,
} from "../../utils/reducer.util";

type FatchCategoriesStart =
  Action<CATEGORIES_ACTIONS_TYPES.SET_CATEGORIES_START>;
type FatchCategoriesSuccess = ActionWithPayload<
  CATEGORIES_ACTIONS_TYPES.SET_CATEGORIES_SUCCESS,
  Category[]
>;
type FatchCategoriesFailed = ActionWithPayload<
  CATEGORIES_ACTIONS_TYPES.SET_CATEGORIES_FAILED,
  Error
>;

export const fatchCategoriesStart = withMatcher(
  (): FatchCategoriesStart =>
    createAction(CATEGORIES_ACTIONS_TYPES.SET_CATEGORIES_START)
);

export const fatchCategoriesSuccess = withMatcher(
  (categories: Category[]): FatchCategoriesSuccess =>
    createAction(CATEGORIES_ACTIONS_TYPES.SET_CATEGORIES_SUCCESS, categories)
);

export const fatchCategoriesFailed = withMatcher(
  (error: Error): FatchCategoriesFailed =>
    createAction(CATEGORIES_ACTIONS_TYPES.SET_CATEGORIES_FAILED, error)
);
