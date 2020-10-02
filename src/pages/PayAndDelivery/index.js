import './index.sass'
import React, { useState } from 'react';
import {useHistory} from "react-router-dom";
import {getTextForMain, getTextForPayAndDelivery, useFetch} from "../../utils/requests";


const PayAndDelivery = () => {
    let history = useHistory();
    let text = useFetch(getTextForPayAndDelivery, '');

    return (
        <div className='wrapper'>
            <div className='linker'>
                <ul>
                    <li><a href={'./'}>Главная</a></li>
                    <li><a onClick={() => history.goBack()}>Назад</a></li>
                    <li><span>Оплата и Доставка</span></li>
                </ul>
                <h1>Оплата и Доставка</h1>
            </div>

            <p className='article-delivery'>
                {text}
            </p>
        </div>

    )
};


export { PayAndDelivery };
