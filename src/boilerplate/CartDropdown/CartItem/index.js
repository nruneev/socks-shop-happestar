import './index.sass'
import React, { useContext } from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import {useTranslation} from "react-i18next";
import {CartContext} from "../../../utils/contexts";


const CartItem = ({ item, removeItem }) => {
    let { setItem } = useContext(CartContext);
    const { t } = useTranslation();

    return (
        <tr className='cart-item'>
            <td className='artikul'>
                <p>MSS073-BIRD01-NV18</p>
            </td>
            <td className='img'>
                <img src={item.src} alt={item.name}/>
            </td>
            <td className='name'>
                <p>{item.name}</p>
            </td>
            <td className='color'>
                <span></span>
            </td>
            <td className='size'>
                <p>{item.sizes}</p>
            </td>
            <td className='cost'>
                <p>{item.cost}Р</p>
            </td>

            <td className='buttons'>
                <button className='active'>
                    <span onClick={() => setItem(item, --item.count)}>–</span>
                    <span>{item.count}</span>
                    <span onClick={() => setItem(item, ++item.count)}>+</span>
                </button>
            </td>

            <td className='full-price'> 
                <p>{item.cost * item.count}Р</p>
            </td>

            <FaTrashAlt className='trash' onClick={() => removeItem(item.id)}/>
        </tr>
    );
};


export { CartItem }
