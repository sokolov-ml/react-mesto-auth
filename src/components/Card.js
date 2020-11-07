import React from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function Card({ card, onCardClick, onCardLike, onCardRemove }) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <li className='elements__element'>
      <img src={card.link} alt={card.name} className='elements__image' onClick={handleClick} />
      {card.owner._id === currentUser._id ? (
        <button className='elements__remove' onClick={() => onCardRemove(card)}></button>
      ) : (
        ''
      )}
      <div className='elements__caption'>
        <p className='elements__title'>{card.name}</p>
        <div className='elements__like'>
          <button
            className={`elements__like-button ${
              card.likes.some((item) => item._id === currentUser._id) ? 'elements__like-button_active' : ''
            }`}
            onClick={handleLikeClick}
            title={card.likes.map((user) => user.name).join(', ')}
          ></button>
          <p className='elements__like-counter'>{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}
