import './index.sass'
import React, {useState} from 'react';


const AdminsTextPage = () => {
    if (sessionStorage.getItem('loginAdmin') !== 'ok') {
        document.location.href = "/admin/login";
    }

    let [item, setItem] = useState({
        mainPage: "",
        historyBrand: "",
        payAndDelivery: "",
        gooder: ""
    })

    let [photos, setPhotos] = useState({
        edit: false,
        main: "",
        first: "",
        second: ""
    })

    const saveEdit = () => {

    }

    return (
        <div className={'wrapper adminBlockFlex'}>
            <div className={'loginNavigation'}>
                <a href={'oder'} className={'loginNavigationItem'}>
                    История Заказов
                </a>
                <a href={'good'} className={'loginNavigationItem'}>
                    Товары
                </a>
                <a href={'text'} className={'loginNavigationItem activeLoginBlock'}>
                    Текст на сайте
                </a>
                <a href={'photo'} className={'loginNavigationItem'}>
                    Фото на сайте
                </a>
            </div>
            <div className={'loginRightBlock'}>
                <h1>Текст на сайте</h1>
                <div className={'login-input'}>
                    <p>Главная страница</p>
                    <textarea placeholder={'Главная страница'} type={'text'} value={item.mainPage} onChange={(e) => setItem({
                        ...item,
                        mainPage: e.target.value
                    })}/>
                </div>
                <div className={'login-input'}>
                    <p>Покупателю</p>
                    <textarea placeholder={'Покупателю'} type={'text'} value={item.gooder} onChange={(e) => setItem({
                        ...item,
                        gooder: e.target.value
                    })}/>
                </div>
                <div className={'login-input'}>
                    <p>Оплата и доставка</p>
                    <textarea placeholder={'Оплата и доставка'} type={'text'} value={item.payAndDelivery} onChange={(e) => setItem({
                        ...item,
                        payAndDelivery: e.target.value
                    })}/>
                </div>
                <div className={'login-input'}>
                    <p>История Бренда</p>
                    <textarea placeholder={'История Бренда'} type={'text'} value={item.historyBrand} onChange={(e) => setItem({
                        ...item,
                        historyBrand: e.target.value
                    })}/>
                </div>

                <div className={'login-btn'}>
                    <p>Сохранить</p>
                </div>
            </div>
        </div>
    )
}

export { AdminsTextPage }
