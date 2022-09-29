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

const store = configureStore({ reducer});
export default store;
