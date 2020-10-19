import './index.sass'
import React, {useContext, useRef, useState} from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';

import {CartContext} from "../../utils/contexts";
import {get_promo} from "../../utils/helpers";
import {CartItem} from "../../boilerplate/CartDropdown/CartItem";
import {CartItemMobile} from "../../boilerplate/CartDropdown/CartItemMobile";
import {useHistory} from "react-router-dom";
import {ItemCardGood} from "../../components/ItemCardGood";
import {get_items, useFetch} from "../../utils/requests";


const NotFound = () => {

    let history = useHistory();

    let itemer = useFetch(get_items, []);

    itemer = itemer.slice(0, 4);

    return (
            <div className={'cart-dropdown'}>
                <div className="wrapperers">
                    <div className='linker'>
                        <ul>
                            <li><a href={'./'}>Главная</a></li>
                            <li><a onClick={() => history.goBack()}>Назад</a></li>
                            <li><span>Page 404</span></li>
                        </ul>
                        <h1>Page 404</h1>
                    </div>
                    <p className='without_item page404'>Ух ты! Кажется, вы нашли что-то несуществующее</p>
                    <div className='container container404'>
                        <h1>Посмотрите, что у нас припрятано</h1>
                        <div className='product-list'>
                            {itemer.map((el) => {return <ItemCardGood item={el}/>})}
                        </div>
                    </div>
                </div>
            </div>
    )
};

export { NotFound };
