import styles from './image-stack.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

let stylesMap = [styles.img0, styles.img1, styles.img2, styles.img3, styles.img4];

export const ImageStack = ({images, sum, count} : {images: string[]; sum: number; count: number}) => {
    return (
        <div className={styles.imageStack}>
            {images.filter((img, i) => i < 5).map((img, i) => <img key={"kkk" + img} alt='' src={img} className={stylesMap[i]}/> )}
            { count > 5 && <span className={`${styles.txt} text text_type_digits-default`}>+{count - 5}</span>} 
            <span className={styles.sumAndIcon}>
                <span className='text text_type_digits-default'>{sum}</span>&nbsp;&nbsp;
                <CurrencyIcon type="primary" />
            </span>
        </div>
    )
};