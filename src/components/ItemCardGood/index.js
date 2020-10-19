import './index.sass'
import React, {useState} from 'react';
import { CartContext } from '../../utils/contexts';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCartArrowDown} from 'react-icons/fa'
import { STATUS } from '../../utils/requests';

const statusClasses = new Map();
statusClasses.set(STATUS.NONE, '');
statusClasses.set(STATUS.NEW, 'new');
statusClasses.set(STATUS.SELL, 'sell');


const ItemCardGood = ({ item, width, size }) => {
    let [ photo, changePhoto ] = useState('');

    const changePhotoGood = (el) => {
        changePhoto(el);
    }

    let button =
        <>
            <div className='info'>
                <label className='cost'>{parseInt(item.cost, 10) - parseInt(item.discount, 10)}₽</label>
            </div>
        </>;

    let statusClass = statusClasses.get(item.status);

    return (
        <article className={'product ' + statusClass}>
            <div className="product__wrap">
                <p className='status_item'>
                    {item.status === "1" ? "New!" : ""} &#160; {parseInt(item.discount,10) > 0 ? "Sale!" : ""}
                </p>
                <a onMouseEnter={(e) => {
                    changePhotoGood('hovered')}}
                   onMouseLeave={(e) => {
                       changePhotoGood('')}} href={"/good?id=" + item.id} className='product__image-wrap'>
                    {photo === 'hovered' ? <img className="product__image " src={item.altPhoto} alt={item.name}/> : <img className="product__image " src={item.mainPhoto} alt={item.name}/>}
                </a>
                <h3 className="product__title">
                    <a href={"/good?id=" + item.id}>{item.name}</a>
                </h3>
                {button}
            </div>
        </article>
    )
};


export { ItemCardGood };
