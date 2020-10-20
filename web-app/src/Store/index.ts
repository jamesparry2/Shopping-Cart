import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import { shoppingCartReducer } from "./ShoppingCart/reducer";
import { IShoppingCartState } from "./ShoppingCart/types";
import thunk from "redux-thunk";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export interface IRootState {
  shoppingCart: IShoppingCartState;
}

const store = createStore<IRootState, any, any, any>(
  combineReducers({
    shoppingCart: shoppingCartReducer,
  }),
  compose(applyMiddleware(thunk), composeEnhancers())
);

export default store;
