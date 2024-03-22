import React from 'react';
import AppHeader from './components/app-header/app-header';
import './App.css';
import Modal from './components/modal/modal';
import IngredientDetails from './components/ingredient-details/ingredient-details';
import OrderDetails from './components/order-details/order-details';
import { fetchIngredients } from './services/ingredients';
import { useDispatch, useSelector } from 'react-redux';
import { closeIngredient, closeModal, hideIngredient } from './services/modals';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Index, Login, Register, ForgotPassword, ResetPassword } from './pages';
import { Profile } from './pages/profile';
import { Menu } from './components/menu/menu';
import Orders from './pages/orders';
import Protect from './components/protect';
import { Ingredient } from './pages/ingredient';


function App() {

  const { ingredients, loading } = useSelector((store) => store.ingredients);
  const dispatcher = useDispatch();

  React.useEffect(() => {
    dispatcher(fetchIngredients());
  }, []);

  const { orderVisible, itemVisible } = useSelector(store => store.modals);
  React.useEffect(() => {
    if ("hidden" === itemVisible) {
      dispatcher(closeIngredient());
    };
  }, [itemVisible]);    


  return (
    <Router>
      {itemVisible === "hidden" ? <Navigate to="/" />  : <></>}
      <div className='container'>
          <header className='header'><AppHeader /></header>
          <Routes>
            <Route path="/" element={ <Index ingredients={ingredients} /> } />
            <Route path="/login" element={ <Protect element={<Login />} authorized={false} to="/" /> } />
            <Route path="/register" element={ <Protect element={<Register />} authorized={false} to="/" /> } />
            <Route path="/forgot-password" element={ <Protect element={<ForgotPassword />} authorized={false} to="/" /> } />
            <Route path="/reset-password" element={ <Protect element={<ResetPassword />} authorized={false} to="/" /> } />
            <Route path="/profile" element={ <Protect element={<Menu hint="В этом разделе вы можете изменить свои персональные данные"><Profile /></Menu>} authorized={true} to="/login" /> }  />
            <Route path="/profile/orders" element={ <Protect element={<Menu><Orders /></Menu>} authorized={true} to="/login" /> }  />
            <Route path="/ingredients/:id" element={ itemVisible ? <Index ingredients={ingredients} /> : <Ingredient /> } />
          </Routes>
      </div>
      {
        orderVisible && <Modal closeModal={() =>   dispatcher(closeModal())}><OrderDetails /></Modal>
      }
      {
        itemVisible == "open" && <Modal closeModal={() => dispatcher(hideIngredient())} title="Детали ингредиента"><IngredientDetails /></Modal>
      }
      </Router>
  );
}

export default App;
