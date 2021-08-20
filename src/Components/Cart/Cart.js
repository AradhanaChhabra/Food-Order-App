import { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import UnitCartItem from "./UnitCartItem";
import classes from './Cart.module.css';

const Cart = (prop) => {
    const cartCtx = useContext(CartContext);

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

    return (
        <Modal onClose={prop.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount </span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={prop.onClose}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart;