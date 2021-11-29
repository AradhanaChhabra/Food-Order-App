import { useRef } from 'react';
import { useState } from 'react/cjs/react.development';
import classes from './CheckoutForm.module.css';

const Checkout = (prop) => {

    const nameRef = useRef();
    const streetRef = useRef();
    const postalRef = useRef();
    const cityRef = useRef();
    
    const notEmptyCheck = value => value.trim() !== '';
    const is6char = value => value.trim().length === 6;

    const [isFormValid, setIsFormValid] = useState({
        name: true,
        street: true,
        city: true,
        postal:true
    });

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameRef.current.value;
        const enteredStreet = streetRef.current.value;
        const enteredCity = cityRef.current.value;
        const enteredPostal = postalRef.current.value;

        const isNameValid = notEmptyCheck(enteredName);
        const isStreetvalid = notEmptyCheck(enteredStreet);
        const isCityValid = notEmptyCheck(enteredCity);
        const isPostalValid = is6char(enteredPostal);

        setIsFormValid({
            name: isNameValid,
            street: isStreetvalid,
            city: isCityValid,
            postal: isPostalValid
        });

        const formValidation = isNameValid && isPostalValid && isStreetvalid && isCityValid;

        if (!formValidation) {
            return;
        }
            
        prop.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postal:enteredPostal
        })

        };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
          <div className={`${classes.control} ${isFormValid.name?'':classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameRef} />
        {!isFormValid.name&&<p>Please enter a valid name</p>}
      </div>
      <div className={`${classes.control} ${isFormValid.street?'':classes.invalid}`}>
        <label htmlFor='street'>Street</label>
              <input type='text' id='street' ref={streetRef} />
              {!isFormValid.street&&<p>Please enter a valid street</p>}
      </div>
      <div className={`${classes.control} ${isFormValid.postal?'':classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
              <input type='text' id='postal' ref={postalRef} />
              {!isFormValid.postal&&<p>Postal code must be 6 digits long</p>}
      </div>
      <div className={`${classes.control} ${isFormValid.city?'':classes.invalid}`}>
        <label htmlFor='city'>City</label>
              <input type='text' id='city' ref={cityRef} />
              {!isFormValid.city&&<p>Please enter a valid city name</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={prop.onClose}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;