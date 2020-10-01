import './index.sass'
import React from 'react';
import {get_oders, useFetch} from "../../../utils/requests";

export const Oder = (element) => {
    console.log(element)
    return (<a className={'loginOderLink'} href={'current?id=' + element.item.id}>Заказ №{element.item.id}</a>)
}

const AdminsOder = () => {
    if (sessionStorage.getItem('loginAdmin') !== 'ok') {
        document.location.href = "/admin/login";
    }

    let items = useFetch(get_oders, []);
    items.reverse();

    return (
        <div className={'wrapper adminBlockFlex'}>
            <div className={'loginNavigation'}>
                <a href={'oder'} className={'loginNavigationItem activeLoginBlock'}>
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
            </div>
            <div className={'loginRightBlock'}>
                <h1>История заказов</h1>
                <div className={'adminCatalog'}>
                    {items.map((el) => {
                        return (<Oder item={el}/>)
                    })}
                </div>
            </div>
        </div>
    )
}

export { AdminsOder }
