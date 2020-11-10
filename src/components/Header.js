import React from 'react';

import { Route, Switch, Link, useLocation, useHistory } from 'react-router-dom';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function Header(props) {
  const currentUser = React.useContext(CurrentUserContext);

  let history = useHistory();
  let location = useLocation();

  let button = {};

  return (
    <header className='header'>
      <img
        src={props.logo}
        alt='Логотип'
        className='header__logo'
        onClick={() => console.log(currentUser)}
      />
      <div className='header__menu'>
        <Route exact path='/'>
          <p className='header__current-email'>{currentUser.auth.email}</p>
        </Route>
        <Switch>
          <Route path='/signin'>
            <Link className='header__link' to='/signup'>
              Регистрация
            </Link>
          </Route>
          <Route path='/signup'>
            <Link className='header__link' to='/signin'>
              Вход
            </Link>
          </Route>
          <Route exact path='/'>
            <button
              type='button'
              className='header__link header__link_logoff'
              onClick={props.onLogoff}
            >
              Выйти
            </button>
          </Route>
        </Switch>
      </div>
    </header>
  );
}
