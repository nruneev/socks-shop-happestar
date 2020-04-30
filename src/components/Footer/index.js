import React from "react";
import './index.sass';
import { FaFacebookF, FaInstagram, FaVk, FaTelegramPlane } from "react-icons/fa";
import {useTranslation} from "react-i18next";

const Footer = () => {
    let { t } = useTranslation();

    return (
        <footer>
            <h1>{t('connect_with_us')}</h1>
            <div className='links'>
                <a href='https://instagram.com'>
                    <FaInstagram/>
                </a>
                <a href='https://facebook.com'>
                    <FaFacebookF/>
                </a>
                <a href='https://vk.com'>
                    <FaVk/>
                </a>
                <a href='https://teleg.run/happestar'>
                    <FaTelegramPlane/>
                </a>
            </div>
        </footer>
    )
};

export { Footer }