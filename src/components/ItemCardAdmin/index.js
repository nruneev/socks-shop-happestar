import './index.sass'
import React, {useState} from 'react';

const ItemCardAdmin = ({ item, width, size }) => {
    let [ photo, changePhoto ] = useState('');

    let button =
        <>
            <button onClick={() => {

            }}>Редактировать</button>
        </>;

        const changePhotoGood = (el) => {
            changePhoto(el);
        }

    return (
        <article className={'product'}>
            <div className="product__wrap">
                <a onMouseEnter={(e) => {
                        changePhotoGood('hovered')}}
                   onMouseLeave={(e) => {
                        changePhotoGood('')}} href={"/admin/edit?id=" + item.id} className='product__image-wrap'>
                    {photo === 'hovered' ? <img className="product__image " src={item.altPhoto} alt={item.name}/> : <img className="product__image " src={item.mainPhoto} alt={item.name}/>}
                </a>
                <h3 className="product__title">
                    <a href={"/admin/edit?id=" + item.id}>{item.name}</a>
                </h3>
            </div>
        </article>
    )
};


export { ItemCardAdmin };
