import './index.sass'
import React from 'react'
import { ImageSlider } from '../../boilerplate/ImageSlider';
import {DescrSlider} from "../../boilerplate/DescrSlider";


const AttentionBlock = ({ attentions, features }) => (
    <React.Fragment>
        <div className='attention'>
            <ImageSlider images={attentions} timeout={5000}/>
        </div>
    </React.Fragment>
);


export { AttentionBlock }
