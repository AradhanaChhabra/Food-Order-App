import { useContext } from "react";
import CartContext from "../../store/cart-context";
import FormMeal from "./FormMeal"

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
        <li>
            <div>
                <h3>{prop.meal.name}</h3>
                <div>{prop.meal.description}</div>
                <div>{prop.meal.price}</div>
            </div>
            <div>
                <FormMeal id={prop.meal.id} onAdd={addMealItem}></FormMeal>
            </div>
        </li>
    );
}

export default UnitMeal;