import { legacy_createStore, compose, applyMiddleware } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

const middlewares = [logger];
const composedInhancers = compose(applyMiddleware(...middlewares));

export const store = legacy_createStore(
  rootReducer,
  undefined,
  composedInhancers
);
