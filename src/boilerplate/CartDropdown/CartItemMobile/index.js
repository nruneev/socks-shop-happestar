import './index.sass'
import React, { useContext } from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import {useTranslation} from "react-i18next";
import {CartContext} from "../../../utils/contexts";


const CartItemMobile = ({ item, removeItem }) => {
    let { setItem } = useContext(CartContext);
    const { t } = useTranslation();

    return (
        <tr className='cart-item'>
            <td className='img'>
                <img src={item.src} alt={item.name}/>
            </td>
            <div>
                <td className='name'>
                    <label>{item.name}</label>
                </td>

                <td className='buttons'>
                    <button className='active'>
                        <span onClick={() => setItem(item, --item.count)}>–</span>
                        <span>{item.count}</span>
                        <span onClick={() => setItem(item, ++item.count)}>+</span>
                    </button>
                </td>

                <td className='full-price'>
                    <label>{item.cost * item.count}Р</label>
                </td>
            </div>

            <FaTrashAlt className='trash' onClick={() => removeItem(item.id)}/>
        </tr>
    );
};


export { CartItemMobile }
