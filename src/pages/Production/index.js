import './index.sass'
import React from 'react';
import {useTranslation} from "react-i18next";
import {getWrappedString} from "../../utils/helpers";
import {Article} from "../../components/Article";


const Production = () => {
    const { t } = useTranslation();

    return (
        <div className='page production'>
            <Article title={t('production')} image={require('../../image/production.jpg')}
                     article={getWrappedString(t('production_article'))}/>
        </div>
    )
};


export { Production };