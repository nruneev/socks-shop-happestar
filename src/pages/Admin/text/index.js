import './index.sass'
import React, {useState} from 'react';


const AdminsTextPage = () => {
    if (sessionStorage.getItem('loginAdmin') !== 'ok') {
        document.location.href = "/admin/login";
    }

    let [preload, setPreload] = useState(false)

    let [item, setItem] = useState({
        mainPage: "",
        historyBrand: "",
        payAndDelivery: "",
        gooder: ""
    })

    if (!preload) {
        fetch("/php/loadText.php").then(function (response) {
            return response.json();
        })
            .then(function (data) {
                setItem({
                    mainPage: data[0].article,
                    historyBrand: data[1].article,
                    payAndDelivery: data[3].article,
                    gooder: data[2].article
                });
                setPreload(true);
            }).catch(reason => console.log(reason));
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
                <a href={'promo'} className={'loginNavigationItem'}>
                    Промо
                </a>
            </div>
            <div className={'loginRightBlock'}>
                <h1>Текст на сайте</h1>
                <form enctype="multipart/form-data" action="/php/editText.php" method="post">
                    <div className={'login-input'}>
                        <p>Главная страница</p>
                        <textarea placeholder={'Главная страница'} name={'main'} type={'text'} value={item.mainPage} onChange={(e) => setItem({
                            ...item,
                            mainPage: e.target.value
                        })}/>
                    </div>
                    <div className={'login-input'}>
                        <p>Доставка и Возврат</p>
                        <textarea placeholder={'Доставка и Возврат'} name={'gooder'} type={'text'} value={item.gooder} onChange={(e) => setItem({
                            ...item,
                            gooder: e.target.value
                        })}/>
                    </div>
                    <div className={'login-input'}>
                        <p>История Бренда</p>
                        <textarea placeholder={'История Бренда'} name={'historyBrand'} type={'text'} value={item.historyBrand} onChange={(e) => setItem({
                            ...item,
                            historyBrand: e.target.value
                        })}/>
                    </div>

                    <button type={'submit'} className={'login-btn'}>
                        <p>Сохранить</p>
                    </button>
                </form>
            </div>
        </div>
    )
}

export { AdminsTextPage }
