import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  productListReducer,
  productDetailReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart:cartReducer
});
const cartItemsFromStorage=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
const initialState={cart:{cartItems:cartItemsFromStorage}}
const store = configureStore({ reducer,preloadedState: initialState });
export default store;
