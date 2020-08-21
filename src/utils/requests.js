import {useEffect, useState} from 'react';
import {request_to_instagram} from "./instagram";


const LIMIT_OF_INSTAGRAM_PHOTOS = 18;

export async function get_instagram_photos() {
    try {
        let response = await request_to_instagram();
        let imagess = response.map((element) => ({ link: link(element.id), url: element.image }));
        imagess.map((el) => imagess.push(el));
        return imagess;
    }
    catch (e) {
        console.error(e);
    }
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

const images = [
    {
        link: 'https://www.instagram.com/p/CA8dDkcjyK6/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s750x750/101334968_1700889773411244_3893462734262458346_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=100&_nc_ohc=lpAuZ4Wok_YAX-D2d09&oh=5a299f583e72cf017fe825732e70ae12&oe=5F47A34B',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/CAv4bOuj1JB/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/e35/101193700_126498639066692_6800170327260554188_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=108&_nc_ohc=HKdl0d0zhqMAX-102N5&oh=77756a6143a20fb409c64f3aa6fc7bcd&oe=5F44D6E8',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/B_SrQN6jwxr/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p640x640/93834537_676278156492828_1864885391560719962_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=100&_nc_ohc=fTPcVmuEVU0AX-jpQ9n&oh=5f8e352da98aaf911cdc4d8dfee42913&oe=5F456C23',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/B_Kj3g4DQOV/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/93715725_1578193185667644_2239666161289094079_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=100&_nc_ohc=KcbnIyyXdmAAX8WDqnw&oh=0ec197af85b1d67409f466afc9e1b267&oe=5F44CF7D',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/B_I2QI2j_Dg/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/94104198_705210923621340_3514689051665867313_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=100&_nc_ohc=P5oiiGC3z40AX9_-5UH&oh=83bbb381c3d9d598d8fbf7a5eb7a908e&oe=5F45B92C',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/CA8dDkcjyK6/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s750x750/101334968_1700889773411244_3893462734262458346_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=100&_nc_ohc=lpAuZ4Wok_YAX-D2d09&oh=5a299f583e72cf017fe825732e70ae12&oe=5F47A34B',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/B-o32wQDIzp/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s750x750/92345034_120475336263957_2165284032695625658_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=109&_nc_ohc=JsRf1t6X5ssAX-RRhhM&oh=0a53d6ab657294a50d43cca393075ad4&oe=5F4406D4',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/B-joTRTjgr4/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p750x750/91733141_583837669008618_6547851728936448683_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=106&_nc_ohc=jejA_a9TGnAAX9Shpk3&oh=827e2be0636d7af8c289b7e1225e6139&oe=5F45BEBA',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/B-egkLfj-Z3/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/91441569_286813265634361_4409825345936101750_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=101&_nc_ohc=BfPnRkCJHiQAX_zBAPf&oh=2fcf1f6b31c54dc75cbc719d675ed32d&oe=5F455B92',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/B-NLSlkDbLv/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/91339360_2567714003549662_6949678741951238700_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=110&_nc_ohc=bdQT8kHU1rgAX_HLv_B&oh=00063be4c2a9c0ffaf5fc16341e70ba3&oe=5F47A9B7',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/B-NKNKQjkzv/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/90520820_147897953222360_6304853410265211548_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=108&_nc_ohc=7Jhoxs30FrMAX8AnN6z&oh=119d13e9e89d815aad8f5419ba01fcbf&oe=5F467601',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/B7dRKKAj8C-/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s750x750/80044605_483731142538658_3468627536520226519_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=102&_nc_ohc=Sk5F4J3J_UYAX9TkSgw&oh=4ea21f40f132560ce231533b9a02c5b6&oe=5F46737A',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/CA8dDkcjyK6/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s750x750/101334968_1700889773411244_3893462734262458346_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=100&_nc_ohc=lpAuZ4Wok_YAX-D2d09&oh=5a299f583e72cf017fe825732e70ae12&oe=5F47A34B',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/B6-ThiUjVZf/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p750x750/81490616_189907705392014_3714647864459814257_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=102&_nc_ohc=_SbHTi5lvIUAX9zJCIr&oh=1a110e9a6c829f4c7e9a57f64fa95358&oe=5F44473C',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/B6aycIkjD6n/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s750x750/75595348_399681780785705_4646075848843934862_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=105&_nc_ohc=DZKMbTTmdDYAX-VUsLz&oh=4da59666ca0b42c6ce3e529f26ffb060&oe=5F472C42',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/B6IFLusjsLN/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/73324457_1831839036960138_5555046497398419492_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=106&_nc_ohc=uSXgDJt7yRsAX_Y1qbI&oh=04abada4aab38886b5006badb6b37861&oe=5F476672',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/B58C9UsDlva/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/74407320_156636975708376_1878535459903123766_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=104&_nc_ohc=zdGgUv_leyIAX9XedU7&oh=e9b5738dc16ca3a204b8751305287514&oe=5F4688E0',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/B5uqjJIDVUZ/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/74594767_145659510179389_6443931067419097484_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=101&_nc_ohc=XXHn95GYYWAAX_ysMd0&oh=4143b900200a9469c62f8a9950d1414b&oe=5F4757E4',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/CA8dDkcjyK6/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s750x750/101334968_1700889773411244_3893462734262458346_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=100&_nc_ohc=lpAuZ4Wok_YAX-D2d09&oh=5a299f583e72cf017fe825732e70ae12&oe=5F47A34B',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/CAv4bOuj1JB/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/e35/101193700_126498639066692_6800170327260554188_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=108&_nc_ohc=HKdl0d0zhqMAX-102N5&oh=77756a6143a20fb409c64f3aa6fc7bcd&oe=5F44D6E8',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/B_SrQN6jwxr/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p640x640/93834537_676278156492828_1864885391560719962_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=100&_nc_ohc=fTPcVmuEVU0AX-jpQ9n&oh=5f8e352da98aaf911cdc4d8dfee42913&oe=5F456C23',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/B_Kj3g4DQOV/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/93715725_1578193185667644_2239666161289094079_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=100&_nc_ohc=KcbnIyyXdmAAX8WDqnw&oh=0ec197af85b1d67409f466afc9e1b267&oe=5F44CF7D',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/B_I2QI2j_Dg/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/94104198_705210923621340_3514689051665867313_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=100&_nc_ohc=P5oiiGC3z40AX9_-5UH&oh=83bbb381c3d9d598d8fbf7a5eb7a908e&oe=5F45B92C',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/CA8dDkcjyK6/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s750x750/101334968_1700889773411244_3893462734262458346_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=100&_nc_ohc=lpAuZ4Wok_YAX-D2d09&oh=5a299f583e72cf017fe825732e70ae12&oe=5F47A34B',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/B-o32wQDIzp/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s750x750/92345034_120475336263957_2165284032695625658_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=109&_nc_ohc=JsRf1t6X5ssAX-RRhhM&oh=0a53d6ab657294a50d43cca393075ad4&oe=5F4406D4',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/B-joTRTjgr4/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p750x750/91733141_583837669008618_6547851728936448683_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=106&_nc_ohc=jejA_a9TGnAAX9Shpk3&oh=827e2be0636d7af8c289b7e1225e6139&oe=5F45BEBA',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/B-egkLfj-Z3/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/91441569_286813265634361_4409825345936101750_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=101&_nc_ohc=BfPnRkCJHiQAX_zBAPf&oh=2fcf1f6b31c54dc75cbc719d675ed32d&oe=5F455B92',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/B-NLSlkDbLv/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/91339360_2567714003549662_6949678741951238700_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=110&_nc_ohc=bdQT8kHU1rgAX_HLv_B&oh=00063be4c2a9c0ffaf5fc16341e70ba3&oe=5F47A9B7',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/B-NKNKQjkzv/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/90520820_147897953222360_6304853410265211548_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=108&_nc_ohc=7Jhoxs30FrMAX8AnN6z&oh=119d13e9e89d815aad8f5419ba01fcbf&oe=5F467601',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/B7dRKKAj8C-/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s750x750/80044605_483731142538658_3468627536520226519_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=102&_nc_ohc=Sk5F4J3J_UYAX9TkSgw&oh=4ea21f40f132560ce231533b9a02c5b6&oe=5F46737A',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/CA8dDkcjyK6/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s750x750/101334968_1700889773411244_3893462734262458346_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=100&_nc_ohc=lpAuZ4Wok_YAX-D2d09&oh=5a299f583e72cf017fe825732e70ae12&oe=5F47A34B',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/B6-ThiUjVZf/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p750x750/81490616_189907705392014_3714647864459814257_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=102&_nc_ohc=_SbHTi5lvIUAX9zJCIr&oh=1a110e9a6c829f4c7e9a57f64fa95358&oe=5F44473C',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/B6aycIkjD6n/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s750x750/75595348_399681780785705_4646075848843934862_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=105&_nc_ohc=DZKMbTTmdDYAX-VUsLz&oh=4da59666ca0b42c6ce3e529f26ffb060&oe=5F472C42',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/B6IFLusjsLN/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/73324457_1831839036960138_5555046497398419492_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=106&_nc_ohc=uSXgDJt7yRsAX_Y1qbI&oh=04abada4aab38886b5006badb6b37861&oe=5F476672',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/B58C9UsDlva/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/74407320_156636975708376_1878535459903123766_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=104&_nc_ohc=zdGgUv_leyIAX9XedU7&oh=e9b5738dc16ca3a204b8751305287514&oe=5F4688E0',
        text: ''
    },
    {
        link: 'https://www.instagram.com/p/B5uqjJIDVUZ/',
        url: 'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/74594767_145659510179389_6443931067419097484_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=101&_nc_ohc=XXHn95GYYWAAX_ysMd0&oh=4143b900200a9469c62f8a9950d1414b&oe=5F4757E4',
        text: ''
    }
]

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
