import './index.sass'
import React, {useContext, useRef, useState} from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';

import {CartContext} from "../../utils/contexts";
import {get_promo} from "../../utils/helpers";
import {CartItem} from "../../boilerplate/CartDropdown/CartItem";
import {CartItemMobile} from "../../boilerplate/CartDropdown/CartItemMobile";
import {useHistory} from "react-router-dom";


const Cart = () => {
    let id_city = sessionStorage.getItem('ID_City');

    let classCDEK = parseInt(id_city, 10) === 137 ? 'hiddenCDEK' : '';

    let [city, setCitys] = useState('');
    let [ValidSent, setValidSent] = useState(false);

    let [priceDelivery, setPriceDelivery] = useState([0, 0]);

    let history = useHistory();
    let [idOder, setIDOder] = useState(0);
    let [pvz, setPVZ] = useState([]);
    let [currentPVZ, setCurrentPVZ] = useState({});
    let [startUpload, setUpload] = useState(false);

    if (!startUpload) {
        fetch('/php/listPVZ.php?ID_City=' + sessionStorage.getItem('ID_City'), {
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
        lat: pvz[0] !== undefined ? parseFloat(pvz[0].coordY) : 59.57,
        lng: pvz[0] !== undefined ? parseFloat(pvz[0].coordX) : 30.19
    };

    let myOptions = {
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

    let [error, setError] = useState({
        name: '',
        surname: '',
        delivery: '',
        email: '',
        phone: '',
        codePVZ: '',
        street: '',
        home: '',
        room: '',
        pay: ''
    });

    console.log(error);

    let [oderPar, setOderPar] = useState({
        name: '',
        surname: '',
        email: '',
        phone: '',
        delivery: '',
        pay: '',
        promo: '',
        street: '',
        home: '',
        room: '',
        city: sessionStorage.getItem('city'),
        adressPVZ: '',
        codePVZ: '',
        weight: '',
        height: '',
        length: '',
        width: ''
    });

    let { cartItems, removeItem, setItem } = useContext(CartContext);

    let payButton = ValidSent ?
        <>
            <button className="_btn_" type="button">Отправка...</button>
        </>
        :
        <>
            <button onClick={() => createOder()} className="_btn_" type="button">Оформить заказ</button>
        </>;

    let weight = 0;

    let length = 20;

    let width = 9;

    let height = 0;

    if (priceDelivery[0] === 0) {

        cartItems.map((el) => {
            if (el.isNabor){
                if (el.item.length === 3) {
                    weight += 287 * el.count
                } else if (el.item.length === 4) {
                    weight += 342 * el.count
                } else if (el.item.length ===  5) {
                    weight += 403 * el.count
                } else if (el.item.length === 6) {
                    weight += 462 * el.count
                } else if (el.item.length === 8) {
                    weight += 578 * el.count
                }
                length += 35  * el.count;
                width += 18 * el.count;
                height += 4  * el.count;
            } else {
                weight += 54  * el.count;
                height += 3  * el.count;
            }
        });

        weight = weight/1000;

        if (weight < 0.216) {
            weight = 0.216;
        }

        fetch('/php/calc.php?ID_City=' + sessionStorage.getItem('ID_City') + '&postalCode=' + sessionStorage.getItem('postalCode') + '&weight=' + weight + '&length=' + length + '&width=' + width + '&height=' + height, {
            method: 'GET',
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                setOderPar({
                    ...oderPar,
                    weight: weight,
                    height: height,
                    length: length,
                    width: width
                });
                setPriceDelivery([data.result[1].result.price, data.result[0].result.price])
                if (oderPar.delivery === 'SDEK_PICKUP') {
                    setDeliveryPrice(parseInt(data.result[1].result.price, 10))
                }
            }).catch(reason => console.log(reason));
    }

    let promo = '';
    let [promo_price, setPromo] = useState(0);
    let [scroller, setScroller] = useState(1);

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

    let refError = {
        client: React.createRef(),
        delivery: React.createRef(),
        codePVZ: React.createRef(),
        address: React.createRef(),
        pay: React.createRef()
    };

    if (promo_price > 0) {
        cartItems.map((item, key) => totalPrice += ((parseInt(item.cost, 10)) * parseInt(item.count, 10)));
    } else {
        cartItems.map((item, key) => totalPrice += ((parseInt(item.cost, 10) - parseInt(item.discount, 10)) * parseInt(item.count, 10)));

    }
    const validForm = () => {
        let obj = {
            name: oderPar.name !== '' ? '' : 'error',
            surname: oderPar.surname !== '' ? '' : 'error',
            delivery: oderPar.delivery !== '' ? '' : 'error',
            email: oderPar.email !== '' ? '' : 'error',
            phone: oderPar.phone !== '' ? '' : 'error',
            codePVZ: '',
            street: '',
            home: '',
            city: '',
            room: '',
            pay: oderPar.pay !== '' ? '' : 'error'
        };
        if (oderPar.delivery === 'SDEK') {
            obj = {
                ...obj,
                street: oderPar.street !== '' ? '' : 'error',
                home: oderPar.home !== '' ? '' : 'error',
                room: oderPar.room !== '' ? '' : 'error',
            }
        } else if (oderPar.delivery === 'SDEK_PICKUP') {
            obj = {
                ...obj,
                codePVZ: oderPar.codePVZ !== '' ? '' : 'error'
            }
        } else if (oderPar.delivery === 'HAPPESTAR') {
            obj = {
                ...obj,
                street: oderPar.street !== '' ? '' : 'error',
                home: oderPar.home !== '' ? '' : 'error',
                room: oderPar.room !== '' ? '' : 'error',
            }
        }
        if (obj.delivery === 'error') {
            window.scrollTo(0, refError.delivery.current.offsetTop - 100)
        } else if (obj.codePVZ === 'error') {
            window.scrollTo(0, refError.codePVZ.current.offsetTop - 100)
        } else if (obj.street === 'error' || obj.home === 'error' || obj.room === 'error') {
            window.scrollTo(0, refError.address.current.offsetTop - 100)
        } else if (obj.name === 'error' || obj.surname === 'error' || obj.email === 'error' || obj.phone === 'error') {
            window.scrollTo(0, refError.client.current.offsetTop - 100)
        } else if (obj.pay === 'error') {
            window.scrollTo(0, refError.pay.current.offsetTop - 100)
        }
        setError(obj);
    }

    const createOder = () => {
        setValidSent(true);

        if ((oderPar.delivery === 'SDEK_PICKUP' && oderPar.adressPVZ !=='' && oderPar.name !== '' && oderPar.phone !== '' && oderPar.email !== '') || (oderPar.delivery === 'PICKUP' && oderPar.name !== '' && oderPar.phone !== '' && oderPar.email !== '') || (oderPar.delivery === 'SDEK' && oderPar.city !== '' && oderPar.street !== '' && oderPar.home !== '' && oderPar.room !== '' && oderPar.name !== '' && oderPar.phone !== '' && oderPar.email !== '') || ((oderPar.delivery === 'HAPPESTAR' && oderPar.street !== '' && oderPar.home !== '' && oderPar.room !== '' && oderPar.name !== '' && oderPar.phone !== '' && oderPar.email !== ''))) {
            let address = ''

            if (oderPar.delivery === 'SDEK_PICKUP') {
                address = sessionStorage.getItem('city') + ', ' + oderPar.adressPVZ;
            } else if (oderPar.delivery === 'PICKUP') {
                address = 'Санкт-Петербург, ТК Фрунзенский, ул. Бухарестская 90, 2 этаж, секция 25.2'
            } else {
                address = oderPar.city + ', ' + oderPar.street + ', ' + oderPar.home + ', ' + oderPar.room;
            }

            const comment = '';

            const priceAll = (parseInt(totalPrice, 10) - (parseInt(totalPrice, 10) / 100) * promo_price) + deliveryPrice;
            fetch('/php/oderAdd.php?item=' + JSON.stringify(cartItems) + '&promo=' + promo + '&name=' + oderPar.name + '&surname=' + oderPar.surname + '&email=' + oderPar.email + '&phone=' + oderPar.phone + '&delivery=' + oderPar.delivery + '&pay=' + oderPar.pay + '&comment=' + comment + '&address=' + address + '&priceAll=' + priceAll + '&codePVZ=' + oderPar.codePVZ + '&street=' + oderPar.street + '&home=' + oderPar.home + '&room=' + oderPar.room + '&priceDelivery=' + deliveryPrice + '&CityID=' + sessionStorage.getItem('ID_City') + '&weight=' + oderPar.weight + '&length=' + oderPar.length + '&width=' + oderPar.width + '&height=' + oderPar.height, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((el) => {
                let element = el.json();
                return (element);
            }).then(function (data) {
                let qwerty = data;
                setIDOder(qwerty);
            }).catch((e) => console.log(e))
        } else {
            validForm();
        }
    }

    let cityMagic = (e) => {
        setCitys(e.target.value);
    }

    let magicCity = () => {
        fetch('/static/media/data.json')
            .then(function(response){ return response.json(); })
            .then(function(data) {
                let obj = data.Result.filter((el) => el.CityName.toUpperCase().includes(city.toUpperCase()));
                sessionStorage.setItem('ID_City', obj[0].ID);
                sessionStorage.setItem('city', city);
                sessionStorage.setItem('postalCode', obj[0].PostCodeList.split(',')[0]);
                setPriceDelivery([0, 0]);
                setUpload(false);
            }).catch(reason => console.log(reason));
    }

    if (cartItems.length > 0 && idOder === 0) {
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
                                                <p className={'promo_text_warn'}>Будьте внимательны, скидка по промокоду и сумма по скидке не суммируется</p>
                                            </div>
                                            <div className="table-col  table-col--width  table-price">
                                                <div className="forCartTotal">
                                                    <div className="table-price__wrap">
                                                        <div className="table-price__row table-price__value">
                                                            <p>Итого:</p>
                                                            <span>{parseInt(totalPrice, 10) - (parseInt(totalPrice, 10) / 100) * promo_price}&nbsp;<i className="rub-symbol">₽</i></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div onClick={() => {
                                                    setComlete('active');
                                                }} className="table-price__btns-wrap checkoutBtns">
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
                                    <p className={'promo_text_warn'}>Будьте внимательны, скидка по промокоду и сумма по скидке не суммируется</p>
                                </div>
                                <div className="table-col  table-col--width  table-price">
                                    <div className="forCartTotal">
                                        <div className="table-price__wrap">
                                            <div className="table-price__row table-price__value">
                                                <p>Итого:</p>
                                                <span>{parseInt(totalPrice, 10) - (parseInt(totalPrice, 10) / 100) * promo_price}&nbsp;<i className="rub-symbol">₽</i></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div onClick={() => {
                                        setComlete('active');
                                    }} className="table-price__btns-wrap checkoutBtns">
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
                                            <div className='item _delivery' ref={refError.delivery}>
                                                <i className='ico'/>
                                                <div className='ttl'>
                                                    <span>1. Доставка</span>
                                                </div>
                                                <div className='edit'>
                                                    <ul className={'list ' + oderPar.delivery}>
                                                        <li className={'itm ' + error.delivery + ' ' + classCDEK} onClick={() => {
                                                            setOderPar({
                                                                ...oderPar,
                                                                delivery: 'SDEK'
                                                            });
                                                            setDeliveryPrice(parseInt(priceDelivery[0], 10));
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
                                                                    <b>{priceDelivery[0]}</b>
                                                                    <i className="rub-symbol">₽</i>
                                                                </li>
                                                                <li className="del_val-time">от 2 рабочих дней</li>
                                                            </ul>
                                                        </li>
                                                        <li className={'itm ' + error.delivery  + ' ' + classCDEK} onClick={() => {
                                                            setOderPar({
                                                                ...oderPar,
                                                                delivery: 'SDEK_PICKUP'
                                                            });
                                                            setDeliveryPrice(parseInt(priceDelivery[1], 10));
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
                                                                    <b>{priceDelivery[1]}</b>
                                                                    <i className="rub-symbol">₽</i>
                                                                </li>
                                                                <li className="del_val-time">от 2 рабочих дней</li>
                                                            </ul>
                                                        </li>
                                                        <li className={'itm ' + error.delivery} onClick={() => {
                                                            setOderPar({
                                                                ...oderPar,
                                                                delivery: 'PICKUP'
                                                            });
                                                            setDeliveryPrice(0);
                                                            setWindow('');
                                                        }} data-id='PICKUP'>
                                                            <div className='logo'>
                                                                <img src='/static/media/logo.png'/>
                                                            </div>
                                                            <div className='del_desc'>
                                                                <b>Самовывоз</b>
                                                                Санкт-Петербург, ТК Фрунзенский, ул. Бухарестская 90, 2 этаж, секция 25.2 С пн-сб 10:00 до 19:00
                                                            </div>
                                                            <ul className='del_val'>
                                                                <li className='del_val-rub'>
                                                                    <b>0</b>
                                                                    <i className="rub-symbol">₽</i>
                                                                </li>
                                                                <li className="del_val-time">от 1 рабочего дня</li>
                                                            </ul>
                                                        </li>
                                                        <li className={'itm ' + error.delivery} onClick={() => {
                                                            setOderPar({
                                                                ...oderPar,
                                                                delivery: 'HAPPESTAR'
                                                            });
                                                            if (parseInt(totalPrice, 10) - promo_price < 3000) {
                                                                setDeliveryPrice(250);
                                                            } else {
                                                                setDeliveryPrice(0);
                                                            }
                                                            setWindow('adress');
                                                        }} data-id='HAPPESTAR'>
                                                            <div className='logo'>
                                                                <img src='/static/media/logo.png'/>
                                                            </div>
                                                            <div className='del_desc'>
                                                                <b>Курьерская доставка</b>
                                                                250 рублей в пределах КАД (при заказе от 3000 руб. доставка по СПб, в пределах КАД - бесплатно)
                                                            </div>
                                                            <ul className='del_val'>
                                                                <li className='del_val-rub'>
                                                                    <b>{parseInt(totalPrice, 10) - promo_price < 3000 ? 250 : 0}</b>
                                                                    <i className="rub-symbol">₽</i>
                                                                </li>
                                                                <li className="del_val-time">от 1 рабочего дня</li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="item  _address  adr js---order-contacts-form" ref={refError.address}>
                                                <i className="ico"/>
                                                <div className="ttl">
                                                    Адрес доставки
                                                </div>
                                                <div className="edit">
                                                    <div className="inputs tmpAddressData">
                                                            <div className="suggestions__wrap">
                                                                <input type="text" className={"input " + error.street}
                                                                       name="address"
                                                                       onChange={(el) => setOderPar({
                                                                           ...oderPar,
                                                                           city: el.target.value
                                                                       })}
                                                                       placeholder="Город*"/>
                                                            </div>
                                                            <div className="suggestions__wrap">
                                                                <input type="text" className={"input " + error.street}
                                                                       name="address"
                                                                       onChange={(el) => setOderPar({
                                                                           ...oderPar,
                                                                           street: el.target.value
                                                                       })}
                                                                       placeholder="Улица*"/>
                                                            </div>
                                                            <div className="suggestions__wrap  suggestions__wrap--small">
                                                                <input type="text" className={"input input--small " + error.home}
                                                                       name="address"
                                                                       onChange={(el) => setOderPar({
                                                                           ...oderPar,
                                                                           home: el.target.value
                                                                       })}
                                                                       placeholder="Дом*" required=""/>
                                                            </div>
                                                            <div className="suggestions__wrap  suggestions__wrap--small">
                                                                <input type="text" className={"input input--small " + error.room}
                                                                       name="address"
                                                                       onChange={(el) => setOderPar({
                                                                           ...oderPar,
                                                                           room: el.target.value
                                                                       })}
                                                                       placeholder="Квартира/Офис*"/>
                                                            </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item  _address  maps_google" ref={refError.codePVZ}>
                                                <i className="ico"/>
                                                <div className="ttl">
                                                    Адрес доставки
                                                </div>
                                                <div className="edit">
                                                    <div className={'changeCity'}>
                                                        <input type={'text'} placeholder="Введите город" onChange={(e) => cityMagic(e)}/>
                                                        <div className={'buttonCity'} onClick={() => magicCity()}>Найти</div>
                                                    </div>
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
                                                                            code: el.code,
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
                                                                        <b>{priceDelivery[1]}</b>
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
                                                                            adressPVZ: currentPVZ.address,
                                                                            codePVZ: currentPVZ.code
                                                                        })}
                                                                >{oderPar.adressPVZ === currentPVZ.address ? 'Пункт выбран' : 'Забрать здесь'}</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item _info  js---order-contacts-form" ref={refError.client}>
                                            <i className="ico"/>
                                            <div className="ttl">
                                                2. Контактная информация
                                            </div>
                                            <div className="edit">
                                                <div className="inputs tmpUserData">
                                                    <div className="suggestions__wrap">
                                                        <input type="text" className={"input suggestions-input " + error.surname}
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
                                                        <input type="text" className={"input suggestions-input " + error.name}
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
                                                        <input type="tel" className={"input " + error.phone}
                                                               placeholder="Номер телефона*"
                                                               required=""
                                                               onChange={(el) => setOderPar({
                                                                   ...oderPar,
                                                                   phone: el.target.value
                                                               })}
                                                        />
                                                    </div>

                                                    <div className="suggestions__wrap">
                                                        <input type="email" className={"input " + error.email} placeholder="Email*"
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
                                        <div className="item _payment" ref={refError.pay}>
                                            <i className="ico"/>
                                            <div className="ttl">3. Оплата</div>
                                            <div className="edit">
                                                <div className={"forPaymentTypes "  + oderPar.pay} data-error="Выберите тип оплаты">
                                                    <ul className="ilist _pays">
                                                        <li className={"itm " + error.pay} data-action="setPaymentType"
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
                                                        <li className={"itm " + error.pay} data-action="setPaymentType"
                                                            data-id="CASHLESS"
                                                            onClick={() => setOderPar({
                                                                ...oderPar,
                                                                pay: 'CashLess'
                                                            })}
                                                        >
                                                            <img src="/static/media/pay_img_2.svg"
                                                                 alt=""/>
                                                            <span>Картой при получении</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="next _submit">
                                                    <div className="formalizeTotal">
                                                        <div className="_submit-item">
                                                            <span>Стоимость доставки: </span>{deliveryPrice}&nbsp;<i
                                                            className="rub-symbol">₽</i></div>
                                                        <div className="_submit-item  _submit-item--final">
                                                            <span>Итого: </span>{parseInt(totalPrice, 10) - (parseInt(totalPrice, 10) / 100) * promo_price + deliveryPrice}&nbsp;<i
                                                            className="rub-symbol">₽</i>
                                                        </div>
                                                    </div>
                                                    {payButton}
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
    } else if (idOder === 0){
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
    } else {
        cartItems.map((el) => removeItem(el.id));
        return(
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
                    <div className="table okTable">
                        <div className='iconAccess'>
                            <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="check-circle"
                                 role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                 className="svg-inline--fa fa-check-circle fa-w-16 fa-9x">
                                <path fill="currentColor"
                                      d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z"
                                      className=""></path>
                            </svg>
                            </div>
                        <h1 className='qwertyasd'>Заказ №{idOder} оформлен!</h1>
                        <p className='qwertyasd1'>Мы отправили на почту письмо с подтверждением Вашего заказа.</p>
                    </div>
                </div>
            </div>
        )
    }
};

export { Cart };
