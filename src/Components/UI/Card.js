import classes from "./Card.module.css"

export default function Card(prop) {
    return (
        <div className={classes.card}>
            {prop.children}
        </div>
    )
}