import './index.sass'
import React from 'react';

const Article = ({ title, article}) => {
    return (
        <article>
            <h1>{title}</h1>
            <p>{article}</p>
        </article>
    )
};


export { Article };
