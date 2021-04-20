import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AnimatePresence } from "framer-motion";
import Home from './Pages/Home';
import About from './Pages/About';
import Howitworks from './Pages/Howitworks';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ProductDescription from './Pages/ProductDescription';
import Cart from './Pages/Cart';
import Dashboard from './Dashboard/Dashboard';
import StoreRoute from './HOC/StoreRoute';
import Inventory from './Dashboard/Inventory';
import Orders from './Dashboard/Orders';
import BecomeASeller from './Pages/BecomeASeller';
import Account from './Dashboard/Account';
import SellerLogin from './Pages/SellerLogin';
import PrivateRoute from './HOC/PrivateRoute';
import Shop from './Pages/Shop';
import Upgrade from './Dashboard/Upgrade';
import ShopAbout from './Pages/ShopAbout';
import ShopReviews from './Pages/ShopReviews';
import { useEffect } from 'react';
import { useStateValue } from './StateContext/StateProvider';
import useDarkMode from './Helpers/useDarkMode';


function App() {
  useDarkMode()
  const [{ }, dispatch] = useStateValue()

  useEffect(() => {
    localStorage.setItem('zomcurrency', 'zwl')

    dispatch({
      type: 'SET_CURRENCY',
      currency: 'zwl'
    })
  }, [])

  return (
    <BrowserRouter>
      <AnimatePresence>
        <Switch>
          <PrivateRoute path='/sellerlogin' component={SellerLogin} />
          <PrivateRoute path='/becomeaseller' component={BecomeASeller} />
          <StoreRoute path='/dashboard' component={Dashboard} />
          <StoreRoute path='/account' component={Account} />
          <StoreRoute path='/orders' component={Orders} />
          <StoreRoute path='/upgrade' component={Upgrade} />
          <StoreRoute path='/inventory' component={Inventory} />
          <Route path='/about' component={About} />
          <Route path='/shopabout' component={ShopAbout} />
          <Route path='/shopreviews' component={ShopReviews} />
          <Route path='/shop/:account' component={Shop} />
          <Route path='/cart' component={Cart} />
          <Route path='/description' component={ProductDescription} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/howitworks' component={Howitworks} />
          <Route exact path='/' component={Home} />
        </Switch>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;
