import { ActionTypes } from "../constants/action-types";

const initialState = {
  products: [],
  cart: {},
  Items: {},
  Len: 0,
  loggedInUser: {}
};

export const productReducer = (state = initialState.products, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return { ...state, products: payload };
    default:
      return state;
  }
};

export const selectedProductReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SELECTED_PRODUCT:
      return { ...state, ...payload };
    case ActionTypes.REMOVE_SELECTED_PRODUCT:
      return {};
    default:
      return state;
  }
};


export const addToCart = (state = initialState.cart, { type, payload }) => {

  switch (type) {
    case ActionTypes.ADD_TO_CART:
      return {
        ...state,
        Items: {
          ...state.Items,
          [payload.name]: payload.value,
      },
    };

    case ActionTypes.REMOVE_FROM_CART:
      return state;
    
    default:
      return state;
  }
};

export const cartCounter = (state = initialState.Len, { type, payload }) => {
  switch (type) {
    case ActionTypes.CART_COUNTER:
      return{
        payload
      }
    default:
      return state
  }
}

