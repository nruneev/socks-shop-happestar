import './index.sass'
import React, {useContext, useState} from 'react';
import {
    useLocation
} from 'react-router-dom';
import {get_item} from "../../utils/helpers";
import {CartContext} from "../../utils/contexts";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Good = () => {

    let query = useQuery();
    const id = query.get('id');
    let [item, pushItem] = useState([]);
    let _ = get_item(id).then((result) => {
            pushItem(item = {
                id: result[0].id,
                article: result[0].article,
                src: result[0].photoMain,
                name: result[0].name,
                cost: result[0].price,
                sizes: ['35 - 39'],
                description: result[0].description,
                discount: 15,
                prev_cost: result[0].price,
            })
    });

    const {setItem, cartItems } = useContext(CartContext);
    const sizes = ['35 - 39'];
    let isAdd = false;
    let itemInCart = cartItems.find((el) => el.id === item.id);
    if (itemInCart) {
        isAdd = true;
    } else {
        itemInCart = item;
        itemInCart.count = 0;
    }
    let [activeSize, setActiveSize] = useState(0);
    let classNamess = '';
    return (
        <div className='wrapper'>
            <div className='wrapperss'>
                <div className="prod">
                    <div className="mod_top"></div>
                    <div className="photos">
                        <div className='linker'>
                            <ul>
                                <li><a href={'./'}>Главная</a></li>
                                <li><a href={'./catalog'}>Каталог</a></li>
                                <li><span>{item.name}</span></li>
                            </ul>
                        </div>
                        <div className="main-wrap">
                            <img src={item.src} alt={item.name}/>
                        </div>
                    </div>
                    <div className="content">
                        <h1 className="title">{item.name}</h1>
                        <div className="info">
                            <p className="art" data-title="Артикул">{item.article}</p>
                            <p className="art" data-title="бренд">
                                <p>{item.name}</p>
                            </p>
                            <ul className="sizes " data-title="размер">
                                {sizes.map((size, key) => {
                                    classNamess = isAdd ? "act" : "";
                                    let className = activeSize === key ? "active" : "";
                                    return <li className={className} onClick={() => setActiveSize(key)}>{size}</li>
                                })}
                            </ul>

                            <div className="art" data-title="количество">
                                <td className="count">
                                    <ul className="_counter_">
                                        <li className="_minus" onClick={() => setItem(itemInCart, --itemInCart.count)}>–</li>
                                        <li className="_num">{itemInCart.count}</li>
                                        <li className="_plus" onClick={() => setItem(itemInCart, ++itemInCart.count)}>+</li>
                                    </ul>
                                </td>
                            </div>
                        </div>
                        <div className="cost ">
                            <span className="cur _rub_">{item.cost} <i className="rub-symbol">₽</i></span>
                        </div>
                        <div className="btns">
                            <button onClick={() => isAdd ? null : setItem(item)} className={"_incart  js---buy-btn " + classNamess}>
                                {isAdd ? "Товар уже в корзине" : "Положить в корзину"}
                            </button>
                        </div>
                        <div className="descr">
                            <p>{item.description}</p>
                        </div>
                    </div>
                </div>
                <div className='prod_mobile'>
                    <div className="mod_top">
                        <div className='linker'>
                            <ul>
                                <li><a href={'./'}>Главная</a></li>
                                <li><a href={'./catalog'}>Каталог</a></li>
                                <li><span>{item.name}</span></li>
                            </ul>
                        </div>
                        <p>{item.name}</p>
                    </div>
                    <div className='photos'>
                    </div>
                    <div className='content'>
                        <div className='info'>
                            <p className="art" data-title="Артикул">{item.article}</p>
                            <p className="art" data-title="бренд">
                                <p>{item.name}</p>
                            </p>
                            <ul className="sizes " data-title="размер">
                                {sizes.map((size, key) => {
                                    classNamess = isAdd ? "act" : "";
                                    let className = activeSize === key ? "active" : "";
                                    return <li className={className} onClick={() => setActiveSize(key)}>{size}</li>
                                })}
                            </ul>
                            <div className="art" data-title="количество">
                                <td className="count">
                                    <ul className="_counter_">
                                        <li className="_minus" onClick={() => setItem(itemInCart, --itemInCart.count)}>–</li>
                                        <li className="_num">{itemInCart.count}</li>
                                        <li className="_plus" onClick={() => setItem(itemInCart, ++itemInCart.count)}>+</li>
                                    </ul>
                                </td>
                            </div>
                        </div>
                        <div className="descr">
                            <p>{item.description}</p>
                        </div>
                        <div className="cost ">
                            <span className="cur _rub_">{item.cost} <i className="rub-symbol">₽</i></span>
                        </div>
                        <div className="btns">
                            <button onClick={() => isAdd ? null : setItem(item)} className={"_incart  js---buy-btn " + classNamess}>
                                {isAdd ? "Товар уже в корзине" : "Положить в корзину"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
};

export { Good };
