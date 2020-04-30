import './index.sass'
import React, { useContext, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import { CartContext } from '../../utils/contexts';
import { CartBlock } from './CartBlock';


const CartDropdown = ({ className }) => {
    let { cartItems, removeItem, setItem } = useContext(CartContext);
    let countBlock = cartItems.length > 0 ? <span className='count'>{cartItems.length}</span> : '';

    let [isCartShown, setIsCartShown] = useState(false);
    let cartBlock = isCartShown ? <CartBlock items={cartItems} removeItem={removeItem}
                                             closeCart={() => setIsCartShown(false)} /> : '';

    return (<>
            <div className={'cart ' + className}>
                <FaShoppingCart onClick={() => setIsCartShown(true)}/>
                {countBlock}
            </div>
            {cartBlock}
        </>)
};


export { CartDropdown }