import React from 'react'
import { getWrappedString } from '../../../utils/helpers';


const ImageInst = ({ className, image }) => {
    return (
        <a className={className} href={image.link} >
            <img src={image.url} alt={image.text} className='img'/>
        </a>
    )
};


export { ImageInst }
