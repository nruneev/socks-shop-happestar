import React, {useState} from 'react';
import './index.sass'
import {useTranslation} from "react-i18next";

const Partner = () => {
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
        <div className='page partner'>
            <article>
                <h1>{t('become_a_partner')}</h1>
                <div className='steps'>
                    {steps.map((step, key) => {
                            return (
                                    <div className='content'>
                                        <h1>{step.title}</h1>
                                        <p>
                                            <span>{step.text}</span>
                                        </p>
                                    </div>
                            )}
                        )}
                </div>
            </article>
        </div>
    )
};


export { Partner };
