import { useContext } from "react";
import CartContext from "../../store/cart-context";
import FormMeal from "./FormMeal"
import classes from './UnitMeal.module.css';

const UnitMeal = (prop) => {
    const cartCtx = useContext(CartContext);

    const addMealItem = (amount) => {
        const i = {
            id: prop.meal.id,
            name: prop.meal.name,
            amount: amount,
            price: prop.meal.price,
        }
        // console.log(i);
        cartCtx.addItems(i)
        // console.log(cartCtx);
    }

    return (
        <li className={classes.meal}>
            <div>
                <h3>{prop.meal.name}</h3>
                <div className={classes.description}>{prop.meal.description}</div>
                <div className={classes.price}>{prop.meal.price}</div>
            </div>
            <div>
                <FormMeal id={prop.meal.id} onAdd={addMealItem}></FormMeal>
            </div>
        </li>
    );
}

export default UnitMeal;