import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import styles from './index.module.css';
import { Login } from './login';
import { Register } from './register';
import { ForgotPassword } from './forgot-password';
import { ResetPassword } from './reset-pasword';



function Index(props) {
    const { ingredients } = props;
    return (
        <main className={`content ${styles.content}`}>
            <header className={styles.sheader}>
                <h1 className='text text_type_main-large m-8'>Соберите бургер</h1>
            </header>
            <DndProvider backend={HTML5Backend}>


                <section className={styles.ingredients}><BurgerIngredients items={ingredients} /></section>
                <section className={styles.constructor}><BurgerConstructor /></section>



            </DndProvider>
        </main>
    );
}

export {Index, Login, Register, ForgotPassword, ResetPassword};