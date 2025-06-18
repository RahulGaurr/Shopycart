import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { getProductsReducer, getProductDetailsReducer } from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';

const reducer = combineReducers({
    getProducts: getProductsReducer,
    getProductDetails: getProductDetailsReducer,
    cart: cartReducer, // Ensure cart reducer is under 'cart' key
});

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

export default store;