import './index.sass'
import React, {useState} from 'react';
import {getPhotos, useFetch} from "../../../utils/requests";


const AdminsPhotoPage = () => {
    if (sessionStorage.getItem('loginAdmin') !== 'ok') {
        document.location.href = "/admin/login";
    }

    let [preload, setPreload] = useState(false);

    let banners = useFetch(getPhotos, []);
    console.log(banners);

    let [item, setItem] = useState({
        mainPageSlider1: '',
        mainPageSlider2: '',
        mainPageSlider3: '',
        mainPageTopLeft: '',
        mainPageTopCenter: '',
        mainPageTopRight: '',
        mainPageCenter: '',
        mainPageBottomRight: '',
        mainPageBottomLeft: '',
        BrandHistory: '',
    })

    let [text, setText] = useState({
        mainPageSlider1: '',
        mainPageSlider2: '',
        mainPageSlider3: '',
        mainPageTopLeft: '',
        mainPageTopCenter: '',
        mainPageTopRight: '',
        mainPageCenter: '',
        mainPageBottomRight: '',
        mainPageBottomLeft: '',
    })

    if (banners.length > 0 && !preload) {
        setItem({
            mainPageSlider1: banners[0].src,
            mainPageSlider2: banners[1].src,
            mainPageSlider3: banners[2].src,
            mainPageTopLeft: banners[3].src,
            mainPageTopCenter: banners[4].src,
            mainPageTopRight: banners[5].src,
            mainPageCenter: banners[6].src,
            mainPageBottomRight: banners[8].src,
            mainPageBottomLeft: banners[7].src,
            BrandHistory: banners[9].src,
        })

        setText({
            mainPageSlider1: banners[0].text,
            mainPageSlider2: banners[1].text,
            mainPageSlider3: banners[2].text,
            mainPageTopLeft: banners[3].text,
            mainPageTopCenter: banners[4].text,
            mainPageTopRight: banners[5].text,
            mainPageCenter: banners[6].text,
            mainPageBottomRight: banners[8].text,
            mainPageBottomLeft: banners[7].text,
        })
        setPreload(true)
    }

    const saveEdit = () => {

    }

    if (banners.length > 0) {
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
                    <a href={'promo'} className={'loginNavigationItem'}>
                        Промо
                    </a>
                </div>
                <div className={'loginRightBlock'}>
                    <h1>Фото на сайте</h1>
                    <form enctype="multipart/form-data" action="/php/updatePhotos.php" method="post">
                        <div className={'login-input'}>
                            <p>Главная страница: первое фото слайдера</p>
                            <input placeholder={'Текст для первой фотографии слайдера'} name={'mainPageSlider1'}
                                   type={'text'} value={text.mainPageSlider1}
                                   onChange={(e) => setText({
                                       ...text,
                                       mainPageSlider1: e.target.value
                                   })}/>
                            <input type={'file'} name={'mainPageSlider1photo'} onChange={(e) => setItem({
                                ...item,
                                mainPageSlider1: e.target.value
                            })}/>
                            <img src={item.mainPageSlider1}/>
                        </div>
                        <div className={'login-input'}>
                            <p>Главная страница: второе фото слайдера</p>
                            <input placeholder={'Текст для второй фотографии слайдера'} name={'mainPageSlider2'}
                                   type={'text'} value={text.mainPageSlider2}
                                   onChange={(e) => setText({
                                       ...text,
                                       mainPageSlider2: e.target.value
                                   })}/>
                            <input type={'file'} name={'mainPageSlider2photo'} onChange={(e) => setItem({
                                ...item,
                                mainPageSlider2: e.target.value
                            })}/>
                            <img src={item.mainPageSlider2}/>
                        </div>
                        <div className={'login-input'}>
                            <p>Главная страница: третье фото слайдера</p>
                            <input placeholder={'Текст для третьей фотографии слайдера'} name={'mainPageSlider3'}
                                   type={'text'} value={text.mainPageSlider3}
                                   onChange={(e) => setText({
                                       ...text,
                                       mainPageSlider3: e.target.value
                                   })}/>
                            <input type={'file'} name={'mainPageSlider3photo'} onChange={(e) => setItem({
                                ...item,
                                mainPageSlider3: e.target.value
                            })}/>
                            <img src={item.mainPageSlider3}/>
                        </div>
                        <div className={'login-input'}>
                            <p>Главная страница: первое фото баннеров</p>
                            <input placeholder={'Текст для первой фотографии баннера'} name={'mainPageTopLeft'}
                                   type={'text'} value={text.mainPageTopLeft}
                                   onChange={(e) => setText({
                                       ...text,
                                       mainPageTopLeft: e.target.value
                                   })}/>
                            <input type={'file'} name={'mainPageTopLeftPhoto'} onChange={(e) => setItem({
                                ...item,
                                mainPageTopLeft: e.target.value
                            })}/>
                            <img src={item.mainPageTopLeft}/>
                        </div>
                        <div className={'login-input'}>
                            <p>Главная страница: второе фото баннеров</p>
                            <input placeholder={'Текст для второй фотографии баннера'} name={'mainPageTopCenter'}
                                   type={'text'} value={text.mainPageTopCenter}
                                   onChange={(e) => setText({
                                       ...text,
                                       mainPageTopCenter: e.target.value
                                   })}/>
                            <input type={'file'} name={'mainPageTopCenterPhoto'} onChange={(e) => setItem({
                                ...item,
                                mainPageTopCenter: e.target.value
                            })}/>
                            <img src={item.mainPageTopCenter}/>
                        </div>
                        <div className={'login-input'}>
                            <p>Главная страница: третье фото баннеров</p>
                            <input placeholder={'Текст для третьей фотографии баннера'} name={'mainPageTopRight'}
                                   type={'text'} value={text.mainPageTopRight}
                                   onChange={(e) => setText({
                                       ...text,
                                       mainPageTopRight: e.target.value
                                   })}/>
                            <input type={'file'} name={'mainPageTopRightPhoto'} onChange={(e) => setItem({
                                ...item,
                                mainPageTopRight: e.target.value
                            })}/>
                            <img src={item.mainPageTopRight}/>
                        </div>
                        <div className={'login-input'}>
                            <p>Главная страница: четвертое фото баннеров</p>
                            <input type={'file'} name={'mainPageCenterPhoto'} onChange={(e) => setItem({
                                ...item,
                                mainPageCenter: e.target.value
                            })}/>
                            <img src={item.mainPageCenter}/>
                        </div>
                        <div className={'login-input'}>
                            <p>Главная страница: пятое фото баннеров</p>
                            <input placeholder={'Текст для пятой фотографии баннера'} name={'mainPageBottomLeft'}
                                   type={'text'} value={text.mainPageBottomLeft}
                                   onChange={(e) => setText({
                                       ...text,
                                       mainPageBottomLeft: e.target.value
                                   })}/>
                            <input type={'file'} name={'mainPageBottomLeftPhoto'} onChange={(e) => setItem({
                                ...item,
                                mainPageBottomLeft: e.target.value
                            })}/>
                            <img src={item.mainPageBottomLeft}/>
                        </div>
                        <div className={'login-input'}>
                            <p>Главная страница: шестое фото баннеров</p>
                            <input placeholder={'Текст для пятой фотографии баннера'} name={'mainPageBottomRight'}
                                   type={'text'} value={text.mainPageBottomRight}
                                   onChange={(e) => setItem({
                                       ...text,
                                       mainPageBottomRight: e.target.value
                                   })}/>
                            <input type={'file'} name={'mainPageBottomRightPhoto'} onChange={(e) => setItem({
                                ...item,
                                mainPageBottomRight: e.target.value
                            })}/>
                            <img src={item.mainPageBottomRight}/>
                        </div>
                        <div className={'login-input'}>
                            <p>История брендов: главное фото</p>
                            <input name={'BrandHistoryPhoto'} type={'file'} onChange={(e) => setItem({
                                ...item,
                                BrandHistory: e.target.value
                            })}/>
                            <img src={item.BrandHistory}/>
                        </div>
                        <button type={"submit"} className={'login-btn'}>
                            <p>Сохранить</p>
                        </button>
                    </form>
                </div>
            </div>
        )
    } else {
        return (<></>)
    }
}

export { AdminsPhotoPage }
