import { useContext ,useState,useEffect} from "react";
import CartContext from "../../store/cart-context";
import CartIcon from '../Cart/CartIcon'
import classes from './CartButton.module.css'

const CartButton = (prop) => {
    const cartCtx = useContext(CartContext);
    const noOfCartItems = cartCtx.items.reduce((currVal, item) => { return currVal + item.amount }, 0);

    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const { items } = cartCtx;
    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

        useEffect(() => {
            if (items.length === 0) {
            return;
            }
            setBtnIsHighlighted(true);

            const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
            }, 300);

            return () => {
            clearTimeout(timer);
            };
        }, [items]);
    
    
    return (
        <button onClick={prop.show} className={btnClasses}>
            <span className={classes.icon}><CartIcon onClose={prop.onClose}/></span>
            <span>Your Cart </span>
            <span className={classes.badge}>{noOfCartItems} </span>
        </button>
    );
}
export default CartButton;