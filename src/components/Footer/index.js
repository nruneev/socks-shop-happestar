import React from "react";
import './index.sass';
import {FaFacebookF, FaInstagram, FaVk, FaTelegramPlane, FaYoutube} from "react-icons/fa";
import {useTranslation} from "react-i18next";

const Footer = () => {
    let { t } = useTranslation();

    return (
        <footer>
            <h1>{t('connect_with_us')}</h1>
            <div className='links'>
                <a href='https://instagram.com/happestar'>
                    <FaInstagram/>
                </a>
                <a href='https://facebook.com/happestar'>
                    <FaFacebookF/>
                </a>
                <a href='https://vk.com/happestar'>
                    <FaVk/>
                </a>
                <a href='https://teleg.run/happestar'>
                    <FaTelegramPlane/>
                </a>
                <a href='https://www.youtube.com/channel/UCdzyFgztzclwCZSt5ljX2Aw/videos'>
                    <FaYoutube/>
                </a>
            </div>
        </footer>
    )
};

export { Footer }
