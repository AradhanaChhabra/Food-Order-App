import { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from '../Cart/CartIcon'

const CartButton = (prop) => {
    const cartCtx = useContext(CartContext);

    const noOfCartItems = cartCtx.items.reduce((currVal, item) => { return currVal + item.amount }, 0);
    return (
        <button onClick={prop.show}>
            <span><CartIcon onClose={prop.onClose}/></span>
            <span>Your Cart </span>
            <span>{noOfCartItems} </span>
        </button>
    );
}
export default CartButton;