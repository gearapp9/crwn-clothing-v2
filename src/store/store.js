import { legacy_createStore, compose, applyMiddleware } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import createSagaMiddleware from "redux-saga"
import {rootSaga} from "./root-saga"


const sagaMiddleware = createSagaMiddleware();

const middleWares = [
  process.env.NODE_ENV === "development" && logger,
  sagaMiddleware,
].filter(Boolean);

const composedInhancers = compose(applyMiddleware(...middleWares));
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedRuder = persistReducer(persistConfig, rootReducer);

export const store = legacy_createStore(
  persistedRuder,
  undefined,
  composedInhancers
);

sagaMiddleware.run(rootSaga);

export const persistedStore = persistStore(store);
