import * as actionType from '../constants/productConstant';

export const getProductsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case actionType.GET_PRODUCTS_SUCCESS:
            return { products: action.payload, error: null };
        case actionType.GET_PRODUCTS_FAIL:
            return { products: [], error: action.payload };
        default:
            return state;
    }
};

export const getProductDetailsReducer = (state = { loading: false, product: {}, error: null }, action) => {
    switch (action.type) {
        case actionType.GET_PRODUCT_DETAILS_REQUEST:
            return { ...state, loading: true, error: null };
        case actionType.GET_PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload, error: null };
        case actionType.GET_PRODUCT_DETAILS_FAIL:
            return { loading: false, product: {}, error: action.payload };
        case actionType.GET_PRODUCT_DETAILS_RESET:
            return { loading: false, product: {}, error: null };
        default:
            return state;
    }
};