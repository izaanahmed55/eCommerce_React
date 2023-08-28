import {combineReducers} from 'redux'
import { 
    addToCart, 
    cartCounter, 
    productReducer, 
    selectedProductReducer 
} from './productReducer'

const reducers = combineReducers({
    allProducts: productReducer,
    product: selectedProductReducer,
    cart: addToCart,
    cartLength: cartCounter,
});
 
export default reducers;