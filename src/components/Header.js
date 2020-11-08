import React from 'react';

import { Route, Switch, useLocation, useHistory } from 'react-router-dom';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function Header(props) {
  const currentUser = React.useContext(CurrentUserContext);

  let history = useHistory();
  let location = useLocation();

  let button = {};

  return (
    <header className='header'>
      <img src={props.logo} alt='Логотип' className='header__logo' />
      <div className='header__menu'>
        <Route exact path='/'>
          <p className='header__current-email'>{currentUser.name}</p>
        </Route>
        <Switch>
          <Route path='/sign-in'>
            <button type='button' className='header__button'>
              Регистрация
            </button>
          </Route>
          <Route path='/sign-up'>
            <button type='button' className='header__button'>
              Войти
            </button>
          </Route>
          <Route exact path='/'>
            <button type='button' className='header__button header__button_logoff'>
              Выйти
            </button>
          </Route>
        </Switch>
      </div>
    </header>
  );
}
