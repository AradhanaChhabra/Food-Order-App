import { Fragment } from "react";
import mealsImage from '../../assets/meals.jpg'
import CartButton from "./CartButton";

export default function Header(prop) {
    return <Fragment>
        <header>
            <h1>ReactMeals</h1>
            <CartButton show={prop.show}> </CartButton>
        </header>
        <div>
            <img src={mealsImage} alt='A table full of delicious meals!'></img>
        </div>
    </Fragment>
}