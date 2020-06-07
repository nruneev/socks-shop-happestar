import './index.sass'
import React from 'react';
import { AttentionBlock } from '../../components/AttentionBlock';
import { ImagesInst } from '../../components/ImagesInst';
import { BannersBlock } from '../../components/BannersBlock';
import {get_attention_photos, get_features, get_banners, get_instagram_photos, useFetch} from '../../utils/requests';

const Main = () => {
    const attentions = useFetch(get_attention_photos, []);
    const features = useFetch(get_features, []);
    let banners = useFetch(get_banners, []);
    let images = useFetch(get_instagram_photos, []);


    return (
        <div className='page main'>
            <AttentionBlock attentions={attentions} features={features}/>
            <div className='content'>
                <BannersBlock banners={banners}/>
                <div className="container">
                    <div className="wrapper  product-wrap">
                        <h2 className="title  title--x2">
                            Лучшие товары
                        </h2>
                        <div className="tabs  js---tab-block">
                            <div className="tabs__nav">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wrapper">
                    <section className="descr">
                        <div className="descr__wrap">
                            <h2 className="title title--x2 descr__title">ИНТЕРНЕТ МАГАЗИН МОДНЫХ НОСКОВ</h2>
                            <img src="/static/media/logo.b7099ec4.png" className="descr__img" alt="Happestar"/>
                                <p className="descr__text">Современный мир сегодня- это молодые, амбициозные, красивые люди!
                                    Команда HAPPESTAR ® является ярким воплощением модных тенденций, шагая в ногу со временем
                                    и используя свое жизненное кредо весьма успешно в бизнесе.</p>
                                <div className="descr__link-wrap">
                                    <a href="/brand-history" className="descr__link">
                                        <span>Подробнее</span>
                                    </a>
                                </div>
                        </div>
                    </section>
                </div>
                <div className="follow-us container">
                    <h2 className="title title--x2 follow-us__title">
                        СЛЕДИТЕ ЗА НАМИ В INSTAGRAM
                    </h2>
                    <a href="https://www.instagram.com/happestar/" className="follow-us__link" target="blank">
                        @happestar
                    </a>
                    <ImagesInst images={images}/>
                </div>
            </div>
        </div>
    )
};


export { Main };
