import './index.sass'
import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi';
import { CartDropdown } from '../../boilerplate/CartDropdown';


const Header = ({ openMenu }) => (
    <header>
        <div className='menu' onClick={openMenu}>
            <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="bars" role="img"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                 className="svg-inline--fa fa-bars fa-w-14 fa-9x">
                <path fill="currentColor"
                      d="M442 114H6a6 6 0 0 1-6-6V84a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6z"
                      className=""></path>
            </svg>
        </div>
        <a href='/'><div className='logo'/></a>
        <CartDropdown className='cart'/>
    </header>
);

export { Header }
