import './index.sass'
import React, {useContext, useState} from 'react';
import {ItemCardPack} from "../ItemCardPack";
import {useHistory} from "react-router-dom";
import {PackContext} from "../../utils/contexts";


const CatalogListPack = ({ items, setMenu, length, setLength, activeTags, activeSizes, toggleSize, sizes}) => {
    let history = useHistory();

    let [nav_type, setType] = useState(['col_2'])

    const changeNav = (type) => {
        if (type === 'col_2') {
            setType(['col_2']);
        } else {
            setType(['col_1']);
        }
    }

    const {packItems, removeItemPack} = useContext(PackContext);

    let length_nabor = [3, 4, 5, 6, 8];

    const num_three = [1, 2, 3];
    const num_four = [1, 2, 3, 4];
    const num_five = [1, 2, 3, 4, 5];
    const num_six = [1, 2, 3, 4, 5, 6];
    const num_eight = [1, 2, 3, 4, 5, 6, 7, 8];

    let lengthNabor = length;

    const setLengths = (type) => {
        setLength(type);
        console.log(packItems);
    }

    let class_three = '';
    let class_four = '';
    let class_five = '';
    let class_six = '';
    let class_eight = '';

    let classButton = ''

    const classNamer = nav_type[0] === 'col_2' ? '_2c' : '';

     let activeItems = items.filter((item) => {
         if(!activeTags.includes(...item.tags) && activeTags.length !== 0)
             return false;
         if(!item.sizes.includes(...activeSizes) && activeSizes.length !== 0)
             return false;

         return true;
     });

    return (
        <div className={'content  content--indent-mt'}>
            <div className="mobileTopCatalog">
                <div className='linker mobile'>
                    <ul>
                        <li><a href={'./'}>Главная</a></li>
                        <li><a onClick={() => history.goBack()}>Назад</a></li>
                        <li><span>Собрать свой набор</span></li>
                    </ul>
                    <h1>Собрать набор</h1>
                </div>
                <div className={'groups'}>
                    <div className='name'>Выбери набор</div>
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
                    </div>
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
            <div className={'list packerson goodsContainer ' + classNamer}>
                {activeItems.map((item, key) => <ItemCardPack length={length} size={activeSizes} item={item} key={key}/>)}
            </div>
        </div>
    )
};


export { CatalogListPack };
