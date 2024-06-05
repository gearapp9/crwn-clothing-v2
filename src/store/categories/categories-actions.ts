import { CATEGORIES_ACTIONS_TYPES, Category } from "./categories-types";
import {
  ActionWithPayload,
  createAction,
  Action,
} from "../../utils/reducer.util";
import { getCategoriesAndDocument } from "../../utils/firebase.util";

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

export type categoryActions =
  | FatchCategoriesStart
  | FatchCategoriesSuccess
  | FatchCategoriesFailed;

export const fatchCategoriesStart = (): FatchCategoriesStart =>
  createAction(CATEGORIES_ACTIONS_TYPES.SET_CATEGORIES_START);

export const fatchCategoriesSuccess = (
  categories: Category[]
): FatchCategoriesSuccess =>
  createAction(CATEGORIES_ACTIONS_TYPES.SET_CATEGORIES_SUCCESS, categories);

export const fatchCategoriesFailed = (error: Error): FatchCategoriesFailed =>
  createAction(CATEGORIES_ACTIONS_TYPES.SET_CATEGORIES_FAILED, error);
