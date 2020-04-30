import './index.sass'
import React from 'react';
import {useTranslation} from "react-i18next";
import {getWrappedString} from "../../utils/helpers";
import {Article} from "../../components/Article";


const BrandHistory = () => {
    const { t } = useTranslation();

    return (
        <div className='page brand_history'>
            <Article title={t('brand_history')} image={require('../../image/history.jpg')}
                     article={getWrappedString(t('brand_history_article'))}/>
        </div>
    )
};


export { BrandHistory };