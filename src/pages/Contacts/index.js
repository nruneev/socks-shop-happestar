import './index.sass'
import React from 'react'
import {useTranslation} from "react-i18next";
import {MdPhoneIphone} from "react-icons/md";
import {IoIosMail} from "react-icons/io";
import {FaFacebookF, FaInstagram, FaTelegramPlane, FaVk} from "react-icons/fa";


const Contacts = () => {
    let { t } = useTranslation();

    return (
        <div className='contacts page'>
            <div className='contacts-container'>
                <h1>{t('our_contacts')}</h1>
                <div className="tabs__nav">
                    <a className="tabs__nav-item">Санкт-Петербург</a>
                </div>
                <div className="tabs__content">
                    <div className="shops__item">
                        <div className="shops__name">Лофт Проект Этажи</div>
                        <div className="shops__descr">
                            <p>
                                <span>Адрес</span>
                                <span>Лиговский пр., 74, лит. Д, Лофт Проект Этажи</span>
                            </p>
                            <p>
                                <span>Открыто</span>
                                <span>10:00 – 23:00 </span>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1999.6107043147874!2d30.353081516224186!3d59.92200797040204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46963114d45d296b%3A0xa447ad80081097b1!2z0JvQvtGE0YIg0J_RgNC-0LXQutGCINCt0YLQsNC20Lg!5e0!3m2!1sru!2sru!4v1590411006882!5m2!1sru!2sru"
                width="800" height="450" frameBorder="0"/>
        </div>
    );
};


export { Contacts }
