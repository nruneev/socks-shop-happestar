import './index.sass'
import React, {useState} from 'react';
import Geocoder from 'react-native-geocoding';

import { AttentionBlock } from '../../components/AttentionBlock';
import { BannersBlock } from '../../components/BannersBlock';
import {
    get_attention_photos,
    get_features,
    get_banners,
    get_instagram_photos,
    useFetch,
    getTextForMain
} from '../../utils/requests';
import {InstSlider} from "../../boilerplate/InstSlider";
import {useInstagramFeed} from "use-instagram-feed";
import {DescrSlider} from "../../boilerplate/DescrSlider";

const Main = () => {
    let text = useFetch(getTextForMain, '');

    let [prel, setPreload] = useState(false);
    let [prelo, setPreloads] = useState(false);
    const attentions = useFetch(get_attention_photos, []);
    if (attentions.length > 0 && !prel) {
        setPreload(true);
    }
    const features = useFetch(get_features, []);

    let banners = useFetch(get_banners, []);
    if (banners.length > 0 && !prelo) {
        setPreloads(true);
    }

    return (
        <div className='page main'>
            <AttentionBlock attentions={attentions} features={features}/>
            <div className='content'>
                <BannersBlock banners={banners}/>
                <div className='imgBlockMainPage'>
                    <span></span>
                    <a href='anime'>
                        <img src='https://happestar.ru/public/images/tovars/аниме.png'/>
                    </a>
                </div>
                <div className='moreInfoBlock'>
                    <div className='moreBLock'>
                        <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="boxes-alt" role="img"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"
                             className="svg-inline--fa fa-boxes-alt fa-w-20 fa-9x">
                            <path fill="currentColor"
                                  d="M624 224H480V16c0-8.8-7.2-16-16-16H176c-8.8 0-16 7.2-16 16v208H16c-8.8 0-16 7.2-16 16v256c0 8.8 7.2 16 16 16h608c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16zm-112 32v64h-64v-64h64zM288 32h64v64h-64V32zm-96 0h64v64c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V32h64v192H192V32zm-64 224h64v64h-64v-64zm176 224H32V256h64v64c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32v-64h80v224zm304 0H336V256h80v64c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32v-64h64v224z"
                                  className=""></path>
                        </svg>
                        <div>
                            <p>Способ доставки из интернет-магазина</p>
                            <span>СДЭК / Курьерская доставка / Самовывоз</span>
                        </div>
                    </div>
                    <div className='moreBLock'>
                        <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="headset" role="img"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                             className="svg-inline--fa fa-headset fa-w-16 fa-7x">
                            <path fill="currentColor"
                                  d="M192 224c0-17.67-14.33-32-32-32h-32c-35.35 0-64 28.65-64 64v63.64c0 35.35 28.65 64 64 64h32c17.67 0 32-14.33 32-32V224zm-32 127.64h-32c-17.64 0-32-14.36-32-32V256c0-17.64 14.36-32 32-32h32v127.64zm224 32c35.35 0 64-28.65 64-64V256c0-35.35-28.65-64-64-64h-32c-17.67 0-32 14.33-32 32v127.64c0 17.67 14.33 32 32 32h32zM352 224h32c17.64 0 32 14.36 32 32v63.64c0 17.64-14.36 32-32 32h-32V224zM256 0C113.97 0 3.92 117.82.1 256L0 280c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8l.09-24C35.43 135.19 131.63 32 256 32c123.5 0 224 100.48 224 224v176c0 26.47-21.53 48-48 48h-82.94c1.79-5.03 2.94-10.36 2.94-16 0-26.51-21.49-48-48-48h-64c-26.51 0-48 21.49-48 48s21.49 48 48 48h192c44.12 0 80-35.89 80-80V256C512 114.85 397.16 0 256 0zm48 480h-64c-8.82 0-16-7.18-16-16s7.18-16 16-16h64c8.82 0 16 7.18 16 16s-7.18 16-16 16z"
                                  className=""></path>
                        </svg>
                        <div>
                            <p>График работы интернет-магазина</p>
                            <span>Каждый день С 10:00 до 20:00 (МСК)</span>
                        </div>
                    </div>
                    <div className='moreBLock'>
                        <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="object-group" role="img"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                             className="svg-inline--fa fa-object-group fa-w-16 fa-9x">
                            <path fill="currentColor"
                                  d="M404 192h-84v-52c0-6.6-5.4-12-12-12H108c-6.6 0-12 5.4-12 12v168c0 6.6 5.4 12 12 12h84v52c0 6.6 5.4 12 12 12h200c6.6 0 12-5.4 12-12V204c0-6.6-5.4-12-12-12zm-276 96V160h160v128zm256 64H224v-32h84c6.6 0 12-5.4 12-12v-84h64zm116-224c6.6 0 12-5.4 12-12V44c0-6.6-5.4-12-12-12h-72c-6.6 0-12 5.4-12 12v20H96V44c0-6.6-5.4-12-12-12H12C5.4 32 0 37.4 0 44v72c0 6.6 5.4 12 12 12h20v256H12c-6.6 0-12 5.4-12 12v72c0 6.6 5.4 12 12 12h72c6.6 0 12-5.4 12-12v-20h320v20c0 6.6 5.4 12 12 12h72c6.6 0 12-5.4 12-12v-72c0-6.6-5.4-12-12-12h-20V128zM32 64h32v32H32zm32 384H32v-32h32zm352-52v20H96v-20c0-6.6-5.4-12-12-12H64V128h20c6.6 0 12-5.4 12-12V96h320v20c0 6.6 5.4 12 12 12h20v256h-20c-6.6 0-12 5.4-12 12zm64 52h-32v-32h32zM448 96V64h32v32z"
                                  className=""></path>
                        </svg>
                        <div>
                            <p>Контакты интернет-магазина</p>
                            <span>+7 911 781 31 00 <br/> Happestar@mail.ru</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};


export { Main };
