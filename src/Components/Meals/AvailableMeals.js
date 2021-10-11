import Card from "../UI/Card";
import UnitMeal from "./UnitMeal";
import classes from './AvailableMeals.module.css'
import { useEffect, useState } from "react";

const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    // useEffect function cannot be async since it can return a clean up function which cannot be asyncronous
    // so we create a new function and then call it
    
    const fetchMeals = async () => {
      const response = await fetch("https://foodorder-f0f42-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json");
      if (!response.ok) {
        throw Error("Failed to fetch");
      }
      const data = await response.json();
      // response is a promise
      // putting json into an array
      const fetchedMealsData = [];
      for (let key in data) {
        fetchedMealsData.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price:data[key].price
        })
      }
      setMeals(fetchedMealsData);
      setIsLoading(false);
      console.log(data);
      console.log(fetchedMealsData) 
    }

    // ASYNC function will always return a promise 
    // so throwing an error inside a promise rejets it
    // so we can't use try catch unless we make it await and hense use effect async which is not allowed
    // since its a promise so we can use catch or then method with it
    fetchMeals().catch(error => {
      setIsLoading(false);
      setError(error.message);
    })
    
    },[]
  )

  if (isLoading) {
    return <section className={classes.mealsLoading}>
      <p>Loading...</p>
    </section>
  }
  if (error) {
    return <section className={classes.mealsError}>
      <p>{error}</p>
    </section>
  }
    const mealsList = meals.map((meal) => {
        return (<UnitMeal key={meal.id} meal={meal}/>);
    });
    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
}
export default AvailableMeals;