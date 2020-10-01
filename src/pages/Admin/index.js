import './index.sass'
import React, {useState} from 'react';

const Admins = () => {

    if (sessionStorage.getItem('loginAdmin') === 'ok') {
        document.location.href = "/admin/oder";
    }

    let [loginData, setLoginData] = useState({
        login: '',
        password: ''
    })

    const validForm = () => {
      if (loginData.login === 'admin' && loginData.password === 'FlappersPeppers') {
          sessionStorage.setItem('loginAdmin', 'ok');
          document.location.href = "/admin/oder";
      } else {
          alert('Неверный Логин/Пароль');
      }
    };

    return (
        <div className={'wrapper adminFlex'}>
            <div className={'adminBlock_login'}>
                <h1>Вход в панель администратора</h1>
                <div className={'login-input'}>
                    <p>Логин</p>
                    <input placeholder={'Логин'} type={'text'} onChange={(e) => setLoginData({
                        ...loginData,
                        login: e.target.value
                    })}/>
                </div>
                <div className={'login-input'}>
                    <p>Пароль</p>
                    <input placeholder={'Пароль'} type={'password'} onChange={(e) => setLoginData({
                        ...loginData,
                        password: e.target.value
                    })}/>
                </div>
                <div className={'login-btn'} onClick={() => validForm()}>
                    <p>Вход</p>
                </div>
            </div>
        </div>
    )
}

export { Admins }
