import React from 'react'
import { getWrappedString } from '../../../utils/helpers';


const Image = ({ className, image }) => {
    return (
        <div className={className}>
            <img src={image.src} alt={image.text} className='img'/>
            <div className='img-text'>{getWrappedString(image.text)}</div>
        </div>
    )
};


export { Image }
