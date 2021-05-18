import './index.sass'
import React from 'react';

const Black50 = () => {
    return (
        <div className='mainBlackFriday'>
            <div className='mainBlackFriday_container'>
                <h1>Промокод: BLACK50</h1>
                <p>
                    На протяжении всей недели до <b>29.11.2020</b> у нас действуют скидки на наборы, 3-5 пар в наборе - 30% скидка, 6-8 пар в наборе - 50% скидки. Все что тебе нужно, это при оформлении заказа ввести промокод: <b>BLACK50</b> Внимание: скидки и промокоды не суммируются
                </p>
                <a href={'/pack'}>Вперед собирать набор своей мечты!</a>
            </div>
        </div>
    )
};


export { Black50 };
