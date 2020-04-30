import './index.sass'
import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi';
import { CartDropdown } from '../../boilerplate/CartDropdown';


const Header = ({ openMenu }) => (
    <header>
        <GiHamburgerMenu className='menu' onClick={openMenu}/>
        <div className='logo'/>
        <CartDropdown className='cart'/>
    </header>
);

function sticky() {
}


export { Header }