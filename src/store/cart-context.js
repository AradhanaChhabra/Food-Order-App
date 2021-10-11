import React from 'react';

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItems:() => { },
    removeItems: () => { },
    clearCart:()=>{}
});
export default CartContext;