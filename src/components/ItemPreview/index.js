import './index.sass'
import React from 'react';
import { useTranslation } from 'react-i18next';
import { STATUS } from '../../utils/requests';

const statusClasses = new Map();
statusClasses.set(STATUS.NONE, '');
statusClasses.set(STATUS.NEW, 'new');
statusClasses.set(STATUS.SELL, 'sell');


const ItemPreview= ({ item, width }) => {
    if(width) {
        width -= 4;
        let items = document.getElementsByClassName('item');
        items && [].forEach.call(items, ((item) => item.style.width = width));
    }

    const { t } = useTranslation();

    let statusClass = statusClasses.get(item.status);

    return (
        <div className={'item-preview ' + statusClass}>
            <div className='img'>
                <img src={item.src} alt={item.name}/>
            </div>
            <div className='preview'>{t('more')}</div>
        </div>
    )
};


export { ItemPreview };