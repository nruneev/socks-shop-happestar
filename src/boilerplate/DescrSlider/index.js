import './index.sass'
import React, { useEffect, useState } from 'react';
import { intervalChangeId } from '../../utils/helpers';

const DescrSlider = ({ className, titles, timeout = 3000 }) => {
    let classForSliderName = className || '';
    let [activeId, setActiveId] = useState(0);

    useEffect(() => intervalChangeId(getNextImage(titles), setActiveId, timeout), [titles, timeout]);

    return (
        <div className={'carousel ' + classForSliderName}>
            {titles.map((image, key) => {
                let imgClassName = key === activeId ? 'active' : '';
                return (<div className={'descr-block ' + imgClassName} key={key}><div  className={image.class}/><div className={image.class + '_text'}><p>{image.text}</p></div></div>)})}
        </div>
    )
};


function* getNextImage(titles) {
    let i = 0;
    while (true) {
        i = i >= titles.length - 1 ? 0 : ++i;
        yield i;
    }
}


export { DescrSlider }
