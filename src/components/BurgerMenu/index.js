import './index.sass'
import { stack as Menu } from 'react-burger-menu'
import React from 'react'
import { FaBuffer, FaRegHandshake, FaHome } from 'react-icons/fa';
import { FiPackage }  from 'react-icons/fi';
import { MdPayment, MdHistory } from 'react-icons/md';
import { GiFactory } from 'react-icons/gi';
import { GoPackage } from 'react-icons/go';
import { IoMdContacts, IoMdClose } from 'react-icons/io';
import { Link } from 'react-router-dom';


const BurgerMenu = ({ isOpen, closeMenu }) => {
    const closeAllMenusOnEsc = (e) => {
        e = e || window.event;

        if (e.key === 'Escape' || e.keyCode === 27) {
            closeMenu();
        }
    };

    return(
        <Menu isOpen={isOpen} width={ 380 } customOnKeyDown={closeAllMenusOnEsc}
              disableOverlayClick={closeMenu} className='burger-menu'
              pageWrapId={'rest'} outerContainerId={'app'}>
            <IoMdClose className='cross' onClick={closeMenu}/>
            <Link className='menu-item' to='/happestar' onClick={closeMenu}><FaHome/>Главная</Link>
            <Link className='menu-item' to='/catalog' onClick={closeMenu}><FaBuffer/>Весь каталог</Link>
            <Link className='menu-item' to='/pack' onClick={closeMenu}><FiPackage/>Собрать свой набор</Link>
            <Link className='menu-item' to='/partner' onClick={closeMenu}><FaRegHandshake/>Стать партнером</Link>
            <Link className='menu-item' to='/pay-and-delivery' onClick={closeMenu}><MdPayment/>Оплата и доставка</Link>
            <Link className='menu-item' to='/contacts' onClick={closeMenu}><IoMdContacts/>Контакты</Link>
        </Menu>
    )
};


export { BurgerMenu }
