import './index.sass'
import React from 'react';
import {useHistory} from "react-router-dom";
import {getTextForHistoryBrand, useFetch} from "../../utils/requests";

const AboutUs = () => {
    let history = useHistory();
    let text = useFetch(getTextForHistoryBrand, '');
    return (
        <div className='wrapper'>
            <div className='linker'>
                <ul>
                    <li><a href={'./'}>Главная</a></li>
                    <li><a onClick={() => history.goBack()}>Назад</a></li>
                    <li><span>История Бренда</span></li>
                </ul>
                <h1>История Бренда</h1>
            </div>

            <img src='/static/media/history.jpg'/>
            <p>{text}</p>
        </div>
    )
};


export { AboutUs };
