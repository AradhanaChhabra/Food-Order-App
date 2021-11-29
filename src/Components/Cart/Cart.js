import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import UnitCartItem from "./UnitCartItem";
import classes from './Cart.module.css';
import CheckoutForm from "./CheckoutForm";
import { useState } from "react/cjs/react.development";

const Cart = (prop) => {
    const cartCtx = useContext(CartContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
    const [checkout, setCheckOut] = useState(false);

    const onRemoveHandler = (id) => {
        cartCtx.removeItems(id);
    }
    const onAddHandler = (item) => {
        cartCtx.addItems({ ...item, amount: 1 });
    }
    
    const cartItems =(<ul className={classes['cart-items']}> {
        cartCtx.items.map((item) => {
            return (
                <UnitCartItem
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    amount={item.amount}
                    onRemove={onRemoveHandler.bind(null,item.id)}
                    onAdd={onAddHandler.bind(null,item)}
                />
            )
        })
    }</ul>);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const orderHandler = () => {
        setCheckOut(true);
    }
    const confirmHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://foodorder-f0f42-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setIsOrderConfirmed(true);
        cartCtx.clearCart();
    }
    const modalActions=<div className={classes.actions}>
                    <button className={classes['button--alt']} onClick={prop.onClose}>Close</button>
                     {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
                    </div>    

    const modalContent = (<React.Fragment>{cartItems}
        <div className={classes.total}>
            <span>Total Amount </span>
            <span>{totalAmount}</span>
        </div>
        {checkout && <CheckoutForm onConfirm={confirmHandler} onClose={prop.onClose} />}
        {!checkout && modalActions}
    </React.Fragment>);

    const submittedText = (<React.Fragment>
        <p>ORDER DONE.</p>
        <div className={classes.actions}>
        <button className={classes['button']} onClick={prop.onClose}>Close</button>
        </div>
    </React.Fragment>
    );
    
    return (
        <Modal onClose={prop.onClose}>
            {!isSubmitting && !isOrderConfirmed && modalContent}
            {isSubmitting && <p>ORDER SUBMITIING...</p>}
            {isOrderConfirmed&&submittedText}
        </Modal>
    )
}

export default Cart;