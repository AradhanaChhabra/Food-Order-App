import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultContextValue = {
    items: [],
    totalAmount: 0,
}
const CartContextReducer = (prevState, action) => {
    if (action.identifier === 'ADD') {
        const totalToAdd = prevState.totalAmount + (action.item.price * action.item.amount);
        const indexItem = prevState.items.findIndex((i) =>  i.id === action.item.id );
        const existingItem = prevState.items[indexItem]
        // console.log(existingItem);
        let itemToAdd;
        if (existingItem) {
            itemToAdd = [...prevState.items];
            const addItem = action.item;
            // console.log(addItem);
            itemToAdd[indexItem]={...existingItem,amount:existingItem.amount+addItem.amount}
        } else {
            itemToAdd = prevState.items.concat(action.item);
        }
        return {
            items: itemToAdd,
            totalAmount:totalToAdd
        }
    }
    // remove case
    if (action.identifier === 'REMOVE') {
        const indexItem = prevState.items.findIndex((i) => i.id === action.id);
        const existingItem = prevState.items[indexItem];
        const totalToAdd = prevState.totalAmount - existingItem.price;
        let itemToAdd;
        if (existingItem.amount === 1) {
            itemToAdd = prevState.items.filter((item) => item.id !== action.id);
        }
        else {
            itemToAdd = [...prevState.items];
            itemToAdd[indexItem]={...existingItem,amount:existingItem.amount-1}
        }
        return {
            items: itemToAdd,
            totalAmount:totalToAdd
        }

    }
    if (action.identifier === "CLEAR") {
        return defaultContextValue;
    }
    return defaultContextValue;
}

const CartContextProvider = (prop) => {
    const [cartState, dispacthCart] = useReducer(CartContextReducer, defaultContextValue);

    const addItemsHandler = (item) => {
        dispacthCart({
            identifier: 'ADD',
            item:item
        })
    }

    const removeItemsHandler = (id) => {
        dispacthCart({
            identifier: 'REMOVE',
            id:id
        })
    }

    const clearCartHandler = () => {
        dispacthCart({ identifier: "CLEAR" });
    }
    
    const contextValue = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItems:addItemsHandler ,
        removeItems: removeItemsHandler,
        clearCart:clearCartHandler
    }

    return (
        <CartContext.Provider value={contextValue}>
            {prop.children}
        </CartContext.Provider>
    )
}
export default CartContextProvider;