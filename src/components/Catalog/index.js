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
        <div className='catalog-list'>
            {activeItems.map((item, key) => <ItemCard item={item} key={key}/>)}
        </div>
    )
};


export { CatalogList };