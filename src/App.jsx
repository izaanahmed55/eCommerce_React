import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductListing from './components/ProductListing'
import ProductDetails from './components/ProductDetail'
import Header from './components/Header'
import Cart from './components/Cart'
import CheckOut from './components/CheckOut'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import { useEffect } from 'react'

function App() {

  useEffect(() => {
    window.localStorage.clear();
  }, []);

  return (
    <div className='App'>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' exact Component={ProductListing}/>
          <Route path='/product/:productId' Component={ProductDetails}/>
          <Route path='/cart' Component={Cart}/>
          <Route path='/checkout' Component={CheckOut}/>
          <Route path='/signin' Component={SignIn}/>
          <Route path='/signup' Component={SignUp}/>
          <Route> 404 Not Found! </Route> 
        </Routes>
      </Router>
    </div>
  )
}

export default App
