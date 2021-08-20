import React from 'react';

const Input = React.forwardRef((prop,ref) => {
    return (
        <div>
            <label htmlFor={prop.input.id}>{prop.label}</label>
            <input ref={prop.ref} {...prop.input} />
        </div>
    );
});

export default Input;