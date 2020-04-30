import './index.sass'
import React from 'react'
import { ImageLink } from '../ImageLink';


const BannersBlock = ({ banners }) => {

    return (
        <div className='banners-block'>
            {banners.map((banner, key) => (
                <ImageLink className='banner' image={banner.src} text={banner.text} link={banner.link} key={key}/>
            ))}
        </div>
    )
};


export { BannersBlock }
