import './index.sass'
import React, { useEffect, useState } from 'react'
import { Image } from './Image';
import { ToggleButtons } from '../ToggleButtons';
import { intervalChangeId } from '../../utils/helpers';

const ImageSlider = ({ className, images, timeout = 3000 }) => {
    let classForSliderName = className || '';
    let [activeId, setActiveId] = useState(0);

    useEffect(() => intervalChangeId(getNextImage(images), setActiveId, timeout), [images, timeout]);

    return (
        <div className={'carousel ' + classForSliderName}>
            {images.map((image, key) => {
                let imgClassName = key === activeId ? 'active' : '';
                return (<Image className={'img-block ' + imgClassName} image={image} key={key}/>)})}
            <ToggleButtons images={images} activeId={activeId} setActiveId={setActiveId}/>
        </div>
    )
};


function* getNextImage(images) {
    let i = 0;
    while (true) {
        i = i >= images.length - 1 ? 0 : ++i;
        yield i;
    }
}


export { ImageSlider }
