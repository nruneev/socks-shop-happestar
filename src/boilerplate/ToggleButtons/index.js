import React from 'react'


const ToggleButtons = ({ images, activeId = 0, setActiveId }) => {
    return (
            <div className='toggle-buttons'>
                {images.map((image, key) => {
                    let spanClassName = key === activeId ? 'active' : '';
                    return (<span className={spanClassName} onClick={() => setActiveId(key)} key={key}>-</span>)
                })}
            </div>
        )
};


export { ToggleButtons }
