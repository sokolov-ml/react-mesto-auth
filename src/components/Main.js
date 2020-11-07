import React from 'react';
import Card from './Card';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import imgEdit from '../images/profile__edit.svg';
import imgAdd from '../images/profile__add.svg';

export default function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardRemove,
  children,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <section className='profile'>
        <div className='profile__photo-overlay' onClick={onEditAvatar}>
          <img src={currentUser.avatar} alt='Фото профиля' className='profile__photo' />
        </div>
        <div className='profile__info'>
          <div className='profile__title'>
            <h1 className='profile__name'>{currentUser.name}</h1>
            <button className='profile__edit-btn' onClick={onEditProfile}>
              <img src={imgEdit} alt='Редактировать' className='profile__edit-img' />
            </button>
          </div>
          <p className='profile__status'>{currentUser.about}</p>
        </div>
        <button className='profile__add-btn' onClick={onAddPlace}>
          <img src={imgAdd} alt='Добавить' className='profile__add-img' />
        </button>
      </section>
      <ul className='elements'>
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardRemove={onCardRemove}
          />
        ))}
      </ul>
      {children}
    </>
  );
}
