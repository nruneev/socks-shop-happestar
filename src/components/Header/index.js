import './index.sass'
import React from 'react'
    import { GiHamburgerMenu } from 'react-icons/gi';
import { CartDropdown } from '../../boilerplate/CartDropdown';


const Header = ({ openMenu }) => (
    <div>
        <header className='mobileHeader'>
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
        <header className='desktopHeader'>
            <div className='headerDesktop'>
                <a className='titleHeader' href='/'>
                    <h1>Happestar</h1>
                    <p>Делаем, как для себя</p>
                </a>
                <div className='subHeader'>
                    <div className='contactBlock'>
                        <p>
                        <span>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="phone-alt" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                 className="svg-inline--fa fa-phone-alt fa-w-16 fa-9x"><path fill="currentColor"
                                                                                             d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"
                                                                                             className=""></path></svg>
                        </span>
                            +7 911 781 31 00
                        </p>
                        <p>
                        <span>
                            <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="envelope-open"
                                 role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                 className="svg-inline--fa fa-envelope-open fa-w-16 fa-9x"><path fill="currentColor"
                                                                                                 d="M349.32 52.26C328.278 35.495 292.938 0 256 0c-36.665 0-71.446 34.769-93.31 52.26-34.586 27.455-109.525 87.898-145.097 117.015A47.99 47.99 0 0 0 0 206.416V464c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V206.413a47.989 47.989 0 0 0-17.597-37.144C458.832 140.157 383.906 79.715 349.32 52.26zM464 480H48c-8.837 0-16-7.163-16-16V206.161c0-4.806 2.155-9.353 5.878-12.392C64.16 172.315 159.658 95.526 182.59 77.32 200.211 63.27 232.317 32 256 32c23.686 0 55.789 31.27 73.41 45.32 22.932 18.207 118.436 95.008 144.714 116.468a15.99 15.99 0 0 1 5.876 12.39V464c0 8.837-7.163 16-16 16zm-8.753-216.312c4.189 5.156 3.393 12.732-1.776 16.905-22.827 18.426-55.135 44.236-104.156 83.148-21.045 16.8-56.871 52.518-93.318 52.258-36.58.264-72.826-35.908-93.318-52.263-49.015-38.908-81.321-64.716-104.149-83.143-5.169-4.173-5.966-11.749-1.776-16.905l5.047-6.212c4.169-5.131 11.704-5.925 16.848-1.772 22.763 18.376 55.014 44.143 103.938 82.978 16.85 13.437 50.201 45.69 73.413 45.315 23.219.371 56.562-31.877 73.413-45.315 48.929-38.839 81.178-64.605 103.938-82.978 5.145-4.153 12.679-3.359 16.848 1.772l5.048 6.212z"
                                                                                                 className=""></path></svg>
                        </span>
                            Happestar@mail.ru
                        </p>
                    </div>
                    <CartDropdown className='cart'/>
                </div>
            </div>
            <div className='linkHeader'>
                <a href='/catalog'>Каталог</a>
                <a href='/pack'>Собери свой набор</a>
                <a href='/new'>Тренд</a>
                <a href='/sale'>Аутлет</a>
                <a href='/customer'>Оплата и доставка</a>
                <a href='/history'>Кто мы</a>
                <a href='/contacts'>Контакты</a>
            </div>
        </header>
    </div>
);

export { Header }
