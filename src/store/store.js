import { legacy_createStore, compose, applyMiddleware } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const middlewares = [logger];
const composedInhancers = compose(applyMiddleware(...middlewares));

const persistConfig = {
  key: "root",
  storage,
  blackList: ["user"],
};

const persistedRuder = persistReducer(persistConfig, rootReducer);

export const store = legacy_createStore(
  persistedRuder,
  undefined,
  composedInhancers
);

export const persistedStore = persistStore(store);
