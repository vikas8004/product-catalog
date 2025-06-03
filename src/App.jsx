import { lazy } from 'react';
import Navbar from './components/Navbar';
const Home = lazy(() => import("./pages/Home"))
import { Route, Routes } from 'react-router-dom';
const CartItemsList = lazy(() => import("./components/CartItemsList"));
import { Suspense } from 'react';
import LoadingSpinner from './components/LoadingSpinner';

function App() {


  return (
    <>
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart-items-list' element={<CartItemsList />} />
        </Routes>
      </Suspense>

    </>
  );
}

export default App;
