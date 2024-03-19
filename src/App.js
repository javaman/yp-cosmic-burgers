import React from 'react';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import './App.css';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import Modal from './components/modal/modal';
import IngredientDetails from './components/ingredient-details/ingredient-details';
import OrderDetails from './components/order-details/order-details';
import { fetchIngredients } from './services/ingredients';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { closeModal } from './services/modals';



function App() {

  const { ingredients, loading } = useSelector((store) => store.ingredients);
  const dispatcher = useDispatch();

  React.useEffect(() => {
    dispatcher(fetchIngredients());
  }, []);

  const {orderVisible, itemVisible } = useSelector(store => store.modals);

  return (
    <>
      <div className='wrapper'>
        <header className='header'><AppHeader /><h1 className='text text_type_main-large m-8'>Соберите бургер</h1></header>
        <DndProvider backend={HTML5Backend}>
          <aside className='sidebarl'><BurgerIngredients items={ingredients}  /></aside>
          <aside className='sidebarr'><BurgerConstructor /></aside>
        </DndProvider>
      </div>

      {
        orderVisible && <Modal closeModal={() => dispatcher(closeModal())}><OrderDetails /></Modal>
      }
      {
        itemVisible && <Modal closeModal={() => dispatcher(closeModal())} title="Детали ингредиента"><IngredientDetails /></Modal>
      }

      </>

  );
}

export default App;
