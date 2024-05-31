import { USER_ACTION_TYPES } from "./user-types";
import { createAction } from "../../utils/reducer.util";

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SIGNIN_SUCCESS, user);

export const checkUser = () => createAction(USER_ACTION_TYPES.CHECK_USER);

export const googleSignin = () => createAction(USER_ACTION_TYPES.GOOGLE_SIGNIN);

export const emailSignin = (email, password) =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGNIN, { email, password });

export const singinSuccess = (user) =>
  createAction(USER_ACTION_TYPES.SIGNIN_SUCCESS, user);

export const singinFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGNIN_FAILED, error);

export const singup = (email, password, dispalyName) =>
  createAction(USER_ACTION_TYPES.SIGNUP);
