import React, { useReducer, useContext, createContext } from 'react';

// Two Contexts: One for the Data (State), one for the Actions (Dispatch)
const CartStateContext = createContext(); //This is the ReadOnly frequency. It only broadcasts the current list of items in the cart.
const CartDispatchContext = createContext();//This is the Control frequency. It provides the dispatch function so components can send commands

// The Reducer: The "Rules" for how the cart changes
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            // Check if item with same ID and size already exists in the cart
            const existingIdx = state.findIndex(item => item.id === action.id && item.size === action.size);
            if (existingIdx > -1) {
                let updatedArr = [...state];
                updatedArr[existingIdx] = {
                    ...updatedArr[existingIdx],
                    qty: parseInt(updatedArr[existingIdx].qty) + parseInt(action.qty),
                    price: updatedArr[existingIdx].price + action.price
                };
                return updatedArr;
            }
            return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }]
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
        case "DROP":
            let emptyArray = []
            return emptyArray
        default:
            console.log("Error in Reducer");
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []); //This initializes your cart with empty array[] , state is the list of items , dispatch is the function used to trigger the reducer.
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children} {/*You are "wrapping" the children in two layers of protection. Any child inside now has access to both the Data (state) and the Commands (dispatch).*/}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);