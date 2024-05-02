import React from 'react';
import { fetchIngredients } from '../../services/ingredients';
import ModalSwitch from '../modal-switch';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAppDispatch } from '../../services/store';


function App() {

  const dispatcher = useAppDispatch();
  
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
