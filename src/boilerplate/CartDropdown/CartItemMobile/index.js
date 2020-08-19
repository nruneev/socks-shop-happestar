import './index.sass'
import React, { useContext } from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import {useTranslation} from "react-i18next";
import {CartContext} from "../../../utils/contexts";


const CartItemMobile = ({ item, removeItem }) => {
    let { setItem } = useContext(CartContext);
    const { t } = useTranslation();

    const block = item.isNabor ?

        <div className='blockItem'>
            {item.item.map((el) => {
                return (<p className='nabor-item'>
                    <img src={el.src}/>
                    {el.name}
                    <span>{el.article}</span>
                    <span>{el.sizes}</span>
                </p>)
            })}
        </div>
        :
        <>
            <p className="art">{item.article}</p>
            <p><span>Размер:</span>{item.sizes}</p>
        </>;

    return (
        <li className="lists goodsInCartMobile">
            <a href={"/good?id=" + item.id} className="img">
                <img src={item.src} alt={item.name}/>
            </a>
            <div className="info">
                <a href={"/good?id=" + item.id} className="name">{item.name}</a>
                <div className="desc">
                    <p>
                        {block}
                    </p>
                </div>
                <div className="coast">
                    <span className="cur _rub_">{item.cost} <i className="rub-symbol">₽</i></span>
                </div>
                <ul className="_counter_">
                    <li className="_minus" onClick={() => setItem(item, --item.count)}>–</li>
                    <li className="_num">{item.count}</li>
                    <li className="_plus" onClick={() => setItem(item, ++item.count)}>+</li>
                </ul>
                <b className="total _rub_ sum">{item.cost * item.count} <i className="rub-symbol">₽</i></b>
            </div>
            <FaTrashAlt className='trash' onClick={() => removeItem(item.id)}/>
        </li>
    );
};


export { CartItemMobile }
