import './index.sass'
import React, {useState} from 'react';
import { CartContext } from '../../utils/contexts';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';


const ItemCard = ({ item, width, size }) => {
    const { setItem, cartItems } = useContext(CartContext);
    let [ photo, changePhoto ] = useState('');
    const { t } = useTranslation();

    let itemInCart = cartItems.find((el) => (el.ids === item.id && el.sizes === size[0]));

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

    let button = itemInCart ?
        <button className='active counter_buttoner'>
            <span onClick={() => setItem(itemInCart, --itemInCart.count)}>–</span>
            <span>{itemInCart.count}</span>
            <span onClick={() => setItem(itemInCart, ++itemInCart.count)}>+</span>
        </button> :
        <>
            <div className='infos'>
                {coast}
            </div>
            <button onClick={() => {
                if (size[0]) {
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
                        isNabor: false,
                        sizes: size[0]
                    });
                } else {
                    alert('Вы не выбрали размер');
                }
            }}>Добавить</button>
        </>;

        const changePhotoGood = (el) => {
            changePhoto(el);
        }

    return (
        <article className={'product'}>
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
                <div className='item-body'>
                    {button}
                </div>
            </div>
        </article>
    )
};


export { ItemCard };
