import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBun, deleteItem, replace } from '../../services/burger-constructor';
import { useDrag, useDrop } from 'react-dnd';

const BurgerConstructorItem = ({index}) => {
    const {bun, items} = useSelector((store) => store.burgerConstructor);
    const dispatch = useDispatch();

    const [{isDrag}, dragRef] = useDrag({
        type: "reorder",
        item: { index2: index },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const [{ isHover }, dropTarget] = useDrop({
        accept: "reorder",
        drop({index2}) {
            if (index !== index2) {
                dispatch(replace({index2, index}));
            }
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    const extraStyle = {};
    if (isDrag) {
        extraStyle.filter = "blur(5px)";
    }
    const extraOverStyle = {}
    if (isHover) {
        extraOverStyle.filter = "opacity(50%)" 
    }

    return (index == -1)
        ?  <li><ConstructorElement extraClass='m-1' thumbnail={bun.image_mobile} text={bun.name + ' верх'} price={bun.price} type='top' isLocked/></li>
        :  (index == Number.MAX_SAFE_INTEGER)
        ?  <li><ConstructorElement  extraClass='m-1' thumbnail={bun.image_mobile} text={bun.name + ' низ'} price={bun.price} type='bottom' isLocked /></li>
        :  <li ref={dragRef} style={extraStyle}><div ref={dropTarget} style={extraOverStyle}><ConstructorElement   extraClass='m-1' thumbnail={items[index].image_mobile} text={items[index].name} price={items[index].price} handleClose={e => dispatch(deleteItem(index))} /></div></li>

};

export default BurgerConstructorItem;