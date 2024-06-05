import { categoryActions } from "./categories-actions";
import { CATEGORIES_ACTIONS_TYPES, Category } from "./categories-types";

export type CategoriesState = {
  readonly categories : Category[],
  readonly isLoading:boolean,
  readonly error:Error | null
}


const INITIAL_STATE:CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (state = INITIAL_STATE, action = {} as categoryActions) => {
  

  switch (action.type) {
    case CATEGORIES_ACTIONS_TYPES.SET_CATEGORIES_START:
      return {
        ...state,
        isLoading: true,
      };

    case CATEGORIES_ACTIONS_TYPES.SET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        isLoading:false
      };

    case CATEGORIES_ACTIONS_TYPES.SET_CATEGORIES_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading:false
      };

    default:
      return state;
  }
};
