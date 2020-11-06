import './index.sass'
import React from 'react';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {PackContext} from "../../utils/contexts";

const ItemCardPack = ({ length, item, width, size }) => {
    let [ photo, changePhoto ] = useState('');
    let [ addBlock, setBlock ] = useState('');

    item.photos = [item.mainPhoto, item.altPhoto];

    if(width) {
        width -= 4;
        let items = document.getElementsByClassName('item');
        items && [].forEach.call(items, ((item) => item.style.width = width));
    }

    let classDescr = ''

    const { setItem, removeItemPack, packItems } = useContext(PackContext);
    const { t } = useTranslation();

    let [classObj, setObj] = useState('');

    let [descr, setDescr] = useState(0);

    switch (descr) {
        case 0:
            classDescr = '';
            break;
        case 1:
            classDescr = 'first';
            break;
        case 2:
            classDescr = 'second';
            break;
        case 3:
            classDescr = 'third';
            break;
        case 4:
            classDescr = 'four';
            break;
    }

    let [actualPhotos, setActual] = useState(0);

    let coast = parseInt(item.discount,10) > 0 ?
        <>
            <label className='cost disconter'>{parseInt(item.cost, 10)}₽</label>
            &#160;
            <label className='cost'>{parseInt(item.cost, 10) - parseInt(item.discount, 10)}₽</label>
            &#160;
            <label className='cost procenter'>{(parseInt(item.discount, 10) / parseInt(item.cost, 10)) * 100}%</label>
        </> :
        <>
            <label className='cost'>{parseInt(item.cost, 10) - parseInt(item.discount, 10)}₽</label>
        </>

    let button =
        <>
            <div className='infos'>
                {coast}
            </div>
            <button onClick={() => {
                if (length.length !== 0) {
                    if (size[0]) {
                        if (packItems.length < parseInt(length, 10)) {
                            setBlock('activeState');
                            setItem({
                                id: Math.abs(Math.random() * 100),
                                ids: item.id,
                                article: item.article,
                                src: item.src,
                                name: item.name,
                                cost: item.cost,
                                discount: item.discount,
                                prev_cost: item.cost,
                                status: item.status,
                                tags: item.tags,
                                sizes: size[0]
                            });
                        } else {
                            alert('Ваш набор собран, добавьте его в корзину');
                        }
                    } else {
                        alert('Вы не выбрали размер носков');
                    }
                } else {
                    alert('Вы не выбрали размер набора');
                }
            }
            }>Добавить</button>
        </>;

    const changePhotoGood = (el) => {
        changePhoto(el);
    }

    if (addBlock === 'activeState') {
        setTimeout(() => setBlock(''), 500)
    }

    return (
        <>
            <div className={'fastView ' + classObj}>
                <span className={'bg_fastView'} onClick={() => setObj('')}/>
                <div className={'wrapperss paddingson'}>
                    <div className="prod">
                        <div className="mod_top"></div>
                        <div className="photos">
                            <div className='thumbs'>
                                {item.photos.map((el, key) => {
                                    const classer = key === actualPhotos ? 'selected' : '';
                                    if (el !== '') {
                                        return (
                                            <div className={'swiper-slide ' + classer} onClick={() => setActual(key)}><img
                                                src={el}/></div>)
                                    }
                                })}
                            </div>
                            <div className="main-wrap">
                                <img src={item.photos[actualPhotos]} alt={item.name}/>
                            </div>
                        </div>
                        <div className="content">
                            <h1 className="title">{item.name}</h1>
                            <div className="info">
                                <p className="art" data-title="Артикул">{item.article}</p>
                            </div>
                            <div className="cost ">
                                <span className="cur _rub_">{parseInt(item.cost, 10) - parseInt(item.discount, 10)} <i className="rub-symbol">₽</i></span>
                            </div>
                            <ul className={'accrd ' + classDescr}>
                                <li className='child' onClick={() => {
                                    if (descr !== 0 && descr === 1) {
                                        setDescr(0)
                                    } else {
                                        setDescr(1)
                                    }
                                }}>
                                    <div className='ttl'>Описание</div>
                                    <div className='descr'>
                                        <p>{item.description}</p>
                                    </div>
                                </li>
                                <li className='child' onClick={() => {
                                    if (descr !== 0 && descr === 2) {
                                        setDescr(0)
                                    } else {
                                        setDescr(2)
                                    }
                                }}>
                                    <div className='ttl'>Cостав</div>
                                    <div className='descr'>
                                        <p>{item.composition}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        </div>
                    <div className='prod_mobile'>
                    <div className="mod_top">
                        <p>{item.name}</p>
                    </div>
                    <div className='photos'>
                        <img src={item.photos[actualPhotos]} alt={item.name}/>
                        <div className='thumbs liner'>
                            {item.photos.map((el, key) => {
                                const classer = key === actualPhotos ? 'selected' : '';
                                if (el !== '') {
                                    return (
                                        <div className={'swiper-slide ' + classer} onClick={() => setActual(key)}><img
                                            src={el}/></div>)
                                }
                            })}
                        </div>
                    </div>
                    <div className='content'>
                        <div className="cost ">
                            <span className="cur _rub_">{parseInt(item.cost, 10) - parseInt(item.discount, 10)} <i className="rub-symbol">₽</i></span>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <article className={'product '}>
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
                    <p className='status_item'>
                        {item.status === "1" ? "New!" : ""} &#160; {parseInt(item.discount,10) > 0 ? "Sale!" : ""}
                    </p>
                    <a onMouseEnter={(e) => {
                        changePhotoGood('hovered')}}
                       onMouseLeave={(e) => {
                           changePhotoGood('')}} onClick={() => setObj('activateViewBlock')} className='product__image-wrap'>
                        {photo === 'hovered' ? <img className="product__image " src={item.altPhoto} alt={item.name}/> : <img className="product__image " src={item.mainPhoto} alt={item.name}/>}
                    </a>
                    <h3 className="product__title">
                        <a onClick={() => setObj('activateViewBlock')}>{item.name}</a>
                    </h3>
                    <div className='item-body'>
                        {button}
                    </div>
                </div>
            </article>
        </>
    )
};


export { ItemCardPack };
