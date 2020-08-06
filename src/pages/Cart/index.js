import './index.sass'
import React, {useContext, useState} from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';

import {CartContext} from "../../utils/contexts";
import {get_promo} from "../../utils/helpers";
import {CartItem} from "../../boilerplate/CartDropdown/CartItem";
import {CartItemMobile} from "../../boilerplate/CartDropdown/CartItemMobile";
import {useHistory} from "react-router-dom";


const Cart = () => {
    let history = useHistory();
    let [pvz, setPVZ] = useState([]);
    let [currentPVZ, setCurrentPVZ] = useState({});
    let [startUpload, setUpload] = useState(false);

    if (!startUpload) {
        fetch('/php/listPVZ.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((el) => {
            let element = el.json();
            return (element);
        }).then(function (data) {
            let qwerty = data.pvz;
            setPVZ(qwerty);
        }).catch((e) => console.log(e))
        setUpload(true);
    }

    let [openWindow, setWindow] = useState('');

    const containerStyle = {
        width: 'calc(100% - 30px)',
        height: '485px'
    };

    const center = {
        lat: 59.938732,
        lng: 30.316229
    };

    var myOptions = {
        zoom: 8,
        center: center
    }

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback() {
        const bounds = new window.google.maps.Map(myOptions);
        setMap(bounds)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    let [completeOder, setComlete] = useState('');

    let [deliveryPrice, setDeliveryPrice] = useState(0);

    let [oderPar, setOderPar] = useState({
        name: '',
        surname: '',
        fatherName: '',
        email: '',
        phone: '',
        delivery: '',
        pay: '',
        promo: '',
        street: '',
        home: '',
        room: '',
        index: '',
        adressPVZ: '',
    });

    console.log(oderPar);

    let { cartItems, removeItem, setItem } = useContext(CartContext);

    let promo = '';
    let [promo_price, setPromo] = useState(0);

    let totalPrice = 0;

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

    const createOder = () => {

        const address = oderPar.index + ', ' + oderPar.street + ', ' + oderPar.home + ', ' + oderPar.room;
        const comment = '';

        const priceAll = parseInt(totalPrice, 10) - promo_price + deliveryPrice;
        fetch('/php/oderAdd.php?item=' + JSON.stringify(cartItems) + '&promo=' + promo + '&name=' + oderPar.name + '&surname=' + oderPar.surname + '&email=' + oderPar.email + '&phone=' + oderPar.phone + '&delivery=' + oderPar.delivery + '&pay=' + oderPar.pay + '&comment=' + comment + '&address=' + address + '&priceAll=' + priceAll, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((el) => {
            let element = el.json();
            return (element);
        }).then(function (data) {
            let qwerty = data;
            console.log(qwerty)
        }).catch((e) => console.log(e))
    }

    if (cartItems.length > 0) {
        return (
                <div className={'cart-dropdown'}>
                    <div className="wrapperers">
                        <div className='linker'>
                            <ul>
                                <li><a href={'./'}>Главная</a></li>
                                <li><a onClick={() => history.goBack()}>Назад</a></li>
                                <li><span>Корзина</span></li>
                            </ul>
                            <h1>Корзина</h1>
                        </div>
                        <div className="table">
                            <table>
                                <thead className="thead">
                                <tr>
                                    <th>Название</th>
                                    <th>Артикул</th>
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
                            <ul className="lists goodsInCartMobile">
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
                                        <div className={'forDeliveryTypes ' + openWindow}>
                                            <div className='item _delivery'>
                                                <i className='ico'/>
                                                <div className='ttl'>
                                                    <span>1. Доставка</span>
                                                </div>
                                                <div className='edit'>
                                                    <ul className={'list ' + oderPar.delivery}>
                                                        <li className='itm' onClick={() => {
                                                            setOderPar({
                                                                ...oderPar,
                                                                delivery: 'SDEK'
                                                            });
                                                            setDeliveryPrice(265);
                                                            setWindow('adress');
                                                        }} data-id='SDEK' >
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
                                                        <li className='itm' onClick={() => {
                                                            setOderPar({
                                                                ...oderPar,
                                                                delivery: 'SDEK_PICKUP'
                                                            });
                                                            setDeliveryPrice(125);
                                                            setWindow('map');
                                                        }} data-id='SDEK_PICKUP'>
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
                                                        <li className='itm' onClick={() => {
                                                            setOderPar({
                                                                ...oderPar,
                                                                delivery: 'POST'
                                                            });
                                                            setDeliveryPrice(242);
                                                            setWindow('adress');
                                                        }} data-id='POST'>
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
                                            <div className="item  _address  adr js---order-contacts-form">
                                                <i className="ico"/>
                                                <div className="ttl">
                                                    Адрес доставки
                                                </div>
                                                <div className="edit">
                                                    <div className="inputs tmpAddressData">
                                                            <div className="suggestions__wrap">
                                                                <input type="text" className="input"
                                                                       name="address"
                                                                       onChange={(el) => setOderPar({
                                                                           ...oderPar,
                                                                           street: el.target.value
                                                                       })}
                                                                       placeholder="Улица"/>
                                                            </div>
                                                            <div className="suggestions__wrap  suggestions__wrap--small">
                                                                <input type="text" className="input input--small"
                                                                       name="address"
                                                                       onChange={(el) => setOderPar({
                                                                           ...oderPar,
                                                                           home: el.target.value
                                                                       })}
                                                                       placeholder="Дом" required=""/>
                                                            </div>
                                                            <div className="suggestions__wrap  suggestions__wrap--small">
                                                                <input type="text" className="input input--small"
                                                                       name="address"
                                                                       onChange={(el) => setOderPar({
                                                                           ...oderPar,
                                                                           room: el.target.value
                                                                       })}
                                                                       placeholder="Квартира/Офис"/>
                                                            </div>
                                                            <div className="inputs__hint-wrap">
                                                                <input type="text" className="input text"
                                                                       placeholder="Индекс"
                                                                       onChange={(el) => setOderPar({
                                                                           ...oderPar,
                                                                           index: el.target.value
                                                                       })}
                                                                       name="address" required=""/>
                                                            </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item  _address  maps_google">
                                                <i className="ico"/>
                                                <div className="ttl">
                                                    Адрес доставки
                                                </div>
                                                <div className="edit">
                                                    <div className='maper'>
                                                        <div className='cont_block'>
                                                            <LoadScript
                                                                googleMapsApiKey="AIzaSyD2bDPulysZlPIjG1fO3kNqIvbsbWjXrPw"
                                                            >
                                                                <GoogleMap
                                                                    mapContainerStyle={containerStyle}
                                                                    center={center}
                                                                    zoom={10}
                                                                    onLoad={onLoad}
                                                                    onUnmount={onUnmount}
                                                                >
                                                                    {pvz.map((el) => {
                                                                        const coord = {
                                                                            lat: parseFloat(el.coordY),
                                                                            lng: parseFloat(el.coordX)
                                                                        };
                                                                        return (<Marker onLoad={onLoad} position={coord} onClick={() => setCurrentPVZ({
                                                                            address: el.address,
                                                                            time: el.workTime,
                                                                            tel: el.phone,
                                                                            class: 'open_pvz'
                                                                        })}/>)
                                                                    })}
                                                                </GoogleMap>
                                                            </LoadScript>
                                                            <div className={'map_panel ' + currentPVZ.class}>
                                                                <img src='/static/media/cdek2.png'/>
                                                                <div className="addr">
                                                                    <p>
                                                                        <span>{currentPVZ.address}</span>
                                                                    </p>
                                                                    <p>{currentPVZ.time}</p>
                                                                    <p>
                                                                        <a href={'tel:' + currentPVZ.tel}>{currentPVZ.tel}</a>
                                                                    </p>
                                                                </div>
                                                                <ul className='del_val'>
                                                                    <li className='del_val-rub'>
                                                                        <b>125</b>
                                                                        <i className="rub-symbol">₽</i>
                                                                    </li>
                                                                    <li className="del_val-time">от 2 рабочих дней</li>
                                                                </ul>
                                                                <div className="txt">
                                                                    Заберите заказ в пункте выдачи после получения SMS о его
                                                                    готовности
                                                                </div>
                                                                <button className='_btn_' type='button'
                                                                        onClick={() => setOderPar({
                                                                            ...oderPar,
                                                                            adressPVZ: currentPVZ.address
                                                                        })}
                                                                >{oderPar.adressPVZ === currentPVZ.address ? 'Пункт выбран' : 'Забрать здесь'}</button>
                                                            </div>
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
                                                               placeholder="Фамилия*"
                                                               required="" autoComplete="off" autoCorrect="off"
                                                               autoCapitalize="off" spellCheck="false"
                                                               onChange={(el) => setOderPar({
                                                                   ...oderPar,
                                                                   surname: el.target.value
                                                               })}
                                                               />
                                                    </div>

                                                    <div className="suggestions__wrap">
                                                        <input type="text" className="input suggestions-input"
                                                               placeholder="Имя*"
                                                               required="" autoComplete="off" autoCorrect="off"
                                                               autoCapitalize="off" spellCheck="false"
                                                               onChange={(el) => setOderPar({
                                                                   ...oderPar,
                                                                   name: el.target.value
                                                               })}
                                                               />
                                                    </div>

                                                    <div className="suggestions__wrap">
                                                        <input type="text" className="input" placeholder="Отчество"
                                                               onChange={(el) => setOderPar({
                                                                   ...oderPar,
                                                                   fatherName: el.target.value
                                                               })}
                                                        />
                                                    </div>

                                                    <div className="suggestions__wrap">
                                                        <input type="tel" className="input"
                                                               placeholder="Номер телефона*"
                                                               required=""
                                                               onChange={(el) => setOderPar({
                                                                   ...oderPar,
                                                                   phone: el.target.value
                                                               })}
                                                        />
                                                    </div>

                                                    <div className="suggestions__wrap">
                                                        <input type="email" className="input" placeholder="Email*"
                                                               required=""
                                                               onChange={(el) => setOderPar({
                                                                   ...oderPar,
                                                                   email: el.target.value
                                                               })}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item _payment">
                                            <i className="ico"/>
                                            <div className="ttl">3. Оплата</div>
                                            <div className="edit">
                                                <div className={"forPaymentTypes " + oderPar.pay} data-error="Выберите тип оплаты">
                                                    <ul className="ilist _pays">
                                                        <li className="itm " data-action="setPaymentType"
                                                            data-id="CASH"
                                                            onClick={() => setOderPar({
                                                                ...oderPar,
                                                                pay: 'Cash'
                                                            })}
                                                        >
                                                            <img src="/static/media/pay_img_1.svg"
                                                                 alt=""/>
                                                                <span>Наличными при получении</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="next _submit">
                                                    <div className="formalizeTotal">
                                                        <div className="_submit-item">
                                                            <span>Стоимость доставки: </span>{deliveryPrice}&nbsp;<i
                                                            className="rub-symbol">₽</i></div>
                                                        <div className="_submit-item  _submit-item--final">
                                                            <span>Итого: </span>{parseInt(totalPrice, 10) - promo_price + deliveryPrice}&nbsp;<i
                                                            className="rub-symbol">₽</i>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => createOder()} className="_btn_" type="button">Оформить заказ</button>
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
