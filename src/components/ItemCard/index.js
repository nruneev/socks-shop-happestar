import './index.sass'
import React from 'react';
import { CartContext } from '../../utils/contexts';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCartArrowDown, FaTrashAlt } from 'react-icons/fa'
import { ToggleButtons } from "../../boilerplate/ToggleButtonsText";
import { STATUS } from '../../utils/requests';

const statusClasses = new Map();
statusClasses.set(STATUS.NONE, '');
statusClasses.set(STATUS.NEW, 'new');
statusClasses.set(STATUS.SELL, 'sell');


const ItemCard = ({ item, width }) => {
    if(width) {
        width -= 4;
        let items = document.getElementsByClassName('item');
        items && [].forEach.call(items, ((item) => item.style.width = width));
    }

    const { setItem, cartItems } = useContext(CartContext);
    const { t } = useTranslation();

    let [activeSize, setActiveSize] = useState(0);
    let itemInCart = cartItems.find((el) => el.id === item.id);

    let button = itemInCart ?
        <button className='active'>
            <span onClick={() => setItem(item, --itemInCart.count)}>–</span>
            <span>{itemInCart.count}</span>
            <span onClick={() => setItem(item, ++itemInCart.count)}>+</span>
        </button> :
        <>
            <div className='info'>
                <label className='cost'>{item.cost}₽</label>
            </div>
            <button onClick={() => setItem(item)}><FaCartArrowDown/></button>
        </>;

    let statusClass = statusClasses.get(item.status);

    return (
        <article className={'product ' + statusClass}>
            <div className="product__wrap">
                <a href={"/good?id=" + item.id} className='product__image-wrap'>
                    <img className="product__image " src={item.src} alt={item.name}/>
                </a>
                <h3 className="product__title">
                    <a href={"//good?id=" + item.id}>{item.name}</a>
                </h3>
                <ToggleButtons buttons={item.sizes} activeId={activeSize} setActiveId={(id) => {
                    let count = itemInCart ? itemInCart.count : 1;
                    setItem(item, count);
                    setActiveSize(id);
                }}/>
                <div className='item-body'>
                    {button}
                </div>
            </div>
        </article>
    )
};


export { ItemCard };
