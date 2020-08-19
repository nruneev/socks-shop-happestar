import './index.sass'
import React, { useState } from 'react';
import {useHistory} from "react-router-dom";


const PayAndDelivery = () => {
    let history = useHistory();

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

            <h1 className='title-delivery'>Какие способы доставки есть?</h1>
            <p className='article-delivery'>
                <b>СДЭК</b>
                <br/>
                <ul>
                    <li>Cрок доставки ориентировочно 1-5 рабочих дней с момента отправления заказа;</li>
                    <li>Стоимость доставки — от 125 рублей;</li>
                    <li>Доставка по указанному адресу до двери;</li>
                    <li>Доставка до пункта самовывоза;</li>
                    <li>Возможность отслеживания посылки по трек-номеру отправления;</li>
                    <li>Частичный выкуп заказа;</li>
                </ul>
            </p>
            <h1 className='title-delivery'>Какие способы оплаты есть?</h1>
            <p className='article-delivery'>
                <b>НАЛОЖЕННЫЙ ПЛАТЁЖ (НАЛИЧНЫМИ ИЛИ БАНКОВСКОЙ КАРТОЙ ПРИ ПОЛУЧЕНИИ ПОСЫЛКИ)</b>
                <br/>
                Наложенный платеж подразумевает оплату при получении посылки e у нашего курьера или курьеру службы СДЭК.
            </p>
            <h1 className='title-delivery'>Что делать, если пришел товар с браком или не подошел размер?</h1>
            <p className='article-delivery'>
                Пожалуйста, напишите нам письмо на <a href='mailto:happestar@mail.ru'>happestar@mail.ru</a> с темой «Брак товара по заказу №», описав проблему, а также приложите несколько фотографий места дефекта. Укажите ваш телефон для оперативной связи.
                Нам потребуется некоторое время для изучения претензии, но мы постараемся решить ваш вопрос как можно быстрее.
            </p>
        </div>

    )
};


export { PayAndDelivery };
