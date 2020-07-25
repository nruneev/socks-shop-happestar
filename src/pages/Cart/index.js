import './index.sass'
import React, {useContext, useState} from 'react';
import { Filter } from '../../components/Filter';
import { CatalogList } from '../../components/Catalog';
import {CartContext} from "../../utils/contexts";
import {useTranslation} from "react-i18next";
import {get_promo} from "../../utils/helpers";
import {IoMdClose} from "react-icons/io";
import {CartItem} from "../../boilerplate/CartDropdown/CartItem";
import {CartItemMobile} from "../../boilerplate/CartDropdown/CartItemMobile";


const Cart = () => {
    let { cartItems, removeItem, setItem } = useContext(CartContext);

    let promo = '';
    let [promo_price, setPromo] = useState(0);

    let totalPrice = 0;

    const { t } = useTranslation();


    const promoSet = (el) => {
        promo = el.target.value;
    }

    const promoFetch = () => {
        console.log(promo);
        get_promo(promo).then((result) => {
            promo = parseInt(result.price, 10);
            setPromo(promo);
        })
    }

    cartItems.map((item, key) => totalPrice += parseInt(item.cost, 10) * parseInt(item.count, 10));

    if (cartItems.length > 0) {
        return (
                <div className={'cart-dropdown'}>
                    <div className="wrapperers">
                        <div className='linker'>
                            <ul>
                                <li><a href={'./'}>Главная</a></li>
                                <li><span>Корзина</span></li>
                            </ul>
                            <h1>Корзина</h1>
                        </div>
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
                                {cartItems.map((item, key) => <CartItem item={item} removeItem={removeItem} key={key}/>)}
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
                                {cartItems.map((item, key) => <CartItemMobile item={item} removeItem={removeItem} key={key}/>)}
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
                                                <span>{parseInt(totalPrice, 10) - parseInt(promo_price, 10)}&nbsp;<i className="rub-symbol">₽</i></span>
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
                    <div className='linker'>
                        <ul>
                            <li><a href={'./'}>Главная</a></li>
                            <li><span>Корзина</span></li>
                        </ul>
                        <h1>Корзина</h1>
                    </div>
                    <p className='without_item'>В корзине ничего нет</p>
                </div>
        )
    }
};

export { Cart };
