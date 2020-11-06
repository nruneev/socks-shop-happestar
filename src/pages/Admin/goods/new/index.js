import './index.sass'
import React, {useState} from 'react';


const AdminsGoodNew = () => {
    if (sessionStorage.getItem('loginAdmin') !== 'ok') {
        document.location.href = "/admin/login";
    }

    let [par, setPar] = useState({
        new: true,
        visible: true
    })

    let [item, setItem] = useState({
        id: "",
        article: "",
        src: "",
        composition: "",
        photos: [],
        name: '',
        cost: 0,
        sizes: [],
        color: "",
        description: "",
        delivery: "",
        pay: '',
        discount: 0,
        prev_cost: 0,
    })

    let [photos, setPhotos] = useState({
        edit: false,
        main: "",
        first: "",
        second: ""
    })

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
                <a href={'photo'} className={'loginNavigationItem'}>
                    Фото на сайте
                </a>
                <a href={'promo'} className={'loginNavigationItem'}>
                    Промо
                </a>
            </div>
            <div className={'loginRightBlock'}>
                <h1>Создание Товара</h1>
                <form enctype="multipart/form-data" action="/php/addGoods.php" method="post">
                    <div className={'login-input'}>
                        <p>Название</p>
                        <input placeholder={'Название'} name={'name'} type={'text'} value={item.name} onChange={(e) => setItem({
                            ...item,
                            name: e.target.value
                        })}/>
                    </div>
                    <div className={'login-input'}>
                        <p>Артикул</p>
                        <input placeholder={'Артикул'} name={'article'} type={'text'} value={item.article} onChange={(e) => setItem({
                            ...item,
                            article: e.target.value
                        })}/>
                    </div>
                    <div className={'login-input'}>
                        <p>Описание</p>
                        <textarea placeholder={'Описание'} name={'description'} type={'text'} value={item.description} onChange={(e) => setItem({
                            ...item,
                            description: e.target.value
                        })}/>
                    </div>
                    <div className={'login-input'}>
                        <p>Состав</p>
                        <textarea placeholder={'Состав'} name={'composition'} type={'text'} value={item.composition} onChange={(e) => setItem({
                            ...item,
                            composition: e.target.value
                        })}/>
                    </div>
                    <div className={'login-input'}>
                        <p>Доставка</p>
                        <textarea placeholder={'Доставка'} name={'delivery'} type={'text'} value={item.delivery} onChange={(e) => setItem({
                            ...item,
                            delivery: e.target.value
                        })}/>
                    </div>
                    <div className={'login-input'}>
                        <p>Олпата</p>
                        <textarea placeholder={'Оплата'} name={'pay'} type={'text'} value={item.pay} onChange={(e) => setItem({
                            ...item,
                            pay: e.target.value
                        })}/>
                    </div>
                    <div className={'login-input'}>
                        <p>Цена</p>
                        <input placeholder={'Цена'} name={'price'} type={'text'} value={item.cost} onChange={(e) => setItem({
                            ...item,
                            cost: e.target.value
                        })}/>
                    </div>
                    <div className={'login-input'}>
                        <p>Скидка</p>
                        <input placeholder={'Скидка'} name={'discount'} type={'text'} value={item.discount} onChange={(e) => setItem({
                            ...item,
                            discount: e.target.value
                        })}/>
                    </div>
                    <div className={'login-input'}>
                        <input value={item.color} name={'color'} className={'unvisible'}/>
                        <p>Цвет</p>
                        <ul className={'color ' + item.color + 'Block'}>
                            <li onClick={() => setItem({
                                ...item,
                                color: 'gray'
                            })} className={'gray'}/>
                            <li onClick={() => setItem({
                                ...item,
                                color: 'black'
                            })} className={'black'}/>
                            <li onClick={() => setItem({
                                ...item,
                                color: 'white'
                            })} className={'white'}/>
                            <li onClick={() => setItem({
                                ...item,
                                color: 'red'
                            })} className={'red'}/>
                            <li onClick={() => setItem({
                                ...item,
                                color: 'orange'
                            })} className={'orange'}/>
                            <li onClick={() => setItem({
                                ...item,
                                color: 'yellow'
                            })} className={'yellow'}/>
                            <li onClick={() => setItem({
                                ...item,
                                color: 'green'
                            })} className={'green'}/>
                            <li onClick={() => setItem({
                                ...item,
                                color: 'pink'
                            })} className={'pink'}/>
                            <li onClick={() => setItem({
                                ...item,
                                color: 'blue'
                            })} className={'blue'}/>
                            <li onClick={() => setItem({
                                ...item,
                                color: 'gradient'
                            })} className={'gradient'}/>
                        </ul>
                    </div>
                    <div className={'login-checkbox'}>
                        <input type={'checkbox'} name={'new'} hecked={par.new} onChange={() => setPar({
                            ...par,
                            new: !par.new
                        })}/>
                        <label>Новинка</label>
                    </div>
                    <div className={'login-checkbox'}>
                        <input type={'checkbox'} name={'visibility'} checked={par.visible} onChange={() => setPar({
                            ...par,
                            visible: !par.visible
                        })}/>
                        <label>Отображать товар</label>
                    </div>
                    <div className={'login-input'}>
                        <p>Главное фото</p>
                        <input placeholder={'Главное фото'} id='inputfile' name='inputfile' type={'file'} onChange={(e) => setPhotos({
                            ...photos,
                            edit: true,
                            main: e.target.value
                        })}/>
                        <img src={photos.main}/>
                    </div>
                    <div className={'login-input'}>
                        <p>Дополнительное фото 1</p>
                        <input placeholder={'Дополнительное фото'} id='inputfile2' name='inputfile2'  type={'file'} onChange={(e) => setPhotos({
                            ...photos,
                            edit: true,
                            first: e.target.value
                        })}/>
                        <img src={photos.first}/>
                    </div>
                    <div className={'login-input'}>
                        <p>Дополнительное фото 2</p>
                        <input placeholder={'Дополнительное фото'} id='inputfile3' name='inputfile3'  type={'file'} onChange={(e) => setPhotos({
                            ...photos,
                            edit: true,
                            second: e.target.value
                        })}/>
                        <img src={photos.second}/>
                    </div>
                    <button type="submit" className={'login-btn'}>
                        <p>Сохранить</p>
                    </button>
                </form>
            </div>
        </div>
    )
}

export { AdminsGoodNew }
