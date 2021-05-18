import './index.sass'
import React, {useState} from 'react';

const ItemCardPromo = ({ item, selectId, setGoods, width, size }) => {
    let [ photo, changePhoto ] = useState('');

    const changePhotoGood = (el) => {
        changePhoto(el);
    }
    let sel = selectId;
    sel = sel.filter((el) => item.id === el);
    let addBlock = sel.length === 1 ? 'activeState' : '';

    return (
        <article className={'productser'} onClick={() => {
            if (sel.length !== 1) {
                selectId.push(item.id);
                setGoods([...selectId]);
            } else {
                selectId = selectId.filter((el) => item.id !== el);
                setGoods([...selectId]);
            }
        }}>
            <div className={'acceptAdd ' + addBlock}>
                <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="check-circle" role="img"
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                     className="svg-inline--fa fa-check-circle fa-w-16 fa-9x">
                    <path fill="currentColor"
                          d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z"
                          className=""/>
                </svg>
            </div>
            <div className="product__wrap">
                <a onMouseEnter={(e) => {
                        changePhotoGood('hovered')}}
                   onMouseLeave={(e) => {
                        changePhotoGood('')}} className='product__image-wrap'>
                    {photo === 'hovered' ? <img className="product__image " src={item.altPhoto} alt={item.name}/> : <img className="product__image " src={item.mainPhoto} alt={item.name}/>}
                </a>
                <h3 className="product__title">
                    <a>{item.name}</a>
                </h3>
            </div>
        </article>
    )
};


export { ItemCardPromo };
