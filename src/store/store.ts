import { legacy_createStore, compose, applyMiddleware ,Middleware} from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";
import { persistReducer, persistStore,PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";

import createSagaMiddleware from "redux-saga"
import {rootSaga} from "./root-saga"

export type RootState = ReturnType<typeof rootReducer>


const sagaMiddleware = createSagaMiddleware();

const middleWares = [
  process.env.NODE_ENV === "development" && logger,
  sagaMiddleware,
].filter((middleware):middleware is Middleware=> Boolean(middleware));

const composedInhancers = compose(applyMiddleware(...middleWares));

type ExtendePersist = PersistConfig<RootState> &{
  whitelist:(keyof RootState)[]
}

const persistConfig:ExtendePersist = {
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
