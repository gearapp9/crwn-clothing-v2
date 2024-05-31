import { call, put, takeLatest, all } from "redux-saga/effects";
import { USER_ACTION_TYPES } from "./user-types";
import {
  createAuthUserWithEmailAndPass,
  createUserDocFromAuth,
  getUser,
  signWithGoogle,
  signInAuthUserWithEmailAndPass,
  signOutUser,
} from "../../utils/firebase.util";
import {
  signinFailed,
  signinSuccess,
  signoutFailed,
  signoutSuccess,
  signupFailed,
  signupSuccess,
} from "./user-actions";

function* getUserDocSnapshot(isUser, additionalInfo) {
  try {
    const userSnap = yield call(createUserDocFromAuth, isUser, additionalInfo);
    yield put(signinSuccess({ id: userSnap.id, ...userSnap.data() }));
  } catch (error) {
    yield put(signinFailed(error));
  }
}

function* isUserAuthenticated() {
  try {
    const isUser = yield call(getUser);
    if (!isUser) return;
    yield call(getUserDocSnapshot, isUser);
  } catch (error) {
    yield put(signinFailed(error));
  }
}

function* googleSignin() {
  try {
    const { user } = yield call(signWithGoogle);
    yield call(getUserDocSnapshot, user);
  } catch (error) {
    yield put(signinFailed(error));
  }
}

function* emailSignin({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPass,
      email,
      password
    );
    yield call(getUserDocSnapshot, user);
  } catch (error) {
    yield put(signinFailed(error));
  }
}
function* signup({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPass,
      email,
      password
    );
    yield put(signupSuccess(user, { displayName }));
  } catch (error) {
    yield put(signupFailed(error));
  }
}

function* signinAfterSignup({ payload: { user, additionalInfo } }) {
  yield call(getUserDocSnapshot, user, additionalInfo);
}

function* signout() {
  try {
    yield call(signOutUser);
    yield put(signoutSuccess());
  } catch (error) {
    yield put(signoutFailed(error));
  }
}

export function* onCheckUser() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER, isUserAuthenticated);
}

export function* onGoogleSignin() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGNIN, googleSignin);
}

export function* onEmailSignin() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGNIN, emailSignin);
}

export function* onSignup() {
  yield takeLatest(USER_ACTION_TYPES.SIGNUP, signup);
}

export function* onSignupSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGNUP_SUCCESS, signinAfterSignup);
}

export function* onSignout() {
  yield takeLatest(USER_ACTION_TYPES.SIGNOUT, signout);
}

export function* userSaga() {
  yield all([
    call(onCheckUser),
    call(onGoogleSignin),
    call(onEmailSignin),
    call(onSignup),
    call(onSignupSuccess),
    call(onSignout)
  ]);
}
