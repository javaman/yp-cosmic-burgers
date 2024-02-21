import React from 'react';
import logo from './logo.svg';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import './App.css';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import Modal from './components/modal/modal';
import IngredientDetails from './components/ingredient-details/ingredient-details';
import OrderDetails from './components/order-details/order-details';

const API_URL = "https://norma.nomoreparties.space/api/ingredients";

type Item = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

function App() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [item, setItem] = React.useState<Item>();
  const [data, setData] = React.useState<Item[]>([]);

  function showItem(i: Item) {
    setItem(i);
    setModalOpen(true);
  };

  function submitOrder() {
    setModalOpen(true);
    setItem(undefined);
  }

  React.useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(response => setData(response.data))
      .catch(error => alert("Все пропало!"));
  }, []);

  return (
    <>
      <div className='wrapper'>
        <header className='header'><AppHeader /><h1 className='text text_type_main-large m-8'>Соберите бургер</h1></header>
        <aside className='sidebarl'><BurgerIngredients items={data} onItemClicked={(item: Item) => showItem(item)} /></aside>
        <aside className='sidebarr'><BurgerConstructor items={data} submitOrder={() => submitOrder()} /></aside>

      </div>
      {modalOpen &&
        <Modal closeModal={() => setModalOpen(false)} title={item ? "Детали ингредиента" : ""}>
          {item ? <IngredientDetails ingredient={item} /> : <OrderDetails />}
        </Modal>
      }
    </>
  );
}

export default App;
