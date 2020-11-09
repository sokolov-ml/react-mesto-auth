import React from 'react';

import { Route, Switch, Link, useLocation, useHistory } from 'react-router-dom';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function Header(props) {
  const currentUser = React.useContext(CurrentUserContext);

  let history = useHistory();
  let location = useLocation();

  let button = {};

  return (
    <header className='header' onClick={() => console.log(localStorage.token)}>
      <img src={props.logo} alt='Логотип' className='header__logo' />
      <div className='header__menu'>
        <Route exact path='/'>
          <p className='header__current-email'>{currentUser.name}</p>
        </Route>
        <Switch>
          <Route path='/sign-in'>
            <Link className='header__link' to='/sign-up'>
              Регистрация
            </Link>
          </Route>
          <Route path='/sign-up'>
            <Link className='header__link' to='/sign-in'>
              Вход
            </Link>
          </Route>
          <Route exact path='/'>
            <button type='button' className='header__link header__link_logoff'>
              Выйти
            </button>
          </Route>
        </Switch>
      </div>
    </header>
  );
}
