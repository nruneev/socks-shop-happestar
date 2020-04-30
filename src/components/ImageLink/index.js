import './index.sass'
import React from 'react'


const ImageLink = ({ className, image, text, link }) => {
    let textBlock = text ? <span>{text}</span> : ''

    return (
        <a href={link} className={className}>
            <img src={image} alt={text}/>
            {textBlock}
        </a>
    )
};


export { ImageLink }
