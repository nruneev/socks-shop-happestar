import './index.sass'
import React, {useState} from 'react';


const AdminsPhotoPage = () => {
    if (sessionStorage.getItem('loginAdmin') !== 'ok') {
        document.location.href = "/admin/login";
    }

    let [item, setItem] = useState({
        mainPageSlider1: "",
        mainPageSlider2: "",
        mainPageSlider3: "",
        mainPageTopLeft: "",
        mainPageTopCenter: "",
        mainPageTopRight: "",
        mainPageCenter: "",
        mainPageBottomRight: "",
        mainPageBottomLeft: "",
        BrandHistory: "",
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
                <a href={'text'} className={'loginNavigationItem'}>
                    Текст на сайте
                </a>
                <a href={'photo'} className={'loginNavigationItem activeLoginBlock'}>
                    Фото на сайте
                </a>
            </div>
            <div className={'loginRightBlock'}>
                <h1>Фото на сайте</h1>
                <div className={'login-input'}>
                    <p>Главная страница: первое фото слайдера</p>
                    <input type={'file'} onChange={(e) => setItem({
                        ...item,
                        mainPageSlider1: e.target.value
                    })}/>
                </div>
                <div className={'login-input'}>
                    <p>Главная страница: второе фото слайдера</p>
                    <input type={'file'} onChange={(e) => setItem({
                        ...item,
                        mainPageSlider2: e.target.value
                    })}/>
                </div>
                <div className={'login-input'}>
                    <p>Главная страница: третье фото слайдера</p>
                    <input type={'file'} onChange={(e) => setItem({
                        ...item,
                        mainPageSlider3: e.target.value
                    })}/>
                </div>
                <div className={'login-input'}>
                    <p>Главная страница: первое фото баннеров</p>
                    <input type={'file'} onChange={(e) => setItem({
                        ...item,
                        mainPageTopLeft: e.target.value
                    })}/>
                </div>
                <div className={'login-input'}>
                    <p>Главная страница: второе фото баннеров</p>
                    <input type={'file'} onChange={(e) => setItem({
                        ...item,
                        mainPageTopCenter: e.target.value
                    })}/>
                </div>
                <div className={'login-input'}>
                    <p>Главная страница: третье фото баннеров</p>
                    <input type={'file'} onChange={(e) => setItem({
                        ...item,
                        mainPageTopRight: e.target.value
                    })}/>
                </div>
                <div className={'login-input'}>
                    <p>Главная страница: четвертое фото баннеров</p>
                    <input type={'file'} onChange={(e) => setItem({
                        ...item,
                        mainPageCenter: e.target.value
                    })}/>
                </div>
                <div className={'login-input'}>
                    <p>Главная страница: пятое фото баннеров</p>
                    <input type={'file'} onChange={(e) => setItem({
                        ...item,
                        mainPageBottomLeft: e.target.value
                    })}/>
                </div>
                <div className={'login-input'}>
                    <p>Главная страница: itcnjt фото баннеров</p>
                    <input type={'file'} onChange={(e) => setItem({
                        ...item,
                        mainPageBottomRight: e.target.value
                    })}/>
                </div>
                <div className={'login-input'}>
                    <p>История брендов: главное фото</p>
                    <input type={'file'} onChange={(e) => setItem({
                        ...item,
                        BrandHistory: e.target.value
                    })}/>
                </div>
                <div className={'login-btn'}>
                    <p>Сохранить</p>
                </div>
            </div>
        </div>
    )
}

export { AdminsPhotoPage }
