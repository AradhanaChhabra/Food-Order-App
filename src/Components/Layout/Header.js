import { Fragment } from "react";
import mealsImage from '../../assets/meals.jpg'
import CartButton from "./CartButton";
import classes from './Header.module.css'

export default function Header(prop) {
    return <Fragment>
        <header className={classes.header}>
            <h1>ReactMeals</h1>
            <CartButton show={prop.show}> </CartButton>
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImage} alt='A table full of delicious meals!'></img>
        </div>
    </Fragment>
}