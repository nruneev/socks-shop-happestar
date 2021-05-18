import './index.sass'
import React, {useState} from 'react';
import { ItemCard } from '../ItemCard';
import {useHistory, useLocation} from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const CatalogList = ({ items, setMenu, activeTags, activeSizes, toggleSize, sizes }) => {
    let history = useHistory();

    let [nav_type, setType] = useState(['col_2'])

    const changeNav = (type) => {
        if (type === 'col_2') {
            setType(['col_2']);
        } else {
            setType(['col_1']);
        }
    }

    const classNamer = nav_type[0] === 'col_2' ? '_2c' : '';

    let activeItems = items.filter((item) => {
         if(!activeTags.includes(...item.tags) && activeTags.length !== 0)
             return false;
         if(!item.sizes.includes(...activeSizes) && activeSizes.length !== 0)
             return false;

         return true;
     });

    return (
        <div className=''>
            <div className="mobileTopCatalog">
                <div className='linker mobile'>
                    <ul>
                        <li><a href={'./'}>Главная</a></li>
                        <li><a onClick={() => history.goBack()}>Назад</a></li>
                        <li><span>Каталог</span></li>
                    </ul>
                    <h1>Каталог</h1>
                </div>
                <div className='sorting'>
                <ul className="ul _lm" data-title="Выбери размер:">
                    {sizes.map((size, key) =>  {
                        let className = activeSizes.includes(size) ? 'active' : '';
                        return <li onClick={() => toggleSize(size)} key={key} className={className}>{size}</li>
                    } )}
                </ul>
                <i className="c2" onClick={() => changeNav('col_2')}/>
                <i className="c1" onClick={() => changeNav('')}/>
            </div>
            </div>
            <div className={'list goodsContainer ' + classNamer}>
                {activeItems.map((item, key) => <ItemCard size={activeSizes} item={item} key={key}/>)}
            </div>
        </div>
    )
};


export { CatalogList };
