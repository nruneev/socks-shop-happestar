import './index.sass'
import React, {useContext, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {get_item} from "../../utils/helpers";
import {CartContext} from "../../utils/contexts";
import {get_items, useFetch} from "../../utils/requests";
import {ItemCardGood} from "../../components/ItemCardGood";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Good = () => {
    let history = useHistory();
    let itemer = useFetch(get_items, []);

    let [preload, setPreload] = useState(true);

    let [descr, setDescr] = useState(0);

    let classDescr = ''

    switch (descr) {
        case 0:
            classDescr = '';
            break;
        case 1:
            classDescr = 'first';
            break;
        case 2:
            classDescr = 'second';
            break;
        case 3:
            classDescr = 'third';
            break;
        case 4:
            classDescr = 'four';
            break;
    }

    let query = useQuery();
    const id = query.get('id');

    itemer = itemer.filter((el) => el.id !== id)
    itemer = itemer.slice(0, 4);
    console.log(itemer);

    let [actualPhotos, setActual] = useState(0);
    let [count, setCount] = useState(0);

    let [item, pushItem] = useState({});

    if (preload) {
        get_item(id).then((result) => {
            console.log(result);
            let color = '';
            switch (result[0].color_id) {
                case '1':
                    color = 'gray';
                    break;
                case '2':
                    color = 'black';
                    break;
                case '3':
                    color = 'white';
                    break;
                case '4':
                    color = 'red';
                    break;
                case '5':
                    color = 'orange';
                    break;
                case '6':
                    color = 'yellow';
                    break;
                case '7':
                    color = 'green';
                    break;
                case '8':
                    color = 'pink';
                    break;
                case '9':
                    color = 'blue';
                    break;
                case '10':
                    color = 'gradient';
                    break;
            }
            pushItem({
                id: result[0].id,
                article: result[0].article,
                src: result[0].photoMain,
                composition: result[0].composition,
                photos: [result[0].photoMain, result[0].photoLeft, result[0].photoDetail],
                name: result[0].name,
                cost: result[0].price,
                sizes: ['35 - 39', '40 - 45'],
                color: color,
                description: result[0].description,
                discount: 15,
                prev_cost: result[0].price,
            })
            setPreload(false);
        });
    }

    const {setItem, cartItems } = useContext(CartContext);
    let isAdd = false;
    let [activeSize, setActiveSize] = useState('');
    let itemInCart = cartItems.find((el) => el.ids === item.id && el.sizes === activeSize);
    console.log(itemInCart);

    let classNamess = '';

    let counter = itemInCart ?
        <ul className='_counter_'>
            <li className="_minus" onClick={() => setItem(itemInCart, --itemInCart.count)}>–</li>
            <li className="_num">{itemInCart.count}</li>
            <li className="_plus" onClick={() => setItem(itemInCart, ++itemInCart.count)}>+</li>
        </ul> :
        <>
            <ul className="_counter_">
                <li className="_minus" onClick={() => {
                    if (count > 0) {
                        setCount(--count)
                    }
                }}>–</li>
                <li className="_num">{count}</li>
                <li className="_plus" onClick={() => setCount(++count)}>+</li>
            </ul>
        </>;

    if (itemInCart) {
        isAdd = true;
    } else {
        itemInCart = item;
        itemInCart.count = 0;
    }

    if(preload) {
        return (<div>Загрузка</div>)
    }

    return (
        <div className='wrapper'>
            <div className='wrapperss'>
                <div className="prod">
                    <div className="mod_top"></div>
                    <div className="photos">
                        <div className='thumbs'>
                            {item.photos.map((el, key) => {
                                const classer = key === actualPhotos ? 'selected' : '';
                                return (<div className={'swiper-slide ' + classer} onClick={() => setActual(key)}><img src={el}/></div>)
                            })}
                        </div>
                        <div className="main-wrap">
                            <img src={item.photos[actualPhotos]} alt={item.name}/>
                        </div>
                    </div>
                    <div className="content">
                        <div className='linkerer'>
                            <ul>
                                <li><a href={'./'}>Главная</a></li>
                                <li><a onClick={() => history.goBack()}>Назад</a></li>
                                <li><a href={'./catalog'}>Каталог</a></li>
                                <li><span>{item.name}</span></li>
                            </ul>
                        </div>
                        <h1 className="title">{item.name}</h1>
                        <div className="info">
                            <p className="art" data-title="Артикул">{item.article}</p>
                            <ul className="colors" data-title="цвета">
                                <li>
                                    <span className={"_no_css_class active-color " + item.color}></span>
                                </li>
                            </ul>
                            <ul className="sizes " data-title="размер">
                                {item.sizes.map((size, key) => {
                                    classNamess = isAdd ? "act" : "";
                                    let className = activeSize === size ? "active" : "";
                                    return <li className={className} onClick={() => setActiveSize(size)}>{size}</li>
                                })}
                            </ul>
                            <div className="art" data-title="количество">
                                <td className="count">
                                    {counter}
                                </td>
                            </div>
                        </div>
                        <div className="cost ">
                            <span className="cur _rub_">{item.cost} <i className="rub-symbol">₽</i></span>
                        </div>
                        <div className="btns">
                            <button onClick={() => {
                                if (!isAdd) {
                                    if (activeSize !== '') {
                                        setItem({
                                            id: Math.abs(Math.random() * 100),
                                            ids: item.id,
                                            article: item.article,
                                            src: item.src,
                                            name: item.name,
                                            cost: item.cost,
                                            discount: 15,
                                            prev_cost: item.cost,
                                            status: item.status,
                                            tags: item.tags,
                                            isNabor: false,
                                            sizes: activeSize
                                        }, count)
                                    } else {
                                        alert('Выберите размер!')
                                    }
                                }
                            }} className={"_incart  js---buy-btn " + classNamess}>
                                {isAdd ? "Товар уже в корзине" : "Положить в корзину"}
                            </button>
                        </div>
                        <ul className={'accrd ' + classDescr}>
                            <li className='child' onClick={() => setDescr(1)}>
                                <div className='ttl'>Описание</div>
                                <div className='descr'>
                                    <p>{item.description}</p>
                                </div>
                            </li>
                            <li className='child' onClick={() => setDescr(2)}>
                                <div className='ttl'>Cостав</div>
                                <div className='descr'>
                                    <p>{item.composition}</p>
                                </div>
                            </li>
                            <li className='child' onClick={() => setDescr(3)}>
                                <div className='ttl'>Доставка</div>
                                <div className='descr'>
                                    <p>
                                        КУРЬЕРСКАЯ ДОСТАВКА ПО САНКТ-ПЕТЕРБУРГУ - ОТ 170 РУБ.

                                        -Сроки доставки от 1 до 2-х рабочих дней. С 9:00 до 18:00 (Пн-Пт)



                                        ДОСТАВКА ДО ПУНКТА ВЫДАЧИ В САНКТ-ПЕТЕРБУРГЕ - ОТ 90 РУБ.

                                        -Сроки доставки от 1 до 2-х рабочих дней

                                        -Заказ хранится в пункте выдаче 12 дней.



                                        ДОСТАВКА В РЕГИОНЫ КУРЬЕРОМ (СДЭК) - ОТ 250 РУБ.

                                        -Стоимость и сроки рассчитываются при оформлении заказа

                                        -Доставка с ПН по ПТ с 9:00 до 18:00



                                        ДОСТАВКА ДО ПУНКТА ВЫДАЧИ В РЕГИОНАХ (СДЭК) - ОТ 170 РУБ.

                                        -Стоимость и сроки рассчитываются при оформлении заказа

                                        -Заказ хранится в пункте выдачи 12 дней



                                        ДОСТАВКА ПОЧТОЙ РОССИИ 1 КЛАССОМ - от 300 РУБ.

                                        -Услуга примерки недоступна

                                        -Частичный выкуп заказа отсутствует

                                        -Заказ хранится на почте 30 дней
                                    </p>
                                </div>
                            </li>
                            <li className='child' onClick={() => setDescr(4)}>
                                <div className='ttl'>Оплата</div>
                                <div className='descr'>
                                    <p>
                                        Оплатить заказанные товары можно одним из указанных ниже способов:

                                        1. Наличными или картой при получении заказа

                                        2. Онлайн оплата картой или электронными деньгами.
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='prod_mobile'>
                    <div className="mod_top">
                        <div className='linkerer'>
                            <ul>
                                <li><a href={'./'}>Главная</a></li>
                                <li><a onClick={() => history.goBack()}>Назад</a></li>
                                <li><a href={'./catalog'}>Каталог</a></li>
                                <li><span>{item.name}</span></li>
                            </ul>
                        </div>
                        <p>{item.name}</p>
                    </div>
                    <div className='photos'>
                        <img src={item.photos[0]} alt={item.name}/>
                    </div>
                    <div className='content'>
                        <div className='info'>
                            <p className="art" data-title="Артикул">{item.article}</p>
                            <ul className="colors" data-title="цвета">
                                <li>
                                    <span className={"_no_css_class active-color " + item.color}></span>
                                </li>
                            </ul>
                            <ul className="sizes " data-title="размер">
                                {item.sizes.map((size, key) => {
                                    classNamess = isAdd ? "act" : "";
                                    let className = activeSize === size ? "active" : "";
                                    return <li className={className} onClick={() => setActiveSize(size)}>{size}</li>
                                })}
                            </ul>
                            <div className="art" data-title="количество">
                                <td className="count">
                                    {counter}
                                </td>
                            </div>
                        </div>
                        <div className="cost ">
                            <span className="cur _rub_">{item.cost} <i className="rub-symbol">₽</i></span>
                        </div>
                        <div className="btns">
                            <button onClick={() => {
                                if (!isAdd) {
                                    if (activeSize !== '') {
                                        setItem({
                                            id: Math.abs(Math.random() * 100),
                                            ids: item.id,
                                            article: item.article,
                                            src: item.src,
                                            name: item.name,
                                            cost: item.cost,
                                            discount: 15,
                                            prev_cost: item.cost,
                                            status: item.status,
                                            tags: item.tags,
                                            isNabor: false,
                                            sizes: activeSize
                                        }, count)
                                    } else {
                                        alert('Выберите размер!')
                                    }
                                }
                            }} className={"_incart  js---buy-btn " + classNamess}>
                                {isAdd ? "Товар уже в корзине" : "Положить в корзину"}
                            </button>
                        </div>
                        <ul className={'accrd ' + classDescr}>
                            <li className='child' onClick={() => setDescr(1)}>
                                <div className='ttl'>Описание</div>
                                <div className='descr'>
                                    <p>{item.description}</p>
                                </div>
                            </li>
                            <li className='child' onClick={() => setDescr(2)}>
                                <div className='ttl'>Cостав</div>
                                <div className='descr'>
                                    <p>{item.composition}</p>
                                </div>
                            </li>
                            <li className='child' onClick={() => setDescr(3)}>
                                <div className='ttl'>Доставка</div>
                                <div className='descr'>
                                    <p>
                                        КУРЬЕРСКАЯ ДОСТАВКА ПО САНКТ-ПЕТЕРБУРГУ - ОТ 170 РУБ.

                                        -Сроки доставки от 1 до 2-х рабочих дней. С 9:00 до 18:00 (Пн-Пт)



                                        ДОСТАВКА ДО ПУНКТА ВЫДАЧИ В САНКТ-ПЕТЕРБУРГЕ - ОТ 90 РУБ.

                                        -Сроки доставки от 1 до 2-х рабочих дней

                                        -Заказ хранится в пункте выдаче 12 дней.



                                        ДОСТАВКА В РЕГИОНЫ КУРЬЕРОМ (СДЭК) - ОТ 250 РУБ.

                                        -Стоимость и сроки рассчитываются при оформлении заказа

                                        -Доставка с ПН по ПТ с 9:00 до 18:00



                                        ДОСТАВКА ДО ПУНКТА ВЫДАЧИ В РЕГИОНАХ (СДЭК) - ОТ 170 РУБ.

                                        -Стоимость и сроки рассчитываются при оформлении заказа

                                        -Заказ хранится в пункте выдачи 12 дней



                                        ДОСТАВКА ПОЧТОЙ РОССИИ 1 КЛАССОМ - от 300 РУБ.

                                        -Услуга примерки недоступна

                                        -Частичный выкуп заказа отсутствует

                                        -Заказ хранится на почте 30 дней
                                    </p>
                                </div>
                            </li>
                            <li className='child' onClick={() => setDescr(4)}>
                                <div className='ttl'>Оплата</div>
                                <div className='descr'>
                                    <p>
                                        Оплатить заказанные товары можно одним из указанных ниже способов:

                         className={'accrd ' + classDescr}               1. Наличными или картой при получении заказа

                                        2. Онлайн оплата картой или электронными деньгами.
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='container'>
                <h1>МЫ РЕКОМЕНДУЕМ</h1>
                <div className='product-list'>
                    {itemer.map((el) => {return <ItemCardGood item={el}/>})}
                </div>
            </div>
        </div>
    )
};

export { Good };
