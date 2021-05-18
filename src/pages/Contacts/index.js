import './index.sass'
import React from 'react'
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";

const Contacts = () => {
    let history = useHistory();
    let { t } = useTranslation();

    return (
        <div className='contacts page'>
            <div className='contacts-container'>
                <div className='linkers'>
                    <ul>
                        <li><a href={'./'}>Главная</a></li>
                        <li><a onClick={() => history.goBack()}>Назад</a></li>
                        <li><span>Контакты</span></li>
                    </ul>
                </div>
                <h1>Контакты</h1>
                <div className="tabs__nav">
                    <a className="tabs__nav-item">Санкт-Петербург</a>
                </div>
                <div className="tabs__content">
                    <div className="shops__item">
                        <div className="shops__name">ТК ФРУНЗЕНСКИЙ </div>
                        <div className="shops__descr">
                            <p>
                                <span>Адрес</span>
                                <span>Санкт-Петербург, ТК Фрунзенский, ул. Бухарестская 90, 2 этаж, секция 25.2</span>
                            </p>
                            <p>
                                <span>Открыто</span>
                                <span>10:00 – 19:00 </span>
                            </p>
                            <p>
                                <span>Телефон</span>
                                <span><a href='tel:+7(911)781-31-00'>+7 (911) 781 31 00</a></span>
                            </p>
                        </div>
                    </div>
                    <div className="shops__item  shops__item--online">
                        <div className="shops__name">
                            Интернет-магазин
                        </div>
                        <div className="shops__descr">
                            <p>
                                <span>Телефон</span>
                                <span><a href='tel:+7(911)781-31-00'>+7 (911) 781 31 00</a></span>
                            </p>
                            <p>
                                <span>Email</span>
                                <span><a href='mailto: Happestar@mail.ru'>Happestar@mail.ru</a></span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2003.1618537814982!2d30.387807414391283!3d59.86305860000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46962f6c276128ff%3A0xe48d8dc081f10e8b!2sFrunzenskiy!5e0!3m2!1sen!2sru!4v1597868572319!5m2!1sen!2sru"
                allowFullScreen="" aria-hidden="false"
                tabIndex="0"/>
        </div>
    );
};


export { Contacts }
