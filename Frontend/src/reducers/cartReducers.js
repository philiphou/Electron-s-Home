import { CART_ADD_ITEM, CART_DELETE_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      const existItem = state.cartItems.find((e) => e.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((e) =>
            e.product === existItem.product ? item : e
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
      default:
        return state
  }
 
};
