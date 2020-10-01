import './index.sass'
import React, { useContext } from 'react'
import {useTranslation} from "react-i18next";
import {CartContext} from "../../../utils/contexts";


const CartItemAdmin = ({ item }) => {
    let { setItem } = useContext(CartContext);
    const { t } = useTranslation();
    if (item.isNabor) {
        console.log(item);
    }

    const block = item.isNabor ?

        <div className='blockItem'>
            {item.item.map((el) => {
                return (<a href={"/good?id=" + el.ids} className='nabor-item'>
                            <img src={el.src}/>
                            {el.name}
                            <span>{el.article}</span>
                        </a>)
            })}
        </div>
        :
        <p className="art">{item.article}</p>;

    const sizer = item.isNabor ?

        <div className='blockItem'>
            {item.item.map((el) => {
                return (<p className='nabor-item'>
                    <span>{el.sizes}</span>
                </p>)
            })}
        </div>
        :
        <p className="art">{item.sizes}</p>;


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
                {sizer}
            </td>
            <td>
                <span className="coast">{item.cost}₽</span>
            </td>
            <td className="count">
                <ul className="_counter_">
                    <li className="_num">{item.count}</li>
                </ul>
            </td>

            <td>
                <p className="sum _rub_ total">{item.cost * item.count}Р</p>
            </td>
        </tr>
    );
};


export { CartItemAdmin }
