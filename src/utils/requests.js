import {useEffect, useState} from 'react';
// import {request_to_instagram} from "./instagram";
//
 // import url from '../server.config.js';
 const LIMIT_OF_INSTAGRAM_PHOTOS = 8;
//
//
//
 export async function get_instagram_photos() {
//     try {
//         console.log('here');
//         let response = await request_to_instagram();
//         let images = response.data.map((element) => ({ link: element.link, url: element.images.standard_resolution.url }));
//         return images.splice(0, LIMIT_OF_INSTAGRAM_PHOTOS);
//     }
//     catch (e) {
//         console.error(e);
//     }
}
//
 export async function get_attention_photos() {
    // let attetion_url = url.host + url.links.get_attention_photos;

    try {
        // let res = await fetch(attetion_url);
        // let images = await res.json();

        return attentions;
    }
    catch (e) {
        console.error(e);
    }
}
//
 export async function get_banners() {
    // let banners_url = url.host + url.links.get_banners;

    try {
        // let res = await fetch(banners_url);
        // let images = await res.json();

        return banners;
    }
    catch (e) {
        console.error(e);
    }
 }

 export const get_items = () => {
     return items;
};

 export const get_tags = () => {
     return tagsList;
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

const banners = [
    {
        src: require('../image/banner_1.jpg'),
        text: 'new',
        link: '#'
    },
    {
        src: require('../image/banner_2.jpg'),
        text: 'sale',
        link: '#'
    },
    {
        src: require('../image/banner_2.jpg'),
        text: 'best',
        link: '#'
    },
    {
        src: require('../image/banner_1.jpg'),
        text: 'feature',
        link: '#'
    },
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

const photos = [
    {
        src: require('../image/inst_4.jpg'),
        link: '#'
    },
    {
        src: require('../image/inst_2.jpg'),
        link: '#'
    },
    {
        src: require('../image/inst_1.jpg'),
        link: '#'
    },
    {
        src: require('../image/inst_3.jpg'),
        link: '#'
    },
    {
        src: require('../image/inst_5.jpg'),
        link: '#'
    },
    {
        src: require('../image/inst_6.jpg'),
        link: '#'
    },
    {
        src: require('../image/inst_7.jpg'),
        link: '#'
    },
    {
        src: require('../image/inst_8.jpg'),
        link: '#'
    },
    {
        src: require('../image/inst_9.jpg'),
        link: '#'
    },
    {
        src: require('../image/inst_10.jpg'),
        link: '#'
    },
];

let items = new Array(25);

let tagsList = ['Японские', 'Аниме', 'Фантастические', 'Космические', 'С Животными'];

let names = ['', 'Змей лун', 'Карпы кои', 'Colonizer mask', 'Игуана', 'Axegao', "Let's celebrate", 'Happy2020', 'Cute winter moments',
    'ho-ho-ho', 'Экспрессия'];

let sizes = ['35 - 39', '39 - 43'];

for (let i = 1; i < 21; i++) {
    let size = (Math.random() * tagsList.length) ^ 0;
    let tags = new Array(size).fill(0).map(() => tagsList[(Math.random() * tagsList.length) ^ 0]);
    let j = i > 10 ? i-10 : i;
    items[i] = {
        id: i,
        src: require('../image/item_' + j + '.jpg'),
        name: names[j],
        cost: 850,
        discount: 15,
        prev_cost: 1000,
        sizes: sizes.slice(0, ((Math.random() * 2 ^ 0) + 1)),
        status: (Math.random() * 3) ^ 0,
        tags
    };
}

export const STATUS = Object.freeze({
    NONE: 0,
    NEW: 1,
    SELL: 2
});