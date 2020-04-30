import React, {useState} from 'react';
import './index.sass'
import {useTranslation} from "react-i18next";

const Partner = () => {
    const { t } = useTranslation();

    const steps = [
        {
            title: "Как сделать заказ?",
            text: "Свяжитесь с нами и мы разработаем для Вас эксклюзивный дизайн, а также расскажем об условиях оптовой отгрузки на уже имеющийся каталог.",
        },
        {
            title: "Как сделать заказ?",
            text: "Гибкая система скидок. Простота и удобство в оплате.",
        },
        {
            title: "Как сделать заказ?",
            text: "В разделе «Доставка» вы найдете для себя самый выгодный и быстрый способ получения заказа. А также предложить свой вариант отправки, мы мобильны и рассмотрим предложения.",
        }
    ];

    let [active, setActive] = useState(0);

    return (
        <div className='page partner'>
            <h1>{t('become_a_partner')}</h1>
            <div className='steps'>
                {steps.map((step, key) => {
                        let className = key === active ? 'active' : '';
                        return (
                                <div className={'step ' + className} key={key}
                                    onClick={() => setActive(key)}>
                                    <div className='content'>
                                        <h1>{step.title}</h1>
                                        <p>{step.text}</p>
                                    </div>
                                    <div className='number'>{key + 1}</div>
                                </div>
                        )}
                    )}
            </div>
        </div>
    )
};


export { Partner };