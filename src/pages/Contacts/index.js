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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1999.6107043147874!2d30.353081516224186!3d59.92200797040204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46963114d45d296b%3A0xa447ad80081097b1!2z0JvQvtGE0YIg0J_RgNC-0LXQutGCINCt0YLQsNC20Lg!5e0!3m2!1sru!2sru!4v1590411006882!5m2!1sru!2sru"
                width="600" height="450" frameBorder="0" aria-hidden="true" tabIndex="0"/>
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
