import '../Cart/index.sass'
import React from 'react';
import {useHistory, useLocation} from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const Oders = () => {

    let history = useHistory();

    let query = useQuery();
    const id = query.get('id');

    return (
        <div className={'cart-dropdown'}>
            <div className="wrapperers">
                <div className='linker'>
                    <ul>
                        <li><a href={'./'}>Главная</a></li>
                        <li><a onClick={() => history.goBack()}>Назад</a></li>
                        <li><span>Корзина</span></li>
                    </ul>
                    <h1>Корзина</h1>
                </div>
                <div className="table okTable">
                    <div className='iconAccess'>
                        <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="check-circle"
                             role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                             className="svg-inline--fa fa-check-circle fa-w-16 fa-9x">
                            <path fill="currentColor"
                                  d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z"
                                  className=""></path>
                        </svg>
                    </div>
                    <h1 className='qwertyasd'>Заказ №{id} оформлен!</h1>
                    <p className='qwertyasd1'>Мы отправили на почту письмо с подтверждением Вашего заказа.</p>
                </div>
            </div>
        </div>
    )
};

export { Oders };
