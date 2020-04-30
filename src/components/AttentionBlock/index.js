import './index.sass'
import React from 'react'
import { ImageSlider } from '../../boilerplate/ImageSlider';


const AttentionBlock = ({ attentions }) => (
    <div className='attention'>
        <ImageSlider images={attentions} timeout={5000}/>
    </div>
);


export { AttentionBlock }
