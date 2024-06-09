import { USER_ACTION_TYPES } from "./user-types";
import {
  Action,
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer.util";
import { AdditionalInfo, UserData } from "../../utils/firebase.util";

type SetCurrentUser = ActionWithPayload<
  USER_ACTION_TYPES.SIGNIN_SUCCESS,
  UserData
>;
type CheckUser = Action<USER_ACTION_TYPES.CHECK_USER>;
type GoogleSignin = Action<USER_ACTION_TYPES.GOOGLE_SIGNIN>;
type EmailSignin = ActionWithPayload<
  USER_ACTION_TYPES.EMAIL_SIGNIN,
  { email: string; password: string }
>;
type SigninSuccess = ActionWithPayload<
  USER_ACTION_TYPES.SIGNIN_SUCCESS,
  UserData
>;
type SigninFailed = ActionWithPayload<USER_ACTION_TYPES.SIGNIN_FAILED, Error>;
type Signup = ActionWithPayload<
  USER_ACTION_TYPES.SIGNUP,
  { email: string; password: string; displayName: string }
>;
type SignupSuccess = ActionWithPayload<
  USER_ACTION_TYPES.SIGNUP_SUCCESS,
  { user: UserData; additionalInfo: AdditionalInfo }
>;
type SignupFailed = ActionWithPayload<USER_ACTION_TYPES.SIGNUP_FAILED, Error>;
type Signout = Action<USER_ACTION_TYPES.SIGNOUT>;
type SignoutSuccess = Action<USER_ACTION_TYPES.SIGNOUT_SUCCESS>;
type SignoutFailed = ActionWithPayload<USER_ACTION_TYPES.SIGNOUT_FAILED,Error>;

export const setCurrentUser = withMatcher(
  (user: UserData): SetCurrentUser =>
    createAction(USER_ACTION_TYPES.SIGNIN_SUCCESS, user)
);

export const checkUser = withMatcher(
  (): CheckUser => createAction(USER_ACTION_TYPES.CHECK_USER)
);

export const googleSignin = withMatcher(
  (): GoogleSignin => createAction(USER_ACTION_TYPES.GOOGLE_SIGNIN)
);

export const emailSignin = withMatcher(
  (email: string, password: string): EmailSignin =>
    createAction(USER_ACTION_TYPES.EMAIL_SIGNIN, { email, password })
);

export const signinSuccess = withMatcher(
  (user: UserData): SigninSuccess =>
    createAction(USER_ACTION_TYPES.SIGNIN_SUCCESS, user)
);

export const signinFailed = withMatcher(
  (error: Error): SigninFailed =>
    createAction(USER_ACTION_TYPES.SIGNIN_FAILED, error)
);

export const signup = withMatcher(
  (email: string, password: string, displayName: string): Signup =>
    createAction(USER_ACTION_TYPES.SIGNUP, { email, password, displayName })
);

export const signupSuccess = withMatcher(
  (user: UserData, additionalInfo: AdditionalInfo): SignupSuccess =>
    createAction(USER_ACTION_TYPES.SIGNUP_SUCCESS, { user, additionalInfo })
);

export const signupFailed = withMatcher(
  (error: Error): SignupFailed =>
    createAction(USER_ACTION_TYPES.SIGNUP_FAILED, error)
);

export const signout = withMatcher(
  (): Signout => createAction(USER_ACTION_TYPES.SIGNOUT)
);

export const signoutSuccess = withMatcher(
  (): SignoutSuccess => createAction(USER_ACTION_TYPES.SIGNOUT_SUCCESS)
);
export const signoutFailed = withMatcher(
  (error: Error): SignoutFailed => createAction(USER_ACTION_TYPES.SIGNOUT_FAILED,error)
);
