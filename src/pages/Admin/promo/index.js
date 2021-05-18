import './index.sass'
import React, {useState} from 'react';
import {get_items_admin, useFetch} from "../../../utils/requests";
import {ItemCardAdmin} from "../../../components/ItemCardAdmin";
import {ItemCardPromo} from "../../../components/ItemCardPromo";

export const BTS = (toggle) => {

    const changeActive = (id, toggleState) => {
        fetch("/php/changePromo.php?id=" + id + "&toggle=" + toggleState).then(() => document.location.href = document.location.href);
    }

    if(parseInt(toggle.item.toggle, 10) === 1) {
        return (<div className={'clicker'} onClick={() => changeActive(toggle.item.id, 0)}>Отключить</div>)
    }
    return (<div className={'clicker'} onClick={() => changeActive(toggle.item.id, 1)}>Включить</div>)
}

export const Del = (toggle) => {

    const Delite = (id) => {
        fetch("/php/DelPromo.php?id=" + id).then(() => document.location.href = document.location.href);
    }

    return (<div className={'clicker'} onClick={() => Delite(toggle.item.id)}>Удалить</div>)
}

export const Promo = (element) => {
    console.log(element)
    let str = '';
    if (element.item.filters.length > 0) {
        element.item.filters.map((el) => str += el.price + '% ')
    }

    let [classFor, setClasser] = useState('');

    return (
        <div>
            <div>
                <p className={'loginPromoLink classPromor'} onClick={() => {
                    if(classFor === "") {
                        setClasser('mainInfosShow')
                    } else {
                        setClasser('')
                    }
                }}>
                    <div className={'mainInfo'}>
                        <div>{element.item.name}: {str}</div>
                        <div className={'clickerButton'}>
                            <BTS item={element.item}/>
                            <Del item={element.item}/>
                        </div>
                    </div>
                    {element.item.filters.map((el, count) => {

                        let strItem = "" + el.child.itemer.map((elem, qaz) => " " + elem);

                        return (
                            <div className={'mainInfoDetail ' + classFor}>
                                <div>Все товары: {el.child.allItem ? "Да" : "Нет"}</div>
                                <div>Все наборы: {el.child.allPack ? "Да" : "Нет"}</div>
                                <div>Все наборы и товары: {el.child.all ? "Да" : "Нет"}</div>
                                <div>ID товаров: {strItem}</div>
                                <div>Наборы 3шт: {el.child.pack[0] ? "Да" : "Нет"}</div>
                                <div>Наборы 4шт: {el.child.pack[1] ? "Да" : "Нет"}</div>
                                <div>Наборы 5шт: {el.child.pack[2] ? "Да" : "Нет"}</div>
                                <div>Наборы 6шт: {el.child.pack[3] ? "Да" : "Нет"}</div>
                                <div>Наборы 8шт: {el.child.pack[4] ? "Да" : "Нет"}</div>
                                <br/>
                            </div>
                        )
                    })}
                </p>
            </div>
            <div>
            </div>
        </div>
    )}

const AdminsPromoPage = () => {

    if (sessionStorage.getItem('loginAdmin') !== 'ok') {
        document.location.href = "/admin/login";
    }

    let [toggleGood, setClass] = useState('');

    let items = useFetch(get_items_admin, []);

    let [preload, setPreload] = useState(false)

    let [item, setItem] = useState({
        name: "",
        items: [
            {
                child: {
                    allItem: false,
                    allPack: false,
                    all: false,
                    itemer: [],
                    pack: [false, false, false, false, false],
                },
                price: 0
            }
        ]
    })

    let [selectedGoods, setGoods] = useState([]);
    console.log(item);

    let [promos, setPromo] = useState([]);

    const saveEdit = () => {
        fetch("/php/savePromo.php?promo=" + item.name + "&filter=" + JSON.stringify(item.items)).then(() => document.location.href = document.location.href);
    }

    if (!preload) {
        fetch("/php/loadPromo.php").then(function (response) {
            return response.json();
        })
            .then(function (data) {
                let peom = []
                data.map((el) => peom.push({
                    id: el.id,
                    name: el.promo,
                    filters: JSON.parse(el.filter),
                    toggle: el.toggle,
                }));
                setPromo(peom)
                setPreload(true);
            }).catch(reason => console.log(reason));
    }

    let selectGoodser =  (key) => {
        return (
            <div className={'selectGood ' + toggleGood}>
                <div className={'adminCatalog promoList'}>
                    {items.map((el) => {
                        return (<ItemCardPromo selectId={selectedGoods} setGoods={setGoods} item={el}/>)
                    })}
                </div>
                <div className={'selectGood_bottomPanel'}>
                    <div onClick={() => setClass('')} className={'login-btn'}>
                        <p>Отменит</p>
                    </div>
                    <div className={'login-btn'} onClick={() => {
                        item.items[key].child.itemer = selectedGoods;
                        setItem({
                            ...item
                        });
                        setClass('');
                    }}>
                        <p>Сохранить</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={'wrapper adminBlockFlex'}>
            <div className={'loginNavigation'}>
                <a href={'oder'} className={'loginNavigationItem'}>
                    История Заказов
                </a>
                <a href={'good'} className={'loginNavigationItem'}>
                    Товары
                </a>
                <a href={'text'} className={'loginNavigationItem'}>
                    Текст на сайте
                </a>
                <a href={'photo'} className={'loginNavigationItem'}>
                    Фото на сайте
                </a>
                <a href={'promo'} className={'loginNavigationItem activeLoginBlock'}>
                    Промо
                </a>
            </div>
            <div className={'loginRightBlock'}>
                <h1>Промо</h1>
                <div className={'login-input'}>
                    <p>Название</p>
                    <input placeholder={'Название'} type={'text'} value={item.name} onChange={(e) => setItem({
                        ...item,
                        name: e.target.value
                    })}/>
                </div>
                {
                    item.items.map((el, key) => {
                        return(
                            <div>
                                {selectGoodser(key)}
                                <div className={'login-checkbox'}>
                                    <input type={'checkbox'} name={'visibility'} checked={el.child.allItem}
                                           onChange={() => {
                                               item.items[key].child.allItem = !item.items[key].child.allItem
                                               setItem({
                                                   ...item
                                           })}}/>
                                    <label>Все товары</label>
                                </div>
                                <div className={'login-checkbox'}>
                                    <input type={'checkbox'} name={'visibility'} checked={el.child.allPack}
                                           onChange={() => {
                                               item.items[key].child.allPack = !item.items[key].child.allPack
                                               setItem({
                                                   ...item
                                               })}}/>
                                    <label>Все наборы</label>
                                </div>
                                <div className={'login-checkbox'}>
                                    <input type={'checkbox'} name={'visibility'} checked={el.child.all}
                                           onChange={() => {
                                               item.items[key].child.all = !item.items[key].child.all
                                               setItem({
                                                   ...item
                                               })}}/>
                                    <label>Все наборы и товары</label>
                                </div>
                                <button type="button" onClick={() => {
                                    setGoods([...item.items[key].child.itemer]);
                                    setClass('selecteds');
                                }} className={'login-btn addGoodDisc'}>
                                    <p>Добавить товары</p>
                                </button>
                                <div className={'selectGroup'}>
                                    <div className={'login-checkbox'}>
                                        <input type={'checkbox'} name={'visibility'} checked={el.child.pack[0]}
                                               onChange={() => {
                                                   item.items[key].child.pack[0] = !item.items[key].child.pack[0]
                                                   setItem({
                                                       ...item
                                                   })}}/>
                                        <label>Набор из 3 шт.</label>
                                    </div>
                                    <div className={'login-checkbox'}>
                                        <input type={'checkbox'} name={'visibility'} checked={el.child.pack[1]}
                                               onChange={() => {
                                                   item.items[key].child.pack[1] = !item.items[key].child.pack[1]
                                                   setItem({
                                                       ...item
                                                   })}}/>
                                        <label>Набор из 4 шт.</label>
                                    </div>
                                    <div className={'login-checkbox'}>
                                        <input type={'checkbox'} name={'visibility'} checked={el.child.pack[2]}
                                               onChange={() => {
                                                   item.items[key].child.pack[2] = !item.items[key].child.pack[2]
                                                   setItem({
                                                       ...item
                                                   })}}/>
                                        <label>Набор из 5 шт.</label>
                                    </div>
                                    <div className={'login-checkbox'}>
                                        <input type={'checkbox'} name={'visibility'} checked={el.child.pack[3]}
                                               onChange={() => {
                                                   item.items[key].child.pack[3] = !item.items[key].child.pack[3]
                                                   setItem({
                                                       ...item
                                                   })}}/>
                                        <label>Набор из 6 шт.</label>
                                    </div>
                                    <div className={'login-checkbox'}>
                                        <input type={'checkbox'} name={'visibility'} checked={el.child.pack[4]}
                                               onChange={() => {
                                                   item.items[key].child.pack[4] = !item.items[key].child.pack[4]
                                                   setItem({
                                                       ...item
                                                   })}}/>
                                        <label>Набор из 8 шт.</label>
                                    </div>
                                </div>
                                <div className={'login-input'}>
                                    <p>Скидка</p>
                                    <input placeholder={'Скидка'} type={'number'} value={item.items[key].price} onChange={(e) => {
                                        item.items[key].price = e.target.value;
                                        setItem({
                                            ...item
                                        })
                                    }}/>
                                </div>
                            </div>
                        )
                    })
                }
                <div onClick={() => {
                    item.items.push({
                        child: {
                            allItem: false,
                            allPack: false,
                            itemer: [],
                            pack: [false, false, false, false, false],
                        },
                        price: 0
                    });
                    setItem({
                        ...item
                    })
                }} className={'login-btn'}>
                    <p>+</p>
                </div>
                <div onClick={() => saveEdit()} className={'login-btn'}>
                    <p>Сохранить</p>
                </div>
                {promos.map((el) => {
                    return(<Promo item={el}/>)
                })}
            </div>
        </div>
    )
}

export { AdminsPromoPage }
