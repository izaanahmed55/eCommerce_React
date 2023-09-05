import { ActionTypes } from "../constants/action-types"

export const setProducts = (products) => {
    return {
        type: ActionTypes.SET_PRODUCTS,
        payload: products,
    }
}

export const selectedProduct = (product) => {
    return {
        type: ActionTypes.SELECTED_PRODUCT,
        payload: product,
    }
}

export const removeSelectedProduct = () => {
    return {
        type: ActionTypes.REMOVE_SELECTED_PRODUCT
    }
}

export const addToCart = (cart) => {
    return {
        type: ActionTypes.ADD_TO_CART,
        payload: cart,
    }
}

export const cartCounter = (cartLength) => {
    return {
        type: ActionTypes.CART_COUNTER,
        payload: cartLength,
    }
} 

export const loggedInUser = (username) => {
    return {
        type: ActionTypes.LOGGED_IN_USER,
        payload: username,
    }
}