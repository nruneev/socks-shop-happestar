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
            <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A3ed5de4e30c004ffb07d5bf7f740e20f763f267b95bca2e2b92a452ceda40c6b&amp;source=constructor"
                width="500" height="400" frameBorder="0"/>
            <div className='contacts-container'>
                <h1>{t('our_contacts')}</h1>
                <div className='contacts-data'>
                    <a className='contact-line' href='tel:+7(911)781-31-00'>
                        <MdPhoneIphone/><label>+7 (911) 781 31 00</label>
                    </a>
                    <a className='contact-line' href='mailto: Happestar@mail.ru'>
                        <IoIosMail/><label>Happestar@mail.ru</label>
                    </a>
                    <a className='contact-line' href='https://instagram.com'>
                        <FaInstagram/><label>Instagram</label>
                    </a>
                    <a className='contact-line' href='https://facebook.com'>
                        <FaFacebookF/><label>Facebook</label>
                    </a>
                    <a className='contact-line' href='https://vk.com'>
                        <FaVk/><label>VK</label>
                    </a>
                    <a className='contact-line' href='https://teleg.run/happestar'>
                        <FaTelegramPlane/><label>Telegram</label>
                    </a>
                </div>
            </div>
        </div>
    );
};


export { Contacts }