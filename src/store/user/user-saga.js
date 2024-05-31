import { call, put, takeLatest, all } from "redux-saga/effects";
import { USER_ACTION_TYPES } from "./user-types";
import {
  createUserDocFromAuth,
  getUser,
  signWithGoogle,
  singInAuthUserWithEmailAndPass,
} from "../../utils/firebase.util";
import { singinFailed, singinSuccess } from "./user-actions";

function* getUserDocSnapshot(isUser, additionalInfo) {
  try {
    const userSnap = yield call(createUserDocFromAuth, isUser, additionalInfo);
    yield put(singinSuccess({ id: userSnap.id, ...userSnap.data() }));
  } catch (error) {
    yield put(singinFailed(error));
  }
}

function* isUserAuthenticated() {
  try {
    const isUser = yield call(getUser);
    if (!isUser) return;
    yield call(getUserDocSnapshot, isUser);
  } catch (error) {
    yield put(singinFailed(error));
  }
}

function* googleSignin() {
  try {
    const { user } = yield call(signWithGoogle);
    yield call(getUserDocSnapshot, user);
  } catch (error) {
    yield put(singinFailed(error));
  }
}

function* emailSignin({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      singInAuthUserWithEmailAndPass,
      email,
      password
    );
    yield call(getUserDocSnapshot, user);
  } catch (error) {
    yield put(singinFailed(error));
  }
}

export function* onCheckUser() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER, isUserAuthenticated);
}

export function* onGoogleSignin() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGNIN, googleSignin);
}

export function* onEmailSingin() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGNIN, emailSignin);
}



export function* userSaga() {
  yield all([call(onCheckUser), call(onGoogleSignin), call(onEmailSingin)]);
}
