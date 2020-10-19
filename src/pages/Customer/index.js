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
                    <li><span>Доставка и Возврат</span></li>
                </ul>
                <h1>Доставка и Возврат</h1>
            </div>

            <p className='article-delivery' dangerouslySetInnerHTML={{__html: text}}/>
        </div>
    )
};


export { Customer };
