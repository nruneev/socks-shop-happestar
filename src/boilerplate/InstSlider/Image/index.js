import React from 'react'
import { getWrappedString } from '../../../utils/helpers';


const ImageInst = ({ className, image }) => {
    return (
        <a className={className} target='_blank' href={'https://instagram.com/p/' + image.link} >
            <img src={image.url} alt={image.text} className='img'/>
        </a>
    )
};


export { ImageInst }
