import './index.sass'
import React, {useState} from 'react';
import { ItemCard } from '../ItemCard';


const CatalogList = ({ items, activeTags, activeSizes }) => {

    const sort = ['cost', 'new'];

    let [nav_type, setType] = useState([])

    const changeNav = (type) => {
        if (type === 'col_2') {
            setType(['col_2']);
        } else {
            setType(['col_1']);
        }
    }

    const classNamer = nav_type[0] === 'col_2' ? '_2c' : '';

    let [sort_type, changeSort] = useState([]);

    let activeItems = items.filter((item) => {
         if(!activeTags.includes(...item.tags) && activeTags.length !== 0)
             return false;
         if(!item.sizes.includes(...activeSizes) && activeSizes.length !== 0)
             return false;

         return true;
     });

    const changeSorts = (type) => {
         let oder = "";

         if (type === "new") {
             if (type === sort_type[0]) {
                 items = items.reverse();
                 oder = 'desc';
             } else {
                 items = items.sort((a, b) => a.new > b.new ? 1 : -1);
                 oder = 'asc';
             }
         } else {
             if (type === sort_type[0]) {
                 items = items.reverse();
                 oder = 'desc';
             } else {
                 items = items.sort((a, b) => a.cost > b.cost ? 1 : -1);
                 oder = 'asc';
             }
         }
         changeSort(sort_type = [type, oder]);
     }

    return (
        <div className='content  content--indent-mt'>
            <div className='sorting'>
                <i className="_show_filters"/>
                <ul className="ul _lm" data-title="Сортировать по:">
                    {
                        sort.map((size, key) =>  {
                        let className = sort_type[0] === size ? 'active' : '';
                        let text = size === "new" ? 'новизне' : 'цене';
                        return <li onClick={() => changeSorts(size)} key={key} className={className}>{text}</li>
                    } )}
                    <li>скидке</li>
                </ul>
                <i className="c2" onClick={() => changeNav('col_2')}/>
                <i className="c1" onClick={() => changeNav('')}/>
            </div>
            <div className={'list goodsContainer ' + classNamer}>
                {activeItems.map((item, key) => <ItemCard size={activeSizes} item={item} key={key}/>)}
            </div>
        </div>
    )
};


export { CatalogList };
