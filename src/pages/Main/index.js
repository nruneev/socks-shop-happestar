import './index.sass'
import React from 'react';
import { AttentionBlock } from '../../components/AttentionBlock';
import { ImagesInst } from '../../components/ImagesInst';
import { BannersBlock } from '../../components/BannersBlock';
import {get_attention_photos, get_banners, get_instagram_photos, get_items, get_features, useFetch} from '../../utils/requests';
import {ItemCard} from "../../components/ItemCard";
import {useWindowWidth} from "../../utils/helpers";
import {ItemPreview} from "../../components/ItemPreview";


const MIN_WIDTH = 200;


const Main = () => {
    const attentions = useFetch(get_attention_photos, []);
    let features = useFetch(get_features, []);
    let banners = useFetch(get_banners, []);
    let images = useFetch(get_instagram_photos, []);
    let items = useFetch(get_items, []).filter((el) => el !== null);

    let width = useWindowWidth();
    let count = Math.round(width / MIN_WIDTH);
    let trueWidth = width / count;

    console.log(width);
    console.log(count);

    return (
        <div className='page main'>
            <AttentionBlock attentions={attentions}/>
            <div className='content'>
                <BannersBlock banners={banners}/>
                <div className='items-row'>
                    {items.slice(0, count).map((item, key) =>
                        <ItemPreview width={trueWidth} item={item} key={key} isPreview={true}/>)}
                </div>
                <ImagesInst images={images}/>
            </div>
        </div>
    )
};


export { Main };