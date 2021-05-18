import './index.sass'
import React from 'react'
import { ImageLink } from '../ImageLink';

const BannersBlock = ({ banners }) => {

    return (
        <div className='bannersBodyBlock'>
            <div className='bannersLink'>
                <p>Стиль в мелочах</p>
                <a href='/catalog'>В каталог ></a>
            </div>
            <div className='banners-block'>
                {banners.map((banner, key) => (
                    <ImageLink className={'banners__item banners__item--desktop banners__item--desktop-' + key} image={banner.src} text={banner.text} link={banner.link} key={key}/>
                ))}
            </div>
        </div>
)
};


export { BannersBlock }
