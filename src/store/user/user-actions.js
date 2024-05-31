import { USER_ACTION_TYPES } from "./user-types";
import { createAction } from "../../utils/reducer.util";

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SIGNIN_SUCCESS, user);

export const checkUser = () => createAction(USER_ACTION_TYPES.CHECK_USER);

export const googleSignin = () => createAction(USER_ACTION_TYPES.GOOGLE_SIGNIN);

export const emailSignin = (email, password) =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGNIN, { email, password });

export const signinSuccess = (user) =>
  createAction(USER_ACTION_TYPES.SIGNIN_SUCCESS, user);

export const signinFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGNIN_FAILED, error);

export const signup = (email, password, displayName) =>
  createAction(USER_ACTION_TYPES.SIGNUP, { email, password, displayName });

export const signupSuccess = (user, additionalInfo) =>
  createAction(USER_ACTION_TYPES.SIGNUP_SUCCESS, { user, additionalInfo });

export const signupFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGNUP_FAILED, error);

export const signout = () => createAction(USER_ACTION_TYPES.SIGNOUT);

export const signoutSuccess = () =>
  createAction(USER_ACTION_TYPES.SIGNOUT_SUCCESS);
export const signoutFailed = () =>
  createAction(USER_ACTION_TYPES.SIGNOUT_FAILED);
