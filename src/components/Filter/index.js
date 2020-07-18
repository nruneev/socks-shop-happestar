import './index.sass'
import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import {ToggleButtons} from "../../boilerplate/ToggleButtonsText";


const Filter = ({ tags, sizes, activeTags, toggleTag, activeSizes, toggleSize}) => {
    let { t } = useTranslation();

    return (
        <div className='filter'>
            <div className="tabs  js---tab-block">
                <div className="group">
                    <div className="name">{t('filter_sizes')}</div>
                    <div className='inner'>
                        <ul className="tags">
                        {sizes.map((size, key) =>  {
                            let className = activeSizes.includes(size) ? 'active' : '';
                            return <li key={key} className={'tag ' + className} onClick={() => {
                                toggleSize(size);
                            }}>{size}</li>
                        } )}
                        </ul>
                    </div>
                </div>
                <div className="group">
                    <div className="name">{t('filter_tags')}</div>
                    <div className='inner'>
                        <ul className="tags">
                        {tags.map((tag, key) =>  {
                            let className = activeTags.includes(tag) ? 'active' : '';
                            return <li key={key} className={'tag ' + className} onClick={() => toggleTag(tag)}>{tag}</li>
                        } )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};


export { Filter };
