import React from 'react';
import { fetchIngredients } from '../../services/ingredients';
import { useDispatch } from 'react-redux';
import ModalSwitch from '../modal-switch';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppDispatch } from '../../services/store';


function App() {

  const dispatcher = useDispatch.withTypes<AppDispatch>()();

  React.useEffect(() => {
    dispatcher(fetchIngredients());
  });

  return (
    <Router>
      
      <ModalSwitch />
    </Router>
  );
}

export default App;
