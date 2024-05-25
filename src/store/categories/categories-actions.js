import { CATEGORIES_ACTIONS_TYPES } from "./categories-types";
import { createAction } from "../../utils/reducer.util";
import {getCategoriesAndDocument} from "../../utils/firebase.util"

const fatchCategoriesStart = () => 
  createAction(CATEGORIES_ACTIONS_TYPES.SET_CATEGORIES_START);

const fatchCategoriesSuccess = (categories) =>
  createAction(CATEGORIES_ACTIONS_TYPES.SET_CATEGORIES_SUCCESS, categories);

const fatchCategoriesFailed = (categories) =>
  createAction(CATEGORIES_ACTIONS_TYPES.SET_CATEGORIES_FAILED, categories);

export const fatchCategoriesAsync = () => async (dispatch) => {
  dispatch(fatchCategoriesStart());
  try {
    const data = await getCategoriesAndDocument();
    dispatch(fatchCategoriesSuccess(data));
  } catch (error) {
    console.log("e");
    dispatch(fatchCategoriesFailed(error));
  }
};
