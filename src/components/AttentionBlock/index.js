import './index.sass'
import React from 'react'
import { ImageSlider } from '../../boilerplate/ImageSlider';


const AttentionBlock = ({ attentions, features }) => (
    <React.Fragment>
        <div className='attention'>
            <ImageSlider images={attentions} timeout={5000}/>
        </div>
        <div className='features'>
            <div className='features__item'>
                <div  className='feature-1'/>
                <div className='feature-1_text'><p>Курьерская доставка по всей России</p></div>
            </div>
            <div className='features__item'>
                <div  className='feature-2'/>
                <div className='feature-2_text'><p>Несколько размеров на выбор и бесплатная примерка</p></div>
            </div>
            <div className='features__item'>
                <div  className='feature-3'/>
                <div className='feature-3_text'><p>Удобные способы оплаты: онлайн или при получении</p></div>
            </div>
            <div className='features__item'>
                <div  className='feature-4'/>
                <div className='feature-4_text'><p>Возврат товара в течение 14 дней</p></div>
            </div>
        </div> 
    </React.Fragment>
);


export { AttentionBlock }
