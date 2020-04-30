import './index.sass'
import React from 'react';
import { CartItem } from '../CartItem';
import {useTranslation} from "react-i18next";
import {IoMdClose} from "react-icons/io";


const CartBlock = ({ items, removeItem, closeCart }) => {
        const { t } = useTranslation();
        return (
                <div className={'cart-dropdown'}>
                    <h1>{t('your_items')}</h1>
                    <IoMdClose className='cross' onClick={closeCart}/>
                    <div className='items'>
                        {items.map((item, key) => <CartItem item={item} removeItem={removeItem} key={key}/>)}
                    </div>
                    <div className='create-order'>
                        <button>{t('create_order')}</button>
                    </div>
                </div>
        )
};


export { CartBlock }