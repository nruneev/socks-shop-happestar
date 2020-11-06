import {useEffect, useState} from 'react';
import {request_to_instagram} from "./instagram";
import {text} from "react-placeholder/lib/placeholders";
import {useInstagramFeed} from "use-instagram-feed";


const LIMIT_OF_INSTAGRAM_PHOTOS = 18;

export async function get_instagram_photos() {
    try {
        let photos = [{
        }];
        return photos;
    }
    catch (e) {
        console.error(e);
    }
}

export async function getTextForMain() {
    let text = "";
    try {
        let texts = await fetch("/php/loadTextForPage.php?page=main").then(function (response) {
            return response.json();
        })
            .then(function (data) {
                text = (data[0].article);
            }).catch(reason => console.log(reason));
    }
    catch (e) {
        console.error(e);
    }
    return text;
}

export async function getPhotos() {
    let result = [];
    try {
        let texts = await fetch("/php/getBanners.php").then(function (response) {
            return response.json();
        })
            .then(function (data) {
                result = data;
            }).catch(reason => console.log(reason));
    }
    catch (e) {
        console.error(e);
    }
    return result;
}

export async function getTextForPayAndDelivery() {
    let text = "";
    try {
        let texts = await fetch("/php/loadTextForPage.php?page=payAndDelivery").then(function (response) {
            return response.json();
        })
            .then(function (data) {
                text = (data[0].article);
            }).catch(reason => console.log(reason));
    }
    catch (e) {
        console.error(e);
    }
    return text;
}

export async function getTextForHistoryBrand() {
    let text = "";
    try {
        let texts = await fetch("/php/loadTextForPage.php?page=historyBrand").then(function (response) {
            return response.json();
        })
            .then(function (data) {
                text = (data[0].article);
            }).catch(reason => console.log(reason));
    }
    catch (e) {
        console.error(e);
    }
    return text;
}

export async function getTextForCustomer() {
    let text = "";
    try {
        let texts = await fetch("/php/loadTextForPage.php?page=customer").then(function (response) {
            return response.json();
        })
            .then(function (data) {
                text = (data[0].article);
            }).catch(reason => console.log(reason));
    }
    catch (e) {
        console.error(e);
    }
    return text;
}

let link = (tag) => {
    let bigInt = require('big-integer');

    let id = bigInt(tag.split('_', 1)[0]);
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    let remainder;
    let shortcode = '';

    while (id.greater(0)) {
        let division = id.divmod(64);
        id = division.quotient;
        shortcode = `${alphabet.charAt(division.remainder)}${shortcode}`;
    }

    return shortcode;
}

export async function get_attention_photos() {
    let photos = [];
    try {
        let texts = await fetch("/php/getPhotos.php?type=main_slider").then(function (response) {
            return response.json();
        })
            .then(function (data) {
                data.map((el) => {
                    photos.push({
                        src: el.src,
                        text: el.text
                    })
                });
            }).catch(reason => console.log(reason));
    }
    catch (e) {
        console.error(e);
    }
    return photos;
}

export async function get_history_photos() {
    let photos = '';
    try {
        let texts = await fetch("/php/getPhotos.php?type=historyBrand").then(function (response) {
            return response.json();
        })
            .then(function (data) {
                photos = data[0].src
            }).catch(reason => console.log(reason));
    }
    catch (e) {
        console.error(e);
    }
    return photos;
}

 export async function get_banners() {
     let photos = [];
     try {
         let texts = await fetch("/php/getPhotos.php?type=main_banner").then(function (response) {
             return response.json();
         })
             .then(function (data) {
                 photos = [
                     {
                         src: data[5].src,
                         text: data[5].text,
                         link: '/catalog'
                     },
                     {
                         src: data[4].src,
                         text: data[4].text,
                         link: '/pack'
                     },
                     {
                         src: data[1].src,
                         text: data[1].text,
                         link: '/sale'
                     }
                     ]
             }).catch(reason => console.log(reason));
     }
     catch (e) {
         console.error(e);
     }
     return photos;
 }

 export async function get_features() {
     try {
         return features;
     }
     catch (e) {
         console.error(e);
     }
 }

export const get_items_admin = async () => {
    let result =[];
    let sizes = ['35 - 39', '40 - 45'];
    let response = [];
    let tags = ['Серый', 'Черный', 'Белый', 'Красный', 'Оранжевый', 'Желтый', 'Зеленый', 'Розовый', 'Синий', 'Разноцветный'];
    let itemss = await fetch ('/php/tovarListADMIN.php')
        .then(function(response){ return response.json(); })
        .then(function(data) {
            result = data;
        }).catch(reason => console.log(reason));
    for (let j = 0; j < result.length; j++) {
        let parent = result[j];
        response.push({
            id: parent.id,
            article: parent.article,
            src: parent.photoMain,
            mainPhoto: parent.photoMain,
            altPhoto: parent.photoDetail,
            name: parent.name,
            cost: parent.price,
            discount: 15,
            prev_cost: parent.price,
            sizes: sizes,
            status: parent.new,
            tags: [tags[parent.color - 1]]
        });
    }
    return  response;
};

 export const get_items = async () => {
    let result =[];
    let sizes = ['35 - 39', '40 - 45'];
    let response = [];
    let tags = ['Серый', 'Черный', 'Белый', 'Красный', 'Оранжевый', 'Желтый', 'Зеленый', 'Розовый', 'Синий', 'Разноцветный'];
    let itemss = await fetch ('/php/tovarList.php')
         .then(function(response){ return response.json(); })
         .then(function(data) {
             result = data;
         }).catch(reason => console.log(reason));
    for (let j = 0; j < result.length; j++) {
        let parent = result[j];
        response.push({
            id: parent.id,
            article: parent.article,
            src: parent.photoMain,
            mainPhoto: parent.photoMain,
            altPhoto: parent.photoDetail,
            name: parent.name,
            cost: parent.price,
            discount: parent.discount,
            prev_cost: parent.price,
            sizes: sizes,
            status: parent.new,
            description: result[0].description,
            composition: result[0].composition,
            tags: [tags[parent.color - 1]]
         });
     }
     return  response;
};

export const get_oders = async () => {
    let result =[];
    let itemss = await fetch ('/php/GetOders.php')
        .then(function(response){ return response.json(); })
        .then(function(data) {
            result = data;
            console.log(result);
        }).catch(reason => console.log(reason));
    return  result;
};

export const useFetch = (fetchCall, defaultVal) => {
     const [response, setResponse] = useState(defaultVal);

     async function getData() {
         const res = await fetchCall();
         if (res !== undefined)
             setResponse(res);
     }

     useEffect(() => {
         getData();
     }, [false]);

     return response;
};


const features = [
    {
        class: 'feature-1',
        text: 'Делаем в Питере, доставляем всей России'
    },
    {
        class: 'feature-2',
        text: 'Заказ от 3000 руб? – везем бесплатно по СПб!'
    },
    {
        class: 'feature-3',
        text: 'Оплата при получении - нал, карта, pay pass.'
    },
    {
        class: 'feature-4',
        text: 'Не зайдет – вернешь, 2 недели в запасе'
    }
]

export const STATUS = Object.freeze({
    NONE: 0,
    NEW: 1,
    SELL: 2
});
