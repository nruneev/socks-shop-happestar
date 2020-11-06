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
    let images = useInstagramFeed({
        userId: "5431003189",
        thumbnailWidth: 640,
        photoCount: 12
    });

    return (
        <div className='page main'>
            <AttentionBlock attentions={attentions} features={features}/>
            <div className='content'>
                <BannersBlock banners={banners}/>
               
                <div className="wrapperssss">
                    <section className="descr">
                        <div className="descr__wrap">
                            <h2 className="title title--x2 descr__title">ИНТЕРНЕТ МАГАЗИН МОДНЫХ НОСКОВ</h2>
                            <img src="/static/media/logo.b7099ec4.png" className="descr__img" alt="Happestar"/>
                                <p className="descr__text">{text}</p>
                                <div className="descr__link-wrap">
                                    <a href="/history" className="descr__link">
                                        <span>о чем это мы</span>
                                    </a>
                                </div>
                        </div>
                    </section>
                </div>
                <div className="follow-us containerer">
                    <h2 className="title title--x2 follow-us__title">
                        СЛЕДИТЕ ЗА НАМИ В INSTAGRAM
                    </h2>
                    <a href="https://www.instagram.com/happestar/" className="follow-us__link" target="blank">
                        @happestar
                    </a>
                    <InstSlider images={images}/>
                </div>
            </div>
        </div>
    )
};


export { Main };
