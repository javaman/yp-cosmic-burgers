import styles from './modal-switch.module.css';
import AppHeader from '../app-header/app-header';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Index, Login, Register, ForgotPassword, ResetPassword } from '../../pages';
import { Profile } from '../../pages/profile';
import { Menu } from '../menu/menu';
import Orders from '../../pages/orders';
import Protect from '../protect';
import { Ingredient } from '../../pages/ingredient';
import { closeModal } from '../../services/modals';

export default function ModalSwitch() {
    const location = useLocation();
    let navigate = useNavigate();
    const background = location.state && location.state.background;
    const id = location.state && location.state.id;
    const dispatcher = useDispatch();
    function closeIngredients() {
        navigate(-1);
    };
    const { orderVisible } = useSelector(store => store.modals);
    return (
        <div className={styles.container}>
            <AppHeader extraClass={styles.header}/>
            <Routes location={background || location}>
                <Route path="/" element={ <Index extraClass={styles.content} /> } />
                <Route path="/login" element={ <Protect element={<Login extraClass={styles.content} />} authorized={false} to="/" /> } />
                <Route path="/register" element={ <Protect element={<Register extraClass={styles.content} />} authorized={false} to="/" /> } />
                <Route path="/forgot-password" element={ <Protect element={<ForgotPassword extraClass={styles.content} />} authorized={false} to="/" /> } />
                <Route path="/reset-password" element={ <Protect element={<ResetPassword extraClass={styles.content} />} authorized={false} to="/" /> } />
                <Route path="/profile" element={ <Protect element={<Menu extraClass={styles.content} hint="В этом разделе вы можете изменить свои персональные данные"><Profile /></Menu>} authorized={true} to="/login" /> }  />
                <Route path="/profile/orders" element={ <Protect element={<Menu extraClass={styles.content}><Orders /></Menu>} authorized={true} to="/login" /> }  />
                <Route path="/ingredients/:id" element={ <Ingredient  extraClass={styles.content}/> } />
            </Routes>
            { background &&
                                        <Modal closeModal={closeIngredients} title="Детали ингредиента">
                                            <IngredientDetails  id={id}/>
                                        </Modal>} 
            { orderVisible && <Modal closeModal={() =>   dispatcher(closeModal())}><OrderDetails /></Modal> }
        </div>
    );
}