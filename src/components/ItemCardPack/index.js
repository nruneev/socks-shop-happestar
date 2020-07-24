import './index.sass'
import React from 'react';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCartArrowDown, FaTrashAlt } from 'react-icons/fa'
import { STATUS } from '../../utils/requests';
import {PackContext} from "../../utils/contexts";

const statusClasses = new Map();
statusClasses.set(STATUS.NONE, '');
statusClasses.set(STATUS.NEW, 'new');
statusClasses.set(STATUS.SELL, 'sell');


const ItemCardPack = ({ length, item, width, size }) => {
    if(width) {
        width -= 4;
        let items = document.getElementsByClassName('item');
        items && [].forEach.call(items, ((item) => item.style.width = width));
    }

    const { setItem, removeItemPack, packItems } = useContext(PackContext);
    const { t } = useTranslation();

    let itemInCart = packItems.filter((el) => (el.ids === item.id && el.sizes === size[0]));

    let button = itemInCart.length > 0 ?
        <p className='active'>
            <div className='info'>
                <label className='cost'>{item.cost}₽</label>
                <FaTrashAlt className='trash' onClick={() => removeItemPack(item.id)}/>
            </div>
            <button onClick={() => {
                if (length.length != 0) {
                    if (size[0]) {
                        if (packItems.length < parseInt(length, 10)) {
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
                                sizes: size[0]
                            });
                        } else {
                            alert('Ваш набор собран, добавьте его в корзину');
                        }
                    } else {
                        alert('Вы не выбрали размер носков');
                    }
                } else {
                    alert('Вы не выбрали размер набора');
                }
            }
            }><FaCartArrowDown/></button>
        </p> :
        <>
            <div className='info'>
                <label className='cost'>{item.cost}₽</label>
            </div>
            <button onClick={() => {
                console.log(length);
                if (length.length != 0) {
                    if (size[0]) {
                        if (packItems.length < parseInt(length, 10)) {
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
                                sizes: size[0]
                            });
                        } else {
                            alert('Ваш набор собран, добавьте его в корзину');
                        }
                    } else {
                        alert('Вы не выбрали размер носков');
                    }
                } else {
                    alert('Вы не выбрали размер набора');
                }
            }
            }><FaCartArrowDown/></button>
        </>;

    let statusClass = statusClasses.get(item.status);

    return (
        <article className={'product ' + statusClass}>
            <div className="product__wrap">
                <a href={"/good?id=" + item.id} className='product__image-wrap'>
                    <img className="product__image " src={item.src} alt={item.name}/>
                </a>
                <h3 className="product__title">
                    <a href={"//good?id=" + item.id}>{item.name}</a>
                </h3>
                <div className='item-body'>
                    {button}
                </div>
            </div>
        </article>
    )
};


export { ItemCardPack };
