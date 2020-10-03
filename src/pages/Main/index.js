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

const Main = () => {
    let text = useFetch(getTextForMain, '');

    let [wellLoad, setLoad] = useState('')
    let [jsonResult, setJson] = useState({});
    let [firstBlock, setFirst] = useState('');
    let [secondBlock, setSecond] = useState('disable');
    let [cite, setCity] = useState('');

    let [classNameForBlock, setClass] = useState('');

    Geocoder.init('AIzaSyD2bDPulysZlPIjG1fO3kNqIvbsbWjXrPw');
    if(sessionStorage.getItem('city') === null && sessionStorage.getItem('postalCode') === null && wellLoad === '') {
        navigator.geolocation.getCurrentPosition((position) => {
            Geocoder.from(position.coords.latitude, position.coords.longitude).then(json => {
                let postalCode = parseInt(json.results[0].address_components[5].long_name, 10);
                let city = json.results[5].address_components[1].long_name;
                console.log(json);
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
    let images = useFetch(get_instagram_photos, []);

    const addCity = () => {
        let city = sessionStorage.getItem('city');
        fetch("php/cityList.php?city=" + city).then((el) => {
            let element = el.json();
            return (element);
        }).then(function (data) {
            console.log(data);
            sessionStorage.setItem('ID_City', parseInt(data[0].cityDD, 10));
            sessionStorage.setItem('city', cite);
            setClass('');
        }).catch((e) => console.log(e))
    }

    const setCityCDEK = (idCity, postCode) => {
        sessionStorage.setItem('ID_City', idCity);
        sessionStorage.setItem('postalCode', postCode);
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
        fetch("php/cityList.php?city=" + cite).then((el) => {
            let element = el.json();
            return (element);
        }).then(function (data) {
            console.log(data);
            sessionStorage.setItem('ID_City', data[0].cityDD);
            sessionStorage.setItem('city', cite);
            sessionStorage.setItem('postalCode', data[0].PostCodeList.split(',')[0]);
            setClass('');
        }).catch((e) => console.log(e))
    }

    return (
        <div className='page main'>
            <div className={'GeoLocation ' + classNameForBlock}>
                <span className={'bgClass'}></span>
                <div className={'blockApplyTheCity ' + firstBlock}>
                        <svg stroke="currentColor" onClick={() => setCityCDEK(137, 190031)} fill="currentColor" stroke-width="0" viewBox="0 0 512 512"
                             className="crossBlockApply" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z"></path>
                        </svg>
                        <h1>Выбор города доставки</h1>
                        <p className="topText">Вы проживаете в городе <b>{sessionStorage.getItem('city')}</b></p>
                        <p>Мы угадали?</p>
                        <div className="buttonBlock">
                            <div className='left-button' onClick={() => addCity()}>Верно</div>
                            <div className="right-button" onClick={() => changeWindow()}>Выбрать другой
                            </div>
                        </div>
                </div>
                <div className={'blockApplyTheCity Big ' + secondBlock}>
                    <svg stroke="currentColor" onClick={() => setCityCDEK(137, 190031)} fill="currentColor" stroke-width="0" viewBox="0 0 512 512"
                         className="crossBlockApply" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z"></path>
                    </svg>
                    <h1>Выбор города доставки</h1>
                    <input type="text" placeholder={'Название города'} onChange={(e) => changeCity(e)}/>
                    <div className={'cityList'}>
                        <span className={'cityList_Left'}>
                            <p onClick={() => setCityCDEK(44, 101000)}>Москва</p>
                            <p onClick={() => setCityCDEK(137, 190031)}>Санкт-Петербург</p>
                            <p onClick={() => setCityCDEK(250, 620000)}>Екатеринбург</p>
                        </span>
                        <span className={'cityList_Right'}>
                            <p onClick={() => setCityCDEK(248, 614000)}>Пермь</p>
                            <p onClick={() => setCityCDEK(414, 603000)}>Нижний Новгород</p>
                            <p onClick={() => setCityCDEK(256, 450000)}>Уфа</p>
                        </span>
                    </div>
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
                                <p className="descr__text">{text}</p>
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
