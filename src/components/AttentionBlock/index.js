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
                <div className='feature-1_text'><p>Делаем в Питере, доставляем всей России</p></div>
            </div>
            <div className='features__item'>
                <div  className='feature-2'>
                    <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="socks" role="img"
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                         className="svg-inline--fa fa-socks fa-w-16 fa-9x">
                        <path fill="currentColor"
                              d="M448 0h-95.83c-11.87 0-22.84 3.43-32.37 9.04C310.43 3.49 299.71 0 288 0h-95.83c-35.32 0-63.96 28.46-64 63.78C128.1 137.27 128 248 128 248l-79.77 59.39c-45.97 34.49-62.82 98.49-34.06 148.25C35.46 492.47 73.8 512 112.09 512c23.38 0 46.97-7.3 67.09-22.41l13.76-10.32c21.47 21.46 50.13 32.72 79.14 32.72 23.38 0 46.97-7.3 67.09-22.41l121.61-91.2a128.006 128.006 0 0 0 51.21-102.4V64C512 28.65 483.35 0 448 0zm-95.83 32H448c17.64 0 32 14.36 32 32v32H320.14l.03-32.18c.02-17.55 14.38-31.82 32-31.82zm-160 0H288c2.91 0 5.68.47 8.31 1.24-5.02 9.1-8.13 19.4-8.14 30.54L288.14 96h-128l.03-32.18c.02-17.55 14.38-31.82 32-31.82zm-18.32 421.6L159.97 464c-13.94 10.46-30.5 16-47.88 16-28.98 0-55.61-15.09-70.22-40.38-19.78-34.21-8.55-81.05 25.56-106.64L159.98 264l.13-136h128c-.06 60.63-.11 120-.11 120l-79.16 59.39c-45.37 34.03-62.18 96.75-34.99 146.21zM480 295.99c0 30.06-14.36 58.77-38.4 76.8L319.97 464c-13.94 10.46-30.5 16-47.88 16-28.98 0-55-15.09-69.62-40.38-19.78-34.21-8.55-81.05 25.56-106.64L319.98 264l.13-136H480v167.99z"
                              className=""></path>
                    </svg>
                </div>
                <div className='feature-2_text'><p>Заказ от 3000 руб? – везем бесплатно по СПб!</p></div>
            </div>
            <div className='features__item'>
                <div  className='feature-3'/>
                <div className='feature-3_text'><p>Оплата при получении - нал, карта, pay pass.</p></div>
            </div>
            <div className='features__item'>
                <div  className='feature-4'/>
                <div className='feature-4_text'><p>Не зайдет – вернешь, 2 недели в запасе</p></div>
            </div>
        </div> 
    </React.Fragment>
);


export { AttentionBlock }
