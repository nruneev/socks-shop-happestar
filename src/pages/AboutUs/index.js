import './index.sass'
import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import {get_history_photos, getTextForHistoryBrand, useFetch} from "../../utils/requests";

const AboutUs = () => {
    let history = useHistory();
    let [prelo, setPreloads] = useState(false);
    const attentions = useFetch(get_history_photos, '');
    if (attentions !== '' && !prelo) {
        setPreloads(true);
    }
    let text = useFetch(getTextForHistoryBrand, '');
    return (
        <div className='wrapper'>
            <div className='linker'>
                <ul>
                    <li><a href={'./'}>Главная</a></li>
                    <li><a onClick={() => history.goBack()}>Назад</a></li>
                </ul>
                <h1>История Бренда</h1>
            </div>

            <img src={attentions}/>
            <p dangerouslySetInnerHTML={{__html: text}}/>
        </div>
    )
};


export { AboutUs };
