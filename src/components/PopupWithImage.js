import React from 'react';
import Popup from './Popup';

export default function PopupWithImage(props) {
  return (
    <Popup isOpen={props.isOpen} onClose={props.onClose}>
      <figure className='popup__figure'>
        <img
          src={props.card ? props.card.link : '#'}
          alt={props.card ? props.card.name : ''}
          className='popup__image'
        />
        <figcaption className='popup__caption'>{props.card ? props.card.name : ''}</figcaption>
      </figure>
    </Popup>
  );
}
