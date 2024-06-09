import { AnyAction } from "redux-saga";
import { USER_ACTION_TYPES } from "./user-types";
import {
  signoutSuccess,
  signinSuccess,
  signinFailed,
  signupFailed,
  signoutFailed,
} from "./user-actions";
import { UserData } from "../../utils/firebase.util";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isloading: boolean;
  readonly error: Error | null;
};

const INITIAL_STATE: UserState = {
  currentUser: null,
  isloading: false,
  error: null,
};

export const userReducer = (
  state = INITIAL_STATE,
  action: AnyAction
): UserState => {
  if (signinSuccess.match(action)) {
    return {
      ...state,
      currentUser: action.payload,
    };
  }

  if (signinSuccess.match(action) || signoutSuccess.match(action)) {
    return {
      ...state,
      currentUser: null,
    };
  }

  if (
    signinFailed.match(action) ||
    signupFailed.match(action) ||
    signoutFailed.match(action)
  ) {
    return {
      ...state,
      error: action.payload,
    };
  }

  return state;
};
