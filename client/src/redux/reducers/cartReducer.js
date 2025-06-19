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

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state.cartItems);
        localStorage.setItem('cartItems', serializedState);
    } catch (err) {
        console.error('Error saving cart state:', err);
    }
};

const initialState = loadState();

const cartReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.id === item.id);

            if (existItem) {
                newState = {
                    ...state,
                    cartItems: state.cartItems.map(x =>
                        x.id === existItem.id ? { ...x, quantity: x.quantity + 1 } : x
                    ),
                    error: null,
                };
            } else {
                newState = {
                    ...state,
                    cartItems: [...state.cartItems, { ...item, quantity: 1 }],
                    error: null,
                };
            }
            saveState(newState); // Save state after adding to cart
            return newState;
        case actionTypes.ADD_TO_CART_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case actionTypes.REMOVE_FROM_CART:
            newState = {
                ...state,
                cartItems: state.cartItems.filter(x => x.id !== action.payload),
                error: null,
            };
            saveState(newState); // Save state after removing from cart
            return newState;
        case actionTypes.CART_RESET:
            newState = {
                ...initialState, // Reset to initial state
            };
            saveState(newState); // Save the reset state
            return newState;
        case actionTypes.INCREMENT_QUANTITY:
            newState = {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
                ),
                error: null,
            };
            saveState(newState); // Save state after incrementing
            return newState;
        case actionTypes.DECREMENT_QUANTITY:
            newState = {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.id === action.payload && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                ),
                error: null,
            };
            saveState(newState); // Save state after decrementing
            return newState;
        default:
            return state;
    }
};

export default cartReducer;