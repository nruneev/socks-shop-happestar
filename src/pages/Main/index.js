import './index.sass'
import React, {useState} from 'react';
import Geocoder from 'react-native-geocoding';

import { AttentionBlock } from '../../components/AttentionBlock';
import { BannersBlock } from '../../components/BannersBlock';
import {get_attention_photos, get_features, get_banners, get_instagram_photos, useFetch} from '../../utils/requests';
import {InstSlider} from "../../boilerplate/InstSlider";

const Main = () => {
    let [wellLoad, setLoad] = useState('')
    let [jsonResult, setJson] = useState({});
    let [firstBlock, setFirst] = useState('');
    let [secondBlock, setSecond] = useState('disable');
    let [cite, setCity] = useState('');

    let [classNameForBlock, setClass] = useState('');

    Geocoder.init('AIzaSyD2bDPulysZlPIjG1fO3kNqIvbsbWjXrPw');
    if(sessionStorage.getItem('city') === null && sessionStorage.getItem('postalCode') === null && wellLoad === '') {
        fetch('/static/media/data.json')
            .then(function(response){ return response.json(); })
            .then(function(data) {
                setJson(data);
                setLoad('ok');
            }).catch(reason => console.log(reason));

        navigator.geolocation.getCurrentPosition((position) => {
            Geocoder.from(position.coords.latitude, position.coords.longitude).then(json => {
                let postalCode = json.results[0].address_components[5].long_name;
                let city = json.results[0].address_components[2].long_name;
                sessionStorage.setItem('postalCode', postalCode);
                sessionStorage.setItem('city', city);
                setClass('activeBlock');
            }).catch(error => {
                console.warn(error);
                setClass('activeBlock');
                setFirst('disable');
                setSecond('');
            });
        }, () => {
            setClass('activeBlock');
            setFirst('disable');
            setSecond('');
        })
    }
    const attentions = useFetch(get_attention_photos, []);
    const features = useFetch(get_features, []);
    let banners = useFetch(get_banners, []);
    let images = useFetch(get_instagram_photos, []);

    const addCity = () => {
        let city = sessionStorage.getItem('city');
        let obj = jsonResult.Result.filter((el) => el.CityName.toUpperCase().includes(city.toUpperCase()));
        sessionStorage.setItem('ID_City', obj[0].ID);
        sessionStorage.setItem('postalCode', obj[0].PostCodeList.split(',')[0]);
        setClass('');
    }

    const changeWindow = () => {
        setFirst('disable');
        setSecond('');
    }

    let changeCity = (e) => {
        setCity(e.target.value)
    }

    let applyCity = () => {
        let obj = jsonResult.Result.filter((el) => el.CityName.toUpperCase().includes(cite.toUpperCase()));
        sessionStorage.setItem('ID_City', obj[0].ID);
        sessionStorage.setItem('city', cite);
        sessionStorage.setItem('postalCode', obj[0].PostCodeList.split(',')[0]);
        setClass('');

    }

    return (
        <div className='page main'>
            <div className={'GeoLocation ' + classNameForBlock}>
                <span className={'bgClass'}></span>
                <div className={'blockApplyTheCity ' + firstBlock}>
                        <h1>Выбор города доставки</h1>
                        <p className="topText">Вы проживаете в городе <b>{sessionStorage.getItem('city')}</b></p>
                        <p>Мы угадали?</p>
                        <div className="buttonBlock">
                            <div className='left-button' onClick={() => addCity()}>Верно</div>
                            <div className="right-button" onClick={() => changeWindow()}>Выбрать другой
                            </div>
                        </div>
                </div>
                <div className={'blockApplyTheCity ' + secondBlock}>
                    <h1>Выбор города доставки</h1>
                    <input type="text" placeholder={'Название города'} onChange={(e) => changeCity(e)}/>
                    <div className="buttonBlock">
                        <div className='center-button' onClick={() => applyCity()}>Готово</div>
                    </div>
                </div>
            </div>
            <AttentionBlock attentions={attentions} features={features}/>
            <div className='content'>
                <BannersBlock banners={banners}/>
               
                <div className="wrapperssss">
                    <section className="descr">
                        <div className="descr__wrap">
                            <h2 className="title title--x2 descr__title">ИНТЕРНЕТ МАГАЗИН МОДНЫХ НОСКОВ</h2>
                            <img src="/static/media/logo.b7099ec4.png" className="descr__img" alt="Happestar"/>
                                <p className="descr__text">Современный мир сегодня- это молодые, амбициозные, красивые люди!
                                    Команда HAPPESTAR ® является ярким воплощением модных тенденций, шагая в ногу со временем
                                    и используя свое жизненное кредо весьма успешно в бизнесе.</p>
                                <div className="descr__link-wrap">
                                    <a href="/history" className="descr__link">
                                        <span>Подробнее</span>
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
