import { useRef, useState } from "react";
import Input from "../UI/Input"
import classes from "./FormMeal.module.css"

export default function FormMeal(prop) {

    const amountRef = useRef();
    const [amountValid, setAmountState] = useState(true);

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredAmountString = amountRef.current.value;
        const enteredAmount = +enteredAmountString;
        // first null/empty check
        // enteredAmount.trim().length === 0 ||
        if ( enteredAmount < 1 || enteredAmount > 6) {
            setAmountState(false);
            return;
        }
        prop.onAdd(enteredAmount);
        
    }

    
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                ref={amountRef}
                label='Amount'
                input={
                {
                    id: 'amount_'+ prop.id,
                    type:'number',
                    min:'1',
                    max:'6',
                    step: '1',
                    defaultValue:'1'
                }
            }/>
            <button>+ Add</button>
            {!amountValid && <p>Please enter a valid amount (1-6)</p>}
        </form>
    )
}