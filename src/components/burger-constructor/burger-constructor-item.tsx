import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { deleteItem, replace } from '../../services/burger-constructor';
import { useDrag, useDrop } from 'react-dnd';
import { useAppDispatch } from '../../services/store';
import { useAppSelector } from '../../services/store';

const BurgerConstructorItem = ({index} : {index: number}) => {
    const {bun, items} = useAppSelector( state => state.burgerConstructor );
    const dispatch = useAppDispatch();
    const [{isDrag}, dragRef] = useDrag({
        type: "reorder",
        item: { index2: index },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const [{ isHover }, dropTarget] = useDrop({
        accept: "reorder",
        drop({index2} : {index2: number}) {
            if (index !== index2) {
                dispatch(replace({index2, index}));
            }
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    type TStyle = {
        [key: string]: string;
    }

    let extraStyle: TStyle = {};
    if (isDrag) {
        extraStyle.filter = "blur(5px)";
    }

    let extraOverStyle: TStyle = {}
    if (isHover) {
        extraOverStyle.filter = "opacity(50%)" 
    }

    let result = (<></>);

    if (index === -1 && bun !== undefined) {
        result =(<li  data-cy="droppedItem"><ConstructorElement extraClass='m-1' thumbnail={bun.image_mobile} text={bun.name + ' верх'} price={bun.price} type='top' isLocked/></li>);
    } else if (index === Number.MAX_SAFE_INTEGER && bun !== undefined) {
        result = (<li  data-cy="droppedItem"><ConstructorElement  extraClass='m-1' thumbnail={bun.image_mobile} text={bun.name + ' низ'} price={bun.price} type='bottom' isLocked /></li>);
    } else if (index > -1 && index < Number.MAX_SAFE_INTEGER) {
        result = (
            <li ref={dragRef} style={extraStyle}  data-cy="droppedItem">
                <div ref={dropTarget} style={extraOverStyle}>
                    <ConstructorElement
                        extraClass='m-1' 
                        thumbnail={items[index].image_mobile} 
                        text={items[index].name} 
                        price={items[index].price} 
                        handleClose={() => dispatch(deleteItem(index))} />
                </div>
            </li>
        );
    }
    return result;
};

export default BurgerConstructorItem;