import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  productListReducer,
  productDetailReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userLoginReducer, userRegisterReducer,userDetailReducer,updateProfileReducer } from "./reducers/userReducers";
const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails:userDetailReducer,
  userUpdateProfile:updateProfileReducer
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
  const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : null;
const preloadedState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress:shippingAddressFromStorage
  },
  userLogin: { userInfo: userInfoFromStorage },
  userRegister:{}
};
const store = configureStore({ reducer, preloadedState });
export default store;
