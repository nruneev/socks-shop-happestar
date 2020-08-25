import './index.sass'
import React, { useState } from 'react'
import {ImageInst} from './Image';

const InstSlider = ({ className, images, timeout = 3000 }) => {
    let classForSliderName = className || '';

    let [index, setIndex] = useState(0)

    let timer = setTimeout(() => {
        let indexer = index;
        indexer = indexer + 1 < images.length ? indexer + 1 : 0;
        setIndex(indexer)
    }, timeout);

    if (images.length > 0) {
        return (
            <div className={'carouselsss ' + classForSliderName} onClick={() => {
                clearTimeout(timer);
                let indexer = index;
                indexer = indexer - 1 < 0 ? 11 : indexer - 1;
                setIndex(indexer)
            }}>
                <div className='arrowControlLeft'>
                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="chevron-left" role="img"
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"
                         className="svg-inline--fa fa-chevron-left fa-w-8 fa-7x">
                        <path fill="currentColor"
                            d="M231.293 473.899l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L70.393 256 251.092 74.87c4.686-4.686 4.686-12.284 0-16.971L231.293 38.1c-4.686-4.686-12.284-4.686-16.971 0L4.908 247.515c-4.686 4.686-4.686 12.284 0 16.971L214.322 473.9c4.687 4.686 12.285 4.686 16.971-.001z"
                            className=""/>
                    </svg>
                </div>
                <div className='images'>
                    <ImageInst className={'inst-block'} image={images[index]} key={1}/>
                    <ImageInst className={'inst-block'} image={images[index + 1 < images.length ? index + 1 : index + 1 - images.length]} key={2}/>
                    <ImageInst className={'inst-block'} image={images[index + 2 < images.length ? index + 2 : index + 2 - images.length]} key={3}/>
                    <ImageInst className={'inst-block'} image={images[index + 3 < images.length ? index + 3 : index + 3 - images.length]} key={4}/>
                    <ImageInst className={'inst-block'} image={images[index + 4 < images.length ? index + 4 : index + 4 - images.length]} key={5}/>
                    <ImageInst className={'inst-block'} image={images[index + 5 < images.length ? index + 5 : index + 5 - images.length]} key={6}/>
                    <ImageInst className={'inst-block'} image={images[index + 6 < images.length ? index + 6 : index + 6 - images.length]} key={7}/>
                    <ImageInst className={'inst-block'} image={images[index + 7 < images.length ? index + 7 : index + 7 - images.length]} key={8}/>
                </div>
                <div className='arrowControlRight' onClick={() => {
                    clearTimeout(timer);
                    let indexer = index;
                    indexer = indexer + 1 < images.length ? indexer + 1 : 0;
                    setIndex(indexer)
                }}>
                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="chevron-right" role="img"
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"
                         className="svg-inline--fa fa-chevron-right fa-w-8 fa-9x">
                        <path fill="currentColor"
                            d="M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z"
                            className=""/>
                    </svg>
                </div>
            </div>
        )
    } else {
        return (
            <div className={'carouselsss ' + classForSliderName}>
                <div className='images'>
                </div>
            </div>
        )
    }
};


export { InstSlider }
