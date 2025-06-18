import * as actionTypes from '../constants/cartConstants';

export const addToCart = (id, product) => (dispatch) => {
    try {
        dispatch({
            type: actionTypes.ADD_TO_CART,
            payload: { id, ...product, quantity: 1 },
        });
    } catch (error) {
        dispatch({
            type: actionTypes.ADD_TO_CART_ERROR,
            payload: error.message,
        });
    }
};

export const removeFromCart = (id) => (dispatch) => {
    dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        payload: id,
    });
};

export const cartReset = () => (dispatch) => {
    dispatch({
        type: actionTypes.CART_RESET,
    });
};

export const incrementQuantity = (id) => (dispatch) => {
    dispatch({
        type: actionTypes.INCREMENT_QUANTITY,
        payload: id,
    });
};

export const decrementQuantity = (id) => (dispatch) => {
    dispatch({
        type: actionTypes.DECREMENT_QUANTITY,
        payload: id,
    });
};