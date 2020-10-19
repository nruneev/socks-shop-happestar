import React from 'react'
import { getWrappedString } from '../../../utils/helpers';


const ImageInst = ({ className, image }) => {
    return (
        <a className={className} target='_blank' href={image.url} >
            <img src={image.src} alt={image.caption} className='img'/>
        </a>
    )
};


export { ImageInst }
