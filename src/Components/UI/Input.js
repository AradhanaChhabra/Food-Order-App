import React from 'react';
import classes from "./Input.module.css"

const Input = React.forwardRef((prop,ref) => {
    return (
        <div className={classes.input}>
            <label htmlFor={prop.input.id}>{prop.label}</label>
            <input ref={ref} {...prop.input} />
        </div>
    );
});

export default Input;