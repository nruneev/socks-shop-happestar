import './index.sass'
import React from 'react';
import {get_items_admin, useFetch} from "../../../utils/requests";
import {ItemCardAdmin} from "../../../components/ItemCardAdmin";

const AdminsGood = () => {

    let items = useFetch(get_items_admin, []);

    if (sessionStorage.getItem('loginAdmin') !== 'ok') {
        document.location.href = "/admin/login";
    }

    return (
        <div className={'wrapper adminBlockFlex'}>
            <div className={'loginNavigation'}>
                <a href={'oder'} className={'loginNavigationItem'}>
                    История Заказов
                </a>
                <a href={'good'} className={'loginNavigationItem activeLoginBlock'}>
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
                <div className={'flexTitle'}>
                    <h1>Товары</h1>
                    <div className={'createNewGood'} onClick={() => document.location.href = "/admin/new"}>+ Создать</div>
                </div>
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
