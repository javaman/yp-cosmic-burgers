import styles from './modal-switch.module.css';
import AppHeader from '../app-header/app-header';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Index, Login, Register, ForgotPassword, ResetPassword } from '../../pages';
import { Profile } from '../../pages/profile';
import { Menu } from '../menu/menu';
import Orders from '../../pages/orders';
import Protect from '../protect';
import { Ingredient } from '../../pages/ingredient';
import { closeModal } from '../../services/modals';
import Feed from '../../pages/feed';
import { Order } from '../../pages/order';
import { OrderInfo } from '../order-info/order-info';
import { useAppDispatch } from '../../services/store';
import { useAppSelector } from '../../services/store';

export default function ModalSwitch() {
    const location = useLocation();
    let navigate = useNavigate();
    const background = location.state && location.state.background;
    const id = location.state && location.state.id;

    const dispatcher = useAppDispatch();

    function closeIngredients() {
        navigate(-1);
    };
    const { orderVisible,  orderInfoVisible } = useAppSelector(store => store.modals);

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
                <Route path="/feed" element={ <Feed extraClass={styles.content} /> } />
                <Route path="/feed/:id" element={ <Order extraClass={styles.content} /> } />
                <Route path="/profile/orders/:id" element={ <Protect element={<Order extraClass={styles.content} />} authorized={true} to="/login" /> } />
            </Routes>
            {
                background && (location.pathname.search("feed") > 0 || location.pathname.search("orders") > 0) && 
                    <Modal closeModal={() => { dispatcher(closeModal()); navigate(-1);}}>
                        <OrderInfo number={Number(id)}/>
                    </Modal>
            }
            { background && !orderInfoVisible && (location.pathname.search("ingredients") > 0) &&
                                        <Modal closeModal={closeIngredients} title="Детали ингредиента">
                                            <IngredientDetails  id={id} />
                                        </Modal>} 
            { orderVisible && <Modal closeModal={() =>   dispatcher(closeModal())}><OrderDetails /></Modal> }
        </div>
    );
}