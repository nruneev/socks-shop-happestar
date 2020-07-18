import {useEffect, useState} from 'react';
import {request_to_instagram} from "./instagram";


const LIMIT_OF_INSTAGRAM_PHOTOS = 18;

export async function get_instagram_photos() {
    try {
        console.log('here');
        let response = await request_to_instagram();
        let images = response.data.map((element) => ({ link: element.link, url: element.images.standard_resolution.url }));
        return images.splice(0, LIMIT_OF_INSTAGRAM_PHOTOS);
    }
    catch (e) {
        console.error(e);
    }
}

 export async function get_attention_photos() {
    try {
        return attentions;
    }
    catch (e) {
        console.error(e);
    }
}

 export async function get_banners() {
    try {
        return banners;
    }
    catch (e) {
        console.error(e);
    }
 }

 export async function get_features() {
     try {
         return features;
     }
     catch (e) {
         console.error(e);
     }
 }

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
        text: 'Доставка по всей России'
    },
    {
        class: 'feature-2',
        text: 'Бесплатная доставка по СПб от 3000 руб'
    },
    {
        class: 'feature-3',
        text: 'Оплата при получении'
    },
    {
        class: 'feature-4',
        text: 'Возврат товара в течение 14 дней'
    }
]

const banners = [
    {
        src: require('../image/banner_1.jpg'),
        text: 'new',
        link: '/catalog?new=1'
    },
    {
        src: require('../image/banner_2.jpg'),
        text: 'sale',
        link: '/catalog?sale=1'
    },
    {
        src: require('../image/banner_2.jpg'),
        text: 'feature',
        link: '/catalog?best=1'
    },
    {
        src: require('../image/banner_1.jpg'),
    },
    {
        src: require('../image/banner_1.jpg'),
        text: 'Собрать свой набор',
        link: '/pack'
    },
    {
        src: require('../image/banner_2.jpg'),
        text: 'Каталог',
        link: '/catalog'
    }
];

const attentions = [
    {
        src: require('../image/attention_1.jpg'),
        text: 'Идеальная пара\n твоему\n настроению'
    },
    {
        src: require('../image/attention_2.jpg'),
        text: 'Идеальная пара\n твоему\n настроению'
    }
];

export const STATUS = Object.freeze({
    NONE: 0,
    NEW: 1,
    SELL: 2
});
