import React, { useState } from 'react';
import {useHistory} from "react-router-dom";
import {getTextForCustomer, useFetch} from "../../utils/requests";


const Customer = () => {

    const [info, setInfo] = useState([
        {
            name: 'Оплата и доставка',
            isOpen: true,
            child: [
                {
                    name: 'Доставка',
                    text: 'Не хочешь до двери? - у них крупнейшая сеть пунктов самовывоза.' +
                        'Слушай, если СДЭК не возит до тебя, сообщи нам, мы что-нибудь придумаем.' +
                        'Cрок доставки – 1-5 рабочих дней с момента отправления заказа. Стоимость доставки — от 210 рублей (по тарифам ТК Сдэк для доставки по России). При заказе от 3000 рублей везем бесплатно! (для доставки по Санкт-Петербургу)'
                },
                {
                    name: 'Оплата',
                    text: 'На нашем сайте доступно два варианта оплата заказа: онлайн, при помощи любых электронных денег, и при получении заказа наличными или банковской картой.'
                }
            ]
        },
        {
            name: 'Возврат товара',
            isOpen: false,
            child: [
                {
                    name: 'Возврат',
                    text: 'Звони, пиши мы всё уладим:' +
                        '• E-mail: happestar@mail.ru\n' +
                        '• Номер для WhatsApp, Viber, Telegram и звонков: +7 (911) 781-31-00\n'
                },
                {
                    name: 'Причины возврата',
                    text: '-Получил заказ, а потом передумал? Всякое бывает, в течение 2 недель вернем деньги. Большая просьба - сохрани товарный вид вещей и упаковку.\n' +
                        'Не подошел размер? Просто верни товар курьеру, но доставку придется оплатить.\n' +
                        'Что делать, если пришел товар с браком?' +
                        'Ого, да тебе повезло! Пишите письмо на happestar@mail.ru с темой «Брак товара по заказу №», опиши проблему и пару фото с дефектом. Не забудь номер телефона для связи. Нам потребуется некоторое время для изучения претензии и возврат денег, но мы всё решим и сделаем тебе подарок к следующему заказу. Ведь ты помог нам стать лучше!'
                },
                {
                    name: 'Как и когда твои денежки вернутся?',
                    text: 'Вернем так же, как и получили, карта или наличными. Нескольких дней при возврате денежным переводом, до двух недель при возврате на банковскую карту (на самом деле, обычно намного быстрее).К сожалению, мы не сможем вернуть вам стоимость доставки, курьеры СДЭК очень быстрые их не догнать.'
                }
            ]
        }
    ]);

    const openBlock = (name) => {
        const result = info.map(x => {
            x.isOpen = x.name === name ? !x.isOpen : false
            return x;
        });
        setInfo(result)
    }

    let history = useHistory();
    return (
        <div className='wrapper'>
            <div className='linker'>
                <ul>
                    <li><a href={'./'}>Главная</a></li>
                    <li><a onClick={() => history.goBack()}>Назад</a></li>
                    <li><span>Доставка и Возврат</span></li>
                </ul>
                <h1>Доставка и Возврат</h1>
            </div>

            <div className='containerNavigationBlock'>
                <div className="navigationBlock">
                    {
                        info?.map(navigate => {
                            return (
                                <div className="navigationBlockParent">
                                    <p onClick={() => openBlock(navigate.name)}>{navigate?.name}</p>
                                    <div className="navigationBlockItem">
                                        {
                                            navigate?.child?.map(item => {
                                                if (navigate?.isOpen) {
                                                    return (
                                                        <p>{item.name}</p>
                                                    )
                                                }
                                                return undefined
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="textBlock">
                {
                    info.map(navigate => {
                        if (navigate.isOpen) {
                            return navigate.child.map(content => {
                                return(
                                    <div>
                                        <h1>{content.name}</h1>
                                        <p>{content.text}</p>
                                    </div>
                                )
                            })
                        }

                        return undefined
                    })
                }
            </div>
            </div>
        </div>
    )
};


export { Customer };
