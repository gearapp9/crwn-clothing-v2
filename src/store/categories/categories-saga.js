import { all, call, takeLatest, put } from "redux-saga/effects";
import {
  fatchCategoriesFailed,
  fatchCategoriesSuccess,
} from "./categories-actions";
import { CATEGORIES_ACTIONS_TYPES } from "./categories-types";
import { getCategoriesAndDocument } from "../../utils/firebase.util";

function* fatchCategoriesAsyncy() {
  try {
    const data = yield call(getCategoriesAndDocument);
    yield put(fatchCategoriesSuccess(data));
  } catch (error) {
    yield put(fatchCategoriesFailed(error));
  }
}

function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTIONS_TYPES.SET_CATEGORIES_START,
    fatchCategoriesAsyncy
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
