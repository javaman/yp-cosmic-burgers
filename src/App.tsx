import React from 'react';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import './App.css';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import Modal from './components/modal/modal';
import IngredientDetails from './components/ingredient-details/ingredient-details';
import OrderDetails from './components/order-details/order-details';
import BurgerConstructorContext from './services/burger-constructor-context';
import BurgerItem from './types/burger-types';
import { TBurgerConstructorContext } from './services/burger-constructor-context';
import { BUN, API_URL, SUBMIT_URL } from './constants';



function App() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [item, setItem] = React.useState<BurgerItem>();
  const [ingredients, setIngredients] = React.useState<BurgerItem[]>([]);
  const [burgerConstructorContext, setBurgerConstructorContext] = React.useState<TBurgerConstructorContext>({bun: BUN, items: [], orderNumber: -1});

  function showItem(i: BurgerItem) {
    // Это я сделал, чтобы динамики добавить, понятное дело что в финале этого не будет и потестировать
    if (i.type === 'bun') {
      setBurgerConstructorContext({
        ...burgerConstructorContext,
        bun: i
      });
    } else {
      setBurgerConstructorContext({
        ...burgerConstructorContext,
        items:  [...burgerConstructorContext.items, i]
      });
    }
    setItem(i);
    setModalOpen(true);
  };

  function submitOrder() {
    fetch(SUBMIT_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients: [...burgerConstructorContext.items.map(i => i._id), burgerConstructorContext.bun?._id, burgerConstructorContext.bun?._id] 
      })
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Все пропало!");
      }
    }).then(response => {
      setBurgerConstructorContext({
        ...burgerConstructorContext,
        orderNumber: response.order.number
      });      
      setModalOpen(true);
      setItem(undefined);
    })
    .catch(error => alert(error));
  }

  React.useEffect(() => {
    fetch(API_URL)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Все пропало!");
          return { data: [] };
        }
      }).then(response => setIngredients(response.data))
      .catch(error => alert("Все пропало!"));
  }, []);

  return (
    <BurgerConstructorContext.Provider value={burgerConstructorContext}>
      <div className='wrapper'>
        <header className='header'><AppHeader /><h1 className='text text_type_main-large m-8'>Соберите бургер</h1></header>
        <aside className='sidebarl'><BurgerIngredients items={ingredients} onItemClicked={(item: BurgerItem) => showItem(item)} /></aside>
        <aside className='sidebarr'><BurgerConstructor submitOrder={() => submitOrder()} /></aside>
      </div>
      {modalOpen &&
        <Modal closeModal={() => setModalOpen(false)} title={item ? "Детали ингредиента" : ""}>
          {item ? <IngredientDetails ingredient={item} /> : <OrderDetails />}
        </Modal>
      }
    </BurgerConstructorContext.Provider>
  );
}

export default App;
