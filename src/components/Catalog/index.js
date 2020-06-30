import './index.sass'
import React from 'react';
import { ItemCard } from '../ItemCard';


const CatalogList = ({ items, activeTags, activeSizes }) => {
     let activeItems = items.filter((item) => {
         if(!activeTags.includes(...item.tags) && activeTags.length !== 0)
             return false;
         if(!item.sizes.includes(...activeSizes) && activeSizes.length !== 0)
             return false;

         return true;
     });

    return (
        <div className='content  content--indent-mt'>
            <div className='sorting'>
                <i className="_show_filters"></i>
                <ul className="ul _lm" data-title="Сортировать по:">
                    <li data-sorting="name"><span>по</span> названию</li>
                    <li data-sorting="price"><span>по</span> цене</li>
                </ul>
            </div>
            <div className="list goodsContainer _2c">
                {activeItems.map((item, key) => <ItemCard item={item} key={key}/>)}
            </div>
        </div>
    )
};


export { CatalogList };
