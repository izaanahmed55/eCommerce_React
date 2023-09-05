import {combineReducers} from 'redux'
import { 
    addToCart, 
    cartCounter, 
    productReducer, 
    selectedProductReducer,
    loggedInUser
} from './productReducer'

const reducers = combineReducers({
    allProducts: productReducer,
    product: selectedProductReducer,
    cart: addToCart,
    cartLength: cartCounter,
    username: loggedInUser,
});
 
export default reducers;