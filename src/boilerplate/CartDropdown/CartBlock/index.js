import './index.sass'
import React from 'react';
import { CartItem } from '../CartItem';
import {useTranslation} from "react-i18next";
import {IoMdClose} from "react-icons/io";


const CartBlock = ({ items, removeItem, closeCart }) => {
        const { t } = useTranslation();

        if (items.length > 0) {
            return (
                <div className={'cart-dropdown'}>
                    <h1>{t('your_items')}</h1>
                    <IoMdClose className='cross' onClick={closeCart}/>
                    <div className="table">
                        <table>
                            <thead>
                            <tr>
                                <th>Артикул</th>
                                <th>Название</th>
                                <th>Цвет</th>
                                <th>Размер</th>
                                <th>Цена</th>
                                <th>Количество</th>
                                <th>Сумма</th>
                            </tr>
                            </thead>
                            <div className='items'>
                                {items.map((item, key) => <CartItem item={item} removeItem={removeItem} key={key}/>)}
                            </div>


                            <div className='create-order'>

                                <form className='promo' action="#" novalidate="noValidate" method="post"
                                      acceptCharset="utf-8">
                                    <input сlassName='promo__input' type="text" placeholder="Введите промокод"
                                           name="promocode" required></input>
                                    <button className='promo__btn' type="submit">применить</button>
                                </form>

                                <div className='total-price'>
                                    <p>Итого:</p>
                                    <span>
                                        <i className='rub-symbol'>₽</i>
                                    </span>
                                </div>
                                <button>{t('create_order')}</button>
                            </div>
                        </table>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={'cart-dropdown'}>
                    <h1>{t('your_items')}</h1>
                    <IoMdClose className='cross' onClick={closeCart}/>
                    <p className='without_item'>В корзине ничего нет</p>
                </div>
            )
        }
};


export { CartBlock }
