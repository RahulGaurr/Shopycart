import * as actionTypes from '../constants/cartConstants';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('cartItems');
        if (!serializedState) return { cartItems: [], error: null };
        const parsedState = JSON.parse(serializedState);
        return Array.isArray(parsedState) ? { cartItems: parsedState, error: null } : { cartItems: [], error: null };
    } catch (err) {
        console.error('Error loading cart state:', err);
        return { cartItems: [], error: null };
    }
};

const saveState = (cartItems) => {
    try {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (err) {
        console.error('Error saving cart state:', err);
    }
};

const initialState = loadState();

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.id === item.id);

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x =>
                        x.id === existItem.id ? { ...x, quantity: x.quantity + 1 } : x
                    ),
                    error: null,
                };
            }
            return {
                ...state,
                cartItems: [...state.cartItems, { ...item, quantity: 1 }],
                error: null,
            };
        case actionTypes.ADD_TO_CART_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.id !== action.payload),
                error: null,
            };
        case actionTypes.CART_RESET:
            const resetState = { cartItems: [], error: null };
            saveState(resetState.cartItems);
            return resetState;
        case actionTypes.INCREMENT_QUANTITY:
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
                ),
                error: null,
            };
        case actionTypes.DECREMENT_QUANTITY:
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.id === action.payload && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                ),
                error: null,
            };
        default:
            return state;
    }
};

export default cartReducer;