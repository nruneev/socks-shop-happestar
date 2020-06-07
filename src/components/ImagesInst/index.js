import './index.sass'
import React from 'react';
import { ImageLink } from '../ImageLink';


const ImagesInst = ({ images }) => (
    <div className='images-inst'>
        {images.map((image, key) => {
            return <ImageLink className='image-inst' image={image.url} link={image.link} key={key}/>
        })}
    </div>
);


export { ImagesInst }
