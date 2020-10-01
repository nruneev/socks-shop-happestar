import './index.sass'
import React from 'react';
import {get_oders, useFetch} from "../../../../utils/requests";
import {useLocation} from "react-router-dom";
import {CartItemAdmin} from "../../../../boilerplate/CartDropdown/CartItemAdmin";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const AdminsCurrentOder = () => {

    if (sessionStorage.getItem('loginAdmin') !== 'ok') {
        document.location.href = "/admin/login";
    }

    let query = useQuery();
    const id = query.get('id');
    console.log(id)

    let items = useFetch(get_oders, []);
    items.reverse();
    console.log(items);
    if(items.length > 0) {
        items = items.filter((el) => el.id === id)
    }
    console.log(items);

    if(items.length > 0) {
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
                    <h1>Заказ №{id}</h1>
                    <div className={'adminCurrentOderInfo'}>
                        <p><span>Дата создания:</span>{items[0].create_at}</p>
                        <p><span>Покупатель:</span>{items[0].surname + " " + items[0].name}</p>
                        <p><span>Телефон:</span>{items[0].phone}</p>
                        <p><span>Email:</span>{items[0].email}</p>
                        <p><span>Aдресс:</span>{items[0].address}</p>
                    </div>
                    <div className="table">
                        <table>
                            <thead className="thead">
                            <tr>
                                <th>Название</th>
                                <th>Артикул</th>
                                <th>Размер</th>
                                <th>Цена</th>
                                <th>Количество</th>
                                <th>Сумма</th>
                            </tr>
                            </thead>
                            <tbody className="tbody goodsInCart">
                            {items[0].orderJson.map((item, key) => <CartItemAdmin item={item} key={key}/>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    } else{
        return (<></>);
    }
}

export { AdminsCurrentOder }
