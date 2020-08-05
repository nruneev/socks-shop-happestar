import './index.sass'
import React, { useContext } from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import {useTranslation} from "react-i18next";
import {CartContext} from "../../../utils/contexts";


const CartItem = ({ item, removeItem }) => {
    let { setItem } = useContext(CartContext);
    const { t } = useTranslation();
    if (item.isNabor) {
        console.log(item);
    }

    const block = item.isNabor ?

        <div className='blockItem'>
            {item.item.map((el) => {
                return (<p className='nabor-item'>
                            <img src={el.src}/>
                            {el.name}
                            <span>{el.sizes}</span>
                        </p>)
            })}
        </div>
        :
        <p className="art">{item.article}</p>;


    return (
        <tr className='tr goodInCart'>
            <td className='imageName'>
                <a className="img" href={"/good?id=" + item.ids}>
                    <img src={item.src} alt={item.name}/>
                </a>
                <div className="cnt"><a href={"/good?id=" + item.ids}>{item.name}</a></div>
            </td>
            <td>
                {block}
            </td>
            <td>
                <span>{item.sizes}</span>
            </td>
            <td>
                <span className="coast">{item.cost}₽</span>
            </td>
            <td className="count">
                <ul className="_counter_">
                    <li className="_minus" onClick={() => setItem(item, --item.count)}>–</li>
                    <li className="_num">{item.count}</li>
                    <li className="_plus" onClick={() => setItem(item, ++item.count)}>+</li>
                </ul>
            </td>

            <td>
                <p className="sum _rub_ total">{item.cost * item.count}Р</p>
            </td>

            <td className='trash_td'>
                <FaTrashAlt className='trash' onClick={() => removeItem(item.id)}/>
            </td>
        </tr>
    );
};


export { CartItem }
