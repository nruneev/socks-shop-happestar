import './index.sass'
import React, {useState} from 'react';
import { CartItem } from '../CartItem';
import {useTranslation} from "react-i18next";
import {IoMdClose} from "react-icons/io";
import {CartItemMobile} from "../CartItemMobile";
import {get_promo} from "../../../utils/helpers";


const CartBlock = ({ items, removeItem, closeCart }) => {

        let promo = '';
        let promo_price = localStorage.getItem('promo_price') ? localStorage.getItem('promo_price') : 0;

        let [totalPrice, setPrice] = useState([]);

        const { t } = useTranslation();


        const promoSet = (el) => {
            promo = el.target.value;
        }

        const promoFetch = () => {
            console.log(promo);
            get_promo(promo).then((result) => {
                promo_price = parseInt(result.price, 10);
                localStorage.setItem('promo_price', promo_price);
                setPrice(totalPrice = 0);
                setPrice(0);
            })
        }

        console.log(promo_price);

        items.map((item, key) => totalPrice += (item.cost * item.count));

        if (items.length > 0) {
            return (
                <div className={'cart-dropdown'}>
                    <h1>{t('your_items')}</h1>
                    <IoMdClose className='cross' onClick={closeCart}/>
                    <div className="wrapper  wrapper--indent-pb">
                        <div className="table">
                            <table>
                                <thead className="thead">
                                    <tr>
                                        <th>Артикул</th>
                                        <th>Название</th>
                                        <th>Размер</th>
                                        <th>Цена</th>
                                        <th>Количество</th>
                                        <th>Сумма</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className="tbody goodsInCart">
                                    {items.map((item, key) => <CartItem item={item} removeItem={removeItem} key={key}/>)}
                                </tbody>
                                <tfoot className="tfoot">
                                    <tr>
                                        <td colSpan="8">
                                            <div className="discountsContainer"> </div>
                                            <div className="table-flex-wrap">
                                                <div className="table-col promoContainer">
                                                    <form action="#"
                                                          className="promo  table-form" method="post">
                                                        <input type="text" placeholder="Введите промокод"
                                                               name="promocode" required="" className="valid"
                                                               onChange={promoSet}
                                                               aria-invalid="false"/>
                                                        <button onClick={() => promoFetch()} className="_btn_ _white" type="button">
                                                            применить
                                                        </button>
                                                    </form>
                                                </div>
                                                <div className="table-col  table-col--width  table-price">
                                                    <div className="forCartTotal">
                                                        <div className="table-price__wrap">
                                                            <div className="table-price__row table-price__value">
                                                                <p>Итого:</p>
                                                                <span>{parseInt(totalPrice, 10) - promo_price}&nbsp;<i className="rub-symbol">₽</i></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="table-price__btns-wrap checkoutBtns">
                                                        <a href="#"
                                                           className="table-price__link _checkout">Оформить заказ</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className="mobile">
                            <ul className="list goodsInCartMobile">
                                {items.map((item, key) => <CartItemMobile item={item} removeItem={removeItem} key={key}/>)}
                            </ul>
                            <div className="bottom">
                                <div className="table-col promoContainer">
                                    <form action="#"
                                          className="promo  table-form" method="post">
                                        <input type="text" placeholder="Введите промокод"
                                               name="promocode" required="" className="valid"
                                               onChange={promoSet}
                                               aria-invalid="false"/>
                                        <button onClick={() => promoFetch()} className="_btn_ _white" type="button">
                                            применить
                                        </button>
                                    </form>
                                </div>
                                <div className="table-col  table-col--width  table-price">
                                    <div className="forCartTotal">
                                        <div className="table-price__wrap">
                                            <div className="table-price__row table-price__value">
                                                <p>Итого:</p>
                                                <span>{parseInt(totalPrice, 10) - promo_price}&nbsp;<i className="rub-symbol">₽</i></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-price__btns-wrap checkoutBtns">
                                        <a href="#"
                                           className="table-price__link _checkout">Оформить заказ</a>
                                    </div>
                                </div>
                            </div>
                        </div>
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
