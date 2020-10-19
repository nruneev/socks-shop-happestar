import './index.sass'
import React, {useState} from 'react';
import {ItemCardPack} from "../ItemCardPack";
import {useHistory} from "react-router-dom";


const CatalogListPack = ({ items, setMenu, length, activeTags, activeSizes }) => {
    let history = useHistory();

    const sort = ['cost', 'new', 'discount'];

    let [nav_type, setType] = useState(['col_2'])

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
                items = items.sort((a, b) => parseInt(a.status, 10) < parseInt(b.status, 10) ? 1 : -1);
                oder = 'asc';
            }
        } else if (type === "cost") {
            if (type === sort_type[0] && sort_type[1] !== "desc") {
                items = items.sort((a, b) => {
                    if (a.cost - a.discount > b.cost - b.discount) {
                        return 1;
                    }
                    if (a.cost - a.discount < b.cost - b.discount) {
                        return -1;
                    }
                    // a должно быть равным b
                    return 0;
                });
                oder = 'desc';
            } else {
                items = items.sort((a, b) => {
                    if (a.cost - a.discount < b.cost - b.discount) {
                        return 1;
                    }
                    if (a.cost - a.discount > b.cost - b.discount) {
                        return -1;
                    }
                    // a должно быть равным b
                    return 0;
                });
            }
        }
        console.log(type + " " + oder);
        changeSort(sort_type = [type, oder]);
    }

    return (
        <div className='content  content--indent-mt'>
            <div className="mobileTopCatalog">
                <div className='linker mobile'>
                    <ul>
                        <li><a href={'./'}>Главная</a></li>
                        <li><a onClick={() => history.goBack()}>Назад</a></li>
                        <li><span>Собрать свой набор</span></li>
                    </ul>
                    <h1>Собрать набор</h1>
                </div>
                <div className='sorting'>
                    <i className="_show_filters" onClick={() => setMenu('open')}/>
                    <ul className="ul _lm" data-title="Сортировать по:">
                        {
                            sort.map((size, key) =>  {
                                let className = sort_type[0] === size ? 'active' : '';
                                let text = "";
                                if (size === "new") {
                                    text = 'новизне'
                                } else if (size === "cost") {
                                    text = 'цене';
                                } else {
                                    text = 'скидке';
                                }
                                return <li onClick={() => changeSorts(size)} key={key} className={className}>{text}</li>
                            } )}
                    </ul>
                    <i className="c2" onClick={() => changeNav('col_2')}/>
                    <i className="c1" onClick={() => changeNav('')}/>
                </div>
            </div>
            <div className={'list goodsContainer ' + classNamer}>
                {activeItems.map((item, key) => <ItemCardPack length={length} size={activeSizes} item={item} key={key}/>)}
            </div>
        </div>
    )
};


export { CatalogListPack };
