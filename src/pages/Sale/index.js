import './index.sass'
import React, { useState } from 'react';
import { Filter } from '../../components/Filter';
import { CatalogList } from '../../components/Catalog';
import { useFetch } from '../../utils/requests';
import { get_items } from '../../utils/requests';
import {useHistory, useLocation} from "react-router-dom";
import {IoMdClose} from "react-icons/io/index";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Sale = () => {
    let [openMenu, setMenu] = useState('')

    let history = useHistory();
    let query = useQuery();
    let items = useFetch(get_items, []);
    items = items.filter((el) => parseInt(el.discount,10) > 0);
    let allPage = Math.ceil(items.length / 16);
    let currentPage = parseInt(query.get('page'), 10) <= allPage || parseInt(query.get('page')) > 0 ? parseInt(query.get('page')) : 1;
    let pages = [];
    for(let i = 1; i <= allPage; i++) {
        pages.push(i);
    }
    items = items.slice(16 * (currentPage - 1), 16 * currentPage);
    let tags = getTags(items);
    let sizes = getSizes(items);

    let [activeTags, setActiveTags] = useState([]);
    const toggleTag = getToggle(activeTags, setActiveTags);
    let [activeSizes, setActiveSizes] = useState([]);
    const toggleSize = getToggle(activeSizes, setActiveSizes);

    return (
        <div className='wrapper wrapper--flex  wrapper--indent-pb-small'>
            <div className='left-slide'>
                <div className='linker'>
                    <ul>
                        <li><a href={'./'}>Главная</a></li>
                        <li><a onClick={() => history.goBack()}>Назад</a></li>
                        <li><span>Аутлет</span></li>
                    </ul>
                    <h1>Аутлет</h1>
                </div>
                <Filter tags={tags} sizes={sizes} toggleTag={toggleTag}
                        activeTags={activeTags} toggleSize={toggleSize} activeSizes={activeSizes}/>
            </div>
            <div className={'content  content--indent-mt'}>
                <CatalogList items={items} setMenu={setMenu} activeTags={activeTags} activeSizes={activeSizes} toggleSize={toggleSize} sizes={sizes}/>
                <div className={'paginator'}>
                    <p onClick={() => {
                        if (currentPage - 1 >= 1) {
                            window.location.href = '/sale?page=' + --currentPage;
                        }
                    }}> &#60; </p>
                    {
                        pages.map((el) => {
                            return (<p
                                className={el === currentPage ? 'activePage' : ''}
                                onClick={() => window.location.href = '/sale?page=' + el}
                            >{el}</p>)
                        })
                    }
                    <p onClick={() => {
                        if (currentPage + 1 <= allPage) {
                            window.location.href = '/sale?page=' + ++currentPage;
                        }
                    }}> &#62; </p>
                </div>
            </div>
        </div>
    )
};


function getTags(items) {
    if (items.length > 0) {
        return items.reduce((tags, item) => {
            let newTags = item.tags.filter((tag) => !tags.includes(tag));
            let uniqueTags = newTags.filter((tag, index) => newTags.indexOf(tag) === index);
            tags.push(...uniqueTags);
            return tags
        }, []);
    }
    else
        return []
}

function getSizes(items) {
    if (items.length > 0) {
        return items.reduce((sizes, item) => {
            let newSizes = item.sizes.filter((size) => !sizes.includes(size));
            let uniqueSizes = newSizes.filter((size, index) => newSizes.indexOf(size) === index);
            sizes.push(...uniqueSizes);
            return sizes
        }, []);
    }
    else
        return []
}

function getToggle(actives, setActives) {
    return (element) => {
        setActives(actives = [element]);
        sessionStorage.setItem('size', element)
    };
}


export { Sale };
