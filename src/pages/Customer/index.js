import React, { useState } from 'react';
import {useHistory} from "react-router-dom";
import {getTextForCustomer, useFetch} from "../../utils/requests";


const Customer = () => {

    let text = useFetch(getTextForCustomer, '');
    let history = useHistory();
    return (
        <div className='wrapper'>
            <div className='linker'>
                <ul>
                    <li><a href={'./'}>Главная</a></li>
                    <li><a onClick={() => history.goBack()}>Назад</a></li>
                    <li><span>Покупателю</span></li>
                </ul>
                <h1>Покупателю</h1>
            </div>

            <p className='article-delivery'>
                {text}
            </p>
        </div>
    )
};


export { Customer };
