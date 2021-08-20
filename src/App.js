import { useState } from 'react';
import Header from './Components/Layout/Header';
import Meals from './Components/Meals/Meals';
import Cart from './Components/Cart/Cart';
import CartContextProvider from './store/CartContextProvider';

function App() {
  const [cartState, setCartState] = useState(false);

  const hideCart = () => {
    setCartState(false);
  }

  const showCart = () => {
    setCartState(true);
  }

  return (
  <CartContextProvider>
      {cartState && <Cart onClose={hideCart}/>}
      <Header show={showCart}/>
      <Meals></Meals>
    </CartContextProvider>
  );
}

export default App;
