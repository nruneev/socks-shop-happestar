import './index.sass'
import React, {useContext, useState} from 'react';
import {CartContext} from "../../utils/contexts";
import {useTranslation} from "react-i18next";
import {get_promo} from "../../utils/helpers";
import {CartItem} from "../../boilerplate/CartDropdown/CartItem";
import {CartItemMobile} from "../../boilerplate/CartDropdown/CartItemMobile";


const Cart = () => {
    let [completeOder, setComlete] = useState('');

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
                                                <div onClick={() => setComlete('active')} className="table-price__btns-wrap checkoutBtns">
                                                    <a
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
                                    <div onClick={() => setComlete('active')} className="table-price__btns-wrap checkoutBtns">
                                        <a
                                           className="table-price__link _checkout">Оформить заказ</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={'col_data ' + completeOder}>
                            <div className='tcnt'>
                                <form noValidate='noValidate' className='noRegForm' method='post' acceptCharset='utf-8'>
                                    <div className='dlist'>
                                        <div className='forDeliveryTypes'>
                                            <div className='item _delivery'>
                                                <i className='ico'/>
                                                <div className='ttl'>
                                                    <span>1. Доставка</span>
                                                </div>
                                                <div className='edit'>
                                                    <ul className='list'>
                                                        <li className='itm' data-id='SDEK'>
                                                            <div className='logo'>
                                                                <img src='/static/media/cdek2.png'/>
                                                            </div>
                                                            <div className='del_desc'>
                                                                <b>СДЭК</b>
                                                                С ПН-ПТ с 9:00 до 18:00
                                                                Курьер транспортной компании связывается для согласования времени доставки
                                                                При полном отказе от заказа – оплачивается стоимость доставки согласно действующим тарифам
                                                            </div>
                                                            <ul className='del_val'>
                                                                <li className='del_val-rub'>
                                                                    <b>265</b>
                                                                    <i className="rub-symbol">₽</i>
                                                                </li>
                                                                <li className="del_val-time">от 2 рабочих дней</li>
                                                            </ul>
                                                        </li>
                                                        <li className='itm' data-id='SDEK_PICKUP'>
                                                            <div className='logo'>
                                                                <img src='/static/media/cdek2.png'/>
                                                            </div>
                                                            <div className='del_desc'>
                                                                <b>Самовывоз СДЭК</b>
                                                                Возможен частичный выкуп заказа
                                                                Заказ хранится в пункте выдачи 14 дней
                                                                При полном отказе от заказа – оплачивается стоимость доставки согласно действующим тарифам
                                                            </div>
                                                            <ul className='del_val'>
                                                                <li className='del_val-rub'>
                                                                    <b>125</b>
                                                                    <i className="rub-symbol">₽</i>
                                                                </li>
                                                                <li className="del_val-time">от 2 рабочих дней</li>
                                                            </ul>
                                                        </li>
                                                        <li className='itm' data-id='POST'>
                                                            <div className='logo'>
                                                                <img src='/static/media/pochta_rf.png'/>
                                                            </div>
                                                            <div className='del_desc'>
                                                                <b>Почта</b>
                                                                С ПН-ПТ с 9:00 до 18:00
                                                                SMS-уведомление о статусе заказа
                                                                Доставка до ближайшего отделения Почты России
                                                                Заказ хранится в почтовом отделении 30 дней
                                                            </div>
                                                            <ul className='del_val'>
                                                                <li className='del_val-rub'>
                                                                    <b>242</b>
                                                                    <i className="rub-symbol">₽</i>
                                                                </li>
                                                                <li className="del_val-time">от 3 рабочих дней</li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="item  _address  js---order-contacts-form">
                                                <i className="ico"/>
                                                <div className="ttl">
                                                    Адрес доставки
                                                </div>
                                                <div className="edit">
                                                    <div className="inputs tmpAddressData">
                                                            <div className="suggestions__wrap">
                                                                <input type="text" className="input"
                                                                       name="address[street]" value=""
                                                                       placeholder="Улица"/>
                                                            </div>
                                                            <div className="suggestions__wrap  suggestions__wrap--small">
                                                                <input type="text" className="input input--small"
                                                                       name="address[building]" value=""
                                                                       placeholder="Дом" required=""/>
                                                            </div>
                                                            <div className="suggestions__wrap  suggestions__wrap--small">
                                                                <input type="text" className="input input--small"
                                                                       name="address[flat]" value=""
                                                                       placeholder="Квартира/Офис"/>
                                                            </div>
                                                            <div className="inputs__hint-wrap">
                                                                <input type="text" className="input text"
                                                                       placeholder="Индекс" value=""
                                                                       name="address[postcode]" required=""/>
                                                            </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item _info  js---order-contacts-form">
                                            <i className="ico"/>
                                            <div className="ttl">
                                                2. Контактная информация
                                            </div>
                                            <div className="edit">
                                                <div className="inputs tmpUserData">
                                                    <div className="suggestions__wrap">
                                                        <input type="text" className="input suggestions-input"
                                                               placeholder="Фамилия*" name="user[last_name]" value=""
                                                               required="" autoComplete="off" autoCorrect="off"
                                                               autoCapitalize="off" spellCheck="false"
                                                               />
                                                    </div>

                                                    <div className="suggestions__wrap">
                                                        <input type="text" className="input suggestions-input"
                                                               placeholder="Имя*" name="user[first_name]" value=""
                                                               required="" autoComplete="off" autoCorrect="off"
                                                               autoCapitalize="off" spellCheck="false"
                                                               />
                                                    </div>

                                                    <div className="suggestions__wrap">
                                                        <input type="text" className="input" placeholder="Отчество"
                                                               name="user[middle_name]" value=""/>
                                                    </div>

                                                    <div className="suggestions__wrap">
                                                        <input type="tel" className="input"
                                                               placeholder="Номер телефона*" name="user[phone]" value=""
                                                               required=""/>
                                                    </div>

                                                    <div className="suggestions__wrap">
                                                        <input type="email" className="input" placeholder="Email*"
                                                               name="user[email]" value="" required=""/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item _payment">
                                            <i className="ico"/>
                                            <div className="ttl">3. Оплата</div>
                                            <div className="edit">
                                                <div className="forPaymentTypes" data-error="Выберите тип оплаты">
                                                    <ul className="ilist _pays">
                                                        <li className="itm " data-action="setPaymentType"
                                                            data-id="CASH">
                                                            <img src="/static/media/pay_img_1.svg"
                                                                 alt=""/>
                                                                <span>Наличными при получении</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="next _submit">
                                                    <div className="formalizeTotal">
                                                        <div className="_submit-item">
                                                            <span>Стоимость доставки:</span> 242&nbsp;<i
                                                            className="rub-symbol">₽</i></div>
                                                        <div className="_submit-item  _submit-item--final">
                                                            <span>Итого:</span> 1 240&nbsp;<i
                                                            className="rub-symbol">₽</i>
                                                        </div>
                                                    </div>
                                                    <button className="_btn_" type="submit">Оформить заказ</button>
                                                    <div className="_submit-text">
                                                        Нажимая кнопку «Оформить заказ», Вы даете согласие на обработку
                                                        своих персональных данных
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        )
    } else {
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
                        <p className='without_item'>В корзине ничего нет</p>
                    </div>
                </div>
        )
    }
};

export { Cart };
