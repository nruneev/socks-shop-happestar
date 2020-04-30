import React from 'react'
import './index.sass'


const ToggleButtons = ({ buttons, activeId, setActiveId }) => {
    return (
            <div className='toggle-buttons-text'>
                {buttons.map((button, key) => {
                    let spanClassName = key === activeId ? 'active' : '';
                    return (<span className={spanClassName} onClick={() => setActiveId(key)} key={key}>{button}</span>)
                })}
            </div>
        )
};


export { ToggleButtons }
