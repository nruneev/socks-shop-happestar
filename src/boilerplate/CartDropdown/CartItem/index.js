import './index.sass'
import React, { useContext } from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import {useTranslation} from "react-i18next";
import {CartContext} from "../../../utils/contexts";


const CartItem = ({ item, removeItem }) => {
    let { setItem } = useContext(CartContext);
    const { t } = useTranslation();

    return (
        <div className='cart-item'>
            <div className='img'>
                <img src={item.src} alt={item.name}/>
            </div>
            <div className='info'>
                <div className='labels'>
                    <label>{item.name}</label>
                    <label>{item.cost * item.count}Р</label>
                </div>
                <div className='buttons'>
                    <button className='active'>
                        <span onClick={() => setItem(item, --item.count)}>–</span>
                        <span>{item.count}</span>
                        <span onClick={() => setItem(item, ++item.count)}>+</span>
                    </button>
                    <FaTrashAlt className='trash' onClick={() => removeItem(item.id)}/>
                </div>
            </div>
        </div>
    );
};


export { CartItem }