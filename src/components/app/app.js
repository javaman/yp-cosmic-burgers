import React from 'react';
import { fetchIngredients } from '../../services/ingredients';
import { useDispatch } from 'react-redux';
import ModalSwitch from '../modal-switch';
import { BrowserRouter as Router } from 'react-router-dom';


function App() {

  const dispatcher = useDispatch();

  React.useEffect(() => {
    dispatcher(fetchIngredients());
  }, []);

  return (
    <Router>
      <ModalSwitch />
    </Router>
  );
}

export default App;
