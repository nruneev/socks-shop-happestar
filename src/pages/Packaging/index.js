import './index.sass'
import React from 'react';
import {useTranslation} from "react-i18next";
import {getWrappedString} from "../../utils/helpers";
import {Article} from "../../components/Article";


const Packaging = () => {
    const { t } = useTranslation();

    return (
        <div className='page packaging'>
            <Article title={t('packaging')} image={require('../../image/packaging.jpg')}
                     article={getWrappedString(t('packaging_article'))}/>
        </div>
    )
};


export { Packaging };