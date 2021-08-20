import { Fragment } from "react";
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = (prop) => {
    return (
        <div className={classes.backdrop} onClick={prop.onClose}></div>
    );
}

const Overlay = (prop) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{prop.children}</div>
        </div>
    )
}
const portalElement = document.getElementById("overlays");

export default function Modal(prop) {
    
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={prop.onClose}/>, portalElement)}
            {ReactDOM.createPortal(<Overlay>{prop.children}</Overlay>, portalElement)}
        </Fragment>
    );
}