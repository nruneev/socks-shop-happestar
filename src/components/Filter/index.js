import './index.sass'
import React from 'react';
import { useTranslation } from 'react-i18next';


const Filter = ({ tags, sizes, activeTags, toggleTag, activeSizes, toggleSize}) => {
    let { t } = useTranslation();

    return (
        <div className='filter'>
            <h1>{t('filter_sizes')}</h1>
            <div className='tags'>
                {sizes.map((size, key) =>  {
                    let className = activeSizes.includes(size) ? 'active' : '';
                    return <div key={key} className={'tag ' + className} onClick={() => toggleSize(size)}>{size}</div>
                } )}
            </div>
            <h1>{t('filter_tags')}</h1>
            <div className='tags'>
                {tags.map((tag, key) =>  {
                    let className = activeTags.includes(tag) ? 'active' : '';
                    return <div key={key} className={'tag ' + className} onClick={() => toggleTag(tag)}>{tag}</div>
                } )}
            </div>
        </div>
    )
};


export { Filter };