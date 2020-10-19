import React, {useState} from 'react';
import './index.sass'
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";

const Partner = () => {
    let history = useHistory();

    const { t } = useTranslation();

    const steps = [
        {
            title: "Шаг 1:",
            text: "Свяжитесь с нами и мы разработаем для Вас эксклюзивный дизайн, а также расскажем об условиях оптовой отгрузки на уже имеющийся каталог.",
        },
        {
            title: "Шаг 2:",
            text: "Гибкая система скидок. Простота и удобство в оплате.",
        },
        {
            title: "Шаг 3:",
            text: "В разделе «Доставка» вы найдете для себя самый выгодный и быстрый способ получения заказа. А также предложить свой вариант отправки, мы мобильны и рассмотрим предложения.",
        }
    ];

    return (
        <div className='wrapper'>
            <div className='linker'>
                <ul>
                    <li><a href={'./'}>Главная</a></li>
                    <li><a onClick={() => history.goBack()}>Назад</a></li>
                    <li><span>Сотрудничество</span></li>
                </ul>
                <h1>Сотрудничество</h1>
            </div>
            <img className="imagePart" src='static/media/graph.svg'/>
        </div>
    )
};


export { Partner };
