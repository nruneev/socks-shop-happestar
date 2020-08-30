import './index.sass'
import React, {useContext, useState} from 'react';
import { Filter } from '../../components/Filter';
import { useFetch } from '../../utils/requests';
import { get_items } from '../../utils/requests';
import {CartContext, PackContext} from "../../utils/contexts";
import {CatalogListPack} from "../../components/CatalogPack";
import { useHistory } from "react-router-dom";
import {IoMdClose} from "react-icons/io/index";


const Pack = () => {
    let [openMenu, setMenu] = useState('')
    let history = useHistory();
    let items = useFetch(get_items, []);

    const {packItems, removeItemPack} = useContext(PackContext);
    const {setItem} = useContext(CartContext);

    let length_nabor = [3, 4, 5, 6, 8];

    const num_three = [1, 2, 3];
    const num_four = [1, 2, 3, 4];
    const num_five = [1, 2, 3, 4, 5];
    const num_six = [1, 2, 3, 4, 5, 6];
    const num_eight = [1, 2, 3, 4, 5, 6, 7, 8];

    let [lengthNabor, setLength] = useState([]);

    const setLengths = (type) => {
        setLength(type);
        console.log(packItems);
    }

    let class_three = '';
    let class_four = '';
    let class_five = '';
    let class_six = '';
    let class_eight = '';

    let tags = getTags(items);
    let sizes = getSizes(items);

    let classButton = ''

    let [activeTags, setActiveTags] = useState([]);
    const toggleTag = getToggle(activeTags, setActiveTags);
    let [activeSizes, setActiveSizes] = useState([]);
    const toggleSize = getToggle(activeSizes, setActiveSizes);

    const setNabor = () => {
        let isSmall = false;
        let isBig = false;
        packItems.map((el) => {
            if (el.sizes === '35 - 39') isSmall = true;
            if (el.sizes === '40 - 45') isBig = true;
        });
        let sizess = ''
        if (isSmall && isBig) {
            sizess = '35 - 39, 40 - 45'
        } else if (isSmall) {
            sizess = '35 - 39'
        } else if (isBig) {
            sizess = '40 - 45'
        }

        const item = {
            article: packItems.map((el) => {
                return el.article + ", ";
            }),
            id: Math.abs(Math.random() * 100),
            name: 'Ваш набор',
            src: '/static/media/box.jpg',
            sizes: sizess,
            cost: 390 * packItems.length,
            count: 1,
            isNabor: true,
            item: packItems
        }

        setItem(item);

        for (let i = 0; i < packItems.length; i++) {
            removeItemPack(packItems[i].ids);
        }
    }

    let classerPack = packItems.length === lengthNabor ? 'activeBlocker' : '';

    return (
        <div className='wrapper wrapper--flex  wrapper--indent-pb-small'>
            <div className={'packComplete ' + classerPack}>
                <span className='bgPack'></span>
                <div className="blockPack">
                    <p>Ваш набор собран!</p>
                    <div onClick={() => setNabor()} className={"button"}>В корзину!</div>
                </div>
            </div>
            <div className='left-slide'>
                <div className='linker'>
                    <ul>
                        <li><a href={'./'}>Главная</a></li>
                        <li><a onClick={() => history.goBack()}>Назад</a></li>
                        <li><span>Собрать свой набор</span></li>
                    </ul>
                    <h1>Собрать набор</h1>
                </div>
                <div className='left-menu'>
                    <div className='group'>
                        <div className='name'>Наборы</div>
                        <div className='inner'>
                            <ul className="tags count">
                                {
                                    length_nabor.map((el) => {
                                        let classNamer = el === lengthNabor ? "active" : "";
                                        if(el === lengthNabor ) {
                                            if (el === 3) {
                                                class_three = 'vis';
                                                class_four = '';
                                                class_five = ''
                                                class_six = '';
                                                class_eight = '';
                                            } else if (el === 4) {
                                                class_three = '';
                                                class_four = 'vis';
                                                class_five = '';
                                                class_six = '';
                                                class_eight = '';
                                            } else if (el === 5) {
                                                class_three = '';
                                                class_four = '';
                                                class_five = 'vis'
                                                class_six = '';
                                                class_eight = '';
                                            } else if(el === 6) {
                                                class_four = '';
                                                class_six = 'vis';
                                                class_eight = '';
                                            } else if (el === 8) {
                                                class_four = '';
                                                class_six = '';
                                                class_eight = 'vis';
                                            } else {
                                                class_four = '';
                                                class_six = '';
                                                class_eight = '';
                                            }
                                        }
                                        return <li onClick={() => {
                                            if (el >= packItems.length) {
                                                setLengths(el)
                                            } else {
                                                alert('Вы не можете уменьшить размер набора. Пожалуйста, удалите лишние пары и повторите попытку');
                                            }
                                        }} className={'tag ' + classNamer}>{el}</li>
                                    })
                                }
                            </ul>
                            <ul className={"options three" + class_three}>
                                {num_three.map((el, key) => {
                                    let classNamer = key <= packItems.length - 1 ? 'chsn' : '';
                                    classButton = packItems.length === lengthNabor ? 'shw' : '';
                                    let src = '';
                                    if (packItems.length > 0 && packItems[key]) {
                                        src = packItems[key].src;
                                        return (<li data-src={src} onClick={() => removeItemPack(packItems[key].ids)} className={'option ' + classNamer}>{el}
                                            <img src={src}/>
                                        </li>);
                                    } else {
                                        return (<li data-src={src} className={'option ' + classNamer}>{el}
                                            <img src={src}/>
                                        </li>);
                                    }
                                })}
                            </ul>
                            <ul className={"options four" + class_four}>
                                {num_four.map((el, key) => {
                                    let classNamer = key <= packItems.length - 1 ? 'chsn' : '';
                                    classButton = packItems.length === lengthNabor ? 'shw' : '';
                                    let src = '';
                                    if (packItems.length > 0 && packItems[key]) {
                                        src = packItems[key].src;
                                        return (<li data-src={src} onClick={() => removeItemPack(packItems[key].ids)} className={'option ' + classNamer}>{el}
                                            <img src={src}/>
                                        </li>);
                                    } else {
                                        return (<li data-src={src} className={'option ' + classNamer}>{el}
                                            <img src={src}/>
                                        </li>);
                                    }
                                })}
                            </ul>
                            <ul className={"options five" + class_five}>
                                {num_five.map((el, key) => {
                                    let classNamer = key <= packItems.length - 1 ? 'chsn' : '';
                                    let src = '';
                                    classButton = packItems.length === lengthNabor ? 'shw' : '';
                                    if (packItems.length > 0 && packItems[key]) {
                                        src = packItems[key].src;
                                        return (<li data-src={src} onClick={() => removeItemPack(packItems[key].ids)} className={'option ' + classNamer}>{el}
                                            <img src={src}/>
                                        </li>);
                                    } else {
                                        return (<li data-src={src} className={'option ' + classNamer}>{el}
                                            <img src={src}/>
                                        </li>);
                                    }
                                })}
                            </ul>
                            <ul className={"options six" + class_six}>
                                {num_six.map((el, key) => {
                                    let classNamer = key <= packItems.length - 1 ? 'chsn' : ''
                                    let src = '';
                                    classButton = packItems.length === lengthNabor ? 'shw' : '';
                                    if (packItems.length > 0 && packItems[key]) {
                                        src = packItems[key].src;
                                        return (<li data-src={src} onClick={() => removeItemPack(packItems[key].ids)} className={'option ' + classNamer}>{el}
                                            <img src={src}/>
                                        </li>);
                                    } else {
                                        return (<li data-src={src} className={'option ' + classNamer}>{el}
                                            <img src={src}/>
                                        </li>);
                                    }
                                })}
                            </ul>
                            <ul className={"options eight" + class_eight}>
                                {num_eight.map((el, key) => {
                                    let classNamer = key <= packItems.length - 1 ? 'chsn' : ''
                                    let src = '';
                                    classButton = packItems.length === lengthNabor ? 'shw' : '';
                                    if (packItems.length > 0 && packItems[key]) {
                                        src = packItems[key].src;
                                        return (<li data-src={src} onClick={() => removeItemPack(packItems[key].ids)} className={'option ' + classNamer}>{el}
                                            <img src={src}/>
                                        </li>);
                                    } else {
                                        return (<li data-src={src} className={'option ' + classNamer}>{el}
                                            <img src={src}/>
                                        </li>);
                                    }
                                })}
                            </ul>
                            <button onClick={() => setNabor()} className={'button ' + classButton}>В корзину!</button>
                        </div>
                    </div>
                    <Filter tags={tags} sizes={sizes} toggleTag={toggleTag}
                            activeTags={activeTags} toggleSize={toggleSize} activeSizes={activeSizes}/>
                </div>
            </div>
            <div className={'left-slide-mobile ' + openMenu}>
                <IoMdClose onClick={() => setMenu('')} className='cross'/>
                <div className='left-menu'>
                    <div className='group'>
                        <div className='name'>Наборы</div>
                        <div className='inner'>
                            <ul className="tags count">
                                {
                                    length_nabor.map((el) => {
                                        let classNamer = el === lengthNabor ? "active" : "";
                                        if(el === lengthNabor ) {
                                            if (el === 3) {
                                                class_three = 'vis';
                                                class_four = '';
                                                class_five = ''
                                                class_six = '';
                                                class_eight = '';
                                            } else if (el === 4) {
                                                class_three = '';
                                                class_four = 'vis';
                                                class_five = '';
                                                class_six = '';
                                                class_eight = '';
                                            } else if (el === 5) {
                                                class_three = '';
                                                class_four = '';
                                                class_five = 'vis'
                                                class_six = '';
                                                class_eight = '';
                                            } else if(el === 6) {
                                                class_four = '';
                                                class_six = 'vis';
                                                class_eight = '';
                                            } else if (el === 8) {
                                                class_four = '';
                                                class_six = '';
                                                class_eight = 'vis';
                                            } else {
                                                class_four = '';
                                                class_six = '';
                                                class_eight = '';
                                            }
                                        }
                                        return <li onClick={() => {
                                            if (el >= packItems.length) {
                                                setLengths(el)
                                            } else {
                                                alert('Вы не можете уменьшить размер набора. Пожалуйста, удалите лишние пары и повторите попытку');
                                            }
                                        }} className={'tag ' + classNamer}>{el}</li>
                                    })
                                }
                            </ul>
                            <ul className={"options three" + class_three}>
                                {num_three.map((el, key) => {
                                    let classNamer = key <= packItems.length - 1 ? 'chsn' : '';
                                    classButton = packItems.length === lengthNabor ? 'shw' : '';
                                    let src = '';
                                    if (packItems.length > 0 && packItems[key]) {
                                        src = packItems[key].src;
                                    }
                                    return <li data-src={src} className={'option ' + classNamer}>{el}
                                        <img src={src}/>
                                    </li>;
                                })}
                            </ul>
                            <ul className={"options four" + class_four}>
                                {num_four.map((el, key) => {
                                    let classNamer = key <= packItems.length - 1 ? 'chsn' : '';
                                    classButton = packItems.length === lengthNabor ? 'shw' : '';
                                    let src = '';
                                    if (packItems.length > 0 && packItems[key]) {
                                        src = packItems[key].src;
                                    }
                                    return <li data-src={src} className={'option ' + classNamer}>{el}
                                        <img src={src}/>
                                    </li>;
                                })}
                            </ul>
                            <ul className={"options five" + class_five}>
                                {num_five.map((el, key) => {
                                    let classNamer = key <= packItems.length - 1 ? 'chsn' : '';
                                    let src = '';
                                    if (packItems.length > 0 && packItems[key]) {
                                        src = packItems[key].src;
                                    }
                                    classButton = packItems.length === lengthNabor ? 'shw' : '';
                                    return <li data-src={src} className={'option ' + classNamer}>{el}
                                        <img src={src}/>
                                    </li>;
                                })}
                            </ul>
                            <ul className={"options six" + class_six}>
                                {num_six.map((el, key) => {
                                    let classNamer = key <= packItems.length - 1 ? 'chsn' : ''
                                    let src = '';
                                    if (packItems.length > 0 && packItems[key]) {
                                        src = packItems[key].src;
                                    }
                                    classButton = packItems.length === lengthNabor ? 'shw' : '';
                                    return <li data-src={src} className={'option ' + classNamer}>{el}
                                        <img src={src}/>
                                    </li>
                                })}
                            </ul>
                            <ul className={"options eight" + class_eight}>
                                {num_eight.map((el, key) => {
                                    let classNamer = key <= packItems.length - 1 ? 'chsn' : ''
                                    let src = '';
                                    if (packItems.length > 0 && packItems[key]) {
                                        src = packItems[key].src;
                                    }
                                    classButton = packItems.length === lengthNabor ? 'shw' : '';
                                    return <li data-src={src} className={'option ' + classNamer}>{el}
                                        <img src={src}/>
                                    </li>
                                })}
                            </ul>
                            <button onClick={() => setNabor()} className={'button ' + classButton}>ДОбавить</button>
                        </div>
                    </div>
                    <Filter tags={tags} sizes={sizes} toggleTag={toggleTag}
                        activeTags={activeTags} toggleSize={toggleSize} activeSizes={activeSizes}/>
                </div>
            </div>
            <CatalogListPack items={items} setMenu={setMenu} length={lengthNabor} activeTags={activeTags} activeSizes={activeSizes}/>
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



export { Pack };
