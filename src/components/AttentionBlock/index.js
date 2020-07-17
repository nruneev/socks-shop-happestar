import './index.sass'
import React from 'react'
import { ImageSlider } from '../../boilerplate/ImageSlider';
import {DescrSlider} from "../../boilerplate/DescrSlider";


const AttentionBlock = ({ attentions, features }) => (
    <React.Fragment>
        <div className='attention'>
            <ImageSlider images={attentions} timeout={5000}/>
        </div>

        <div className='attentions'>
            <DescrSlider titles={features} timeout={5000}/>
        </div>
        <div className='features'>
            <div className='features__item'>
                <div  className='feature-1'/>
                <div className='feature-1_text'><p>Доставка по всей России</p></div>
            </div>
            <div className='features__item'>
                <div  className='feature-2'/>
                <div className='feature-2_text'><p>Бесплатная доставка по СПб от 3000 руб</p></div>
            </div>
            <div className='features__item'>
                <div  className='feature-3'/>
                <div className='feature-3_text'><p>Оплата при получении</p></div>
            </div>
            <div className='features__item'>
                <div  className='feature-4'/>
                <div className='feature-4_text'><p>Возврат товара в течение 14 дней</p></div>
            </div>
        </div> 
    </React.Fragment>
);


export { AttentionBlock }
