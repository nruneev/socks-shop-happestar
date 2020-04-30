import './index.sass'
import React from 'react';

const Article = ({ title, image, article}) => {
    return (
        <article>
            <h1>{title}</h1>
            <div className='img'>
                <img src={image} alt='history'/>
            </div>
            <p>{article}</p>
        </article>
    )
};


export { Article };