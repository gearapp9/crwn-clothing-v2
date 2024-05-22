import { USER_ACTION_TYPES } from "../../contexts/user.context";
import { createAction } from "../../utils/reducer.util";


export const setCurrentUser = (user) => 
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

