import './index.sass'
import React from 'react';
import {get_items, get_oders, useFetch} from "../../../utils/requests";
import {ItemCardAdmin} from "../../../components/ItemCardAdmin";
import {Oder} from "../oder";


const AdminsGood = () => {

    let items = useFetch(get_items, []);
    items.reverse();

    if (sessionStorage.getItem('loginAdmin') !== 'ok') {
        document.location.href = "/admin/login";
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
                <a className={'loginNavigationItem'}>
                    Текст на сайте
                </a>
                <a className={'loginNavigationItem'}>
                    Фото на сайте
                </a>
            </div>
            <div className={'loginRightBlock'}>
                <h1>Товары</h1>
                <div className={'adminCatalog'}>
                    {items.map((el) => {
                        return (<ItemCardAdmin item={el}/>)
                    })}
                </div>
            </div>
        </div>
    )
}

export { AdminsGood }
