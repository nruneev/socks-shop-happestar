import './app.sass'
import React, { useState, useEffect } from 'react'
import { CartContext } from './utils/contexts';
import { Header } from './components/Header'
import { Main } from './pages/Main';
import { Catalog } from './pages/Catalog';
import { Footer } from './components/Footer';
import { BurgerMenu } from './components/BurgerMenu';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import {Pack} from "./pages/Pack";
import {PayAndDelivery} from "./pages/PayAndDelivery";
import {BrandHistory} from "./pages/BrandHistory";
import {Production} from "./pages/Production";
import {Packaging} from "./pages/Packaging";
import {Partner} from "./pages/Partner";
import {Contacts} from "./pages/Contacts";


const cartItemField = 'cartItems';


const App = () => {
    let cartItemsSaved = JSON.parse(localStorage.getItem(cartItemField)) || [];
    let [cartItems, setItemsCart] = useState(cartItemsSaved);

    const removeItem = (id) => setItemsCart(cartItems.filter((el) => el.id !== id));

    const setItem = (item, count) => {
        let cartItem, index;
        for(let i = 0; i < cartItems.length; i++) {
            let el = cartItems[i];
            if(el.id === item.id) {
                cartItem = el;
                index = i;
                break;
            }
        }

        if (count < 1) {
            setItemsCart([...cartItems.slice(0, index), ...cartItems.slice(index + 1, cartItems.length)]);
            return;
        }

        if(cartItem) {
            cartItem.count = count;
            setItemsCart([...cartItems.slice(0, index), cartItem, ...cartItems.slice(index + 1, cartItems.length)]);
        }
        else {
            cartItem = {...item, count: 1};
            setItemsCart([...cartItems, cartItem]);
        }
    };

    let [isOpened, setIsOpen] = useState(false);

    useEffect(() => {
        changeScrollAbility(isOpened);
        localStorage.setItem(cartItemField, JSON.stringify(cartItems))
    });

    return (
        <CartContext.Provider value={{ cartItems, setItem: setItem, removeItem }}>
            <div className='app' id='app'>
                    <Router>
                        <BurgerMenu isOpen={isOpened} closeMenu={() => setIsOpen(false)}/>
                        <div id='rest'>
                            <Header openMenu={() => setIsOpen(true)}/>
                            <Route path='/' exact>
                                <Main/>
                            </Route>
                            <Route path='/happestar' exact>
                                <Main/>
                            </Route>
                            <Route path='/catalog'>
                                <Catalog/>
                            </Route>
                            <Route path='/pack'>
                                <Pack/>
                            </Route>
                            <Route path='/partner'>
                                <Partner/>
                            </Route>
                            <Route path='/pay-and-delivery'>
                                <PayAndDelivery/>
                            </Route>
                            <Route path='/brand-history'>
                                <BrandHistory/>
                            </Route>
                            <Route path='/production'>
                                <Production/>
                            </Route>
                            <Route path='/packaging'>
                                <Packaging/>
                            </Route>
                            <Route path='/contacts'>
                                <Contacts/>
                            </Route>
                            <Footer/>
                        </div>
                    </Router>
            </div>
        </CartContext.Provider>
    )
};


function changeScrollAbility(isMenuOpened) {
    document.body.style.overflow = isMenuOpened ? 'hidden' : null;
}


export default App
