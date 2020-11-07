import React from 'react';
import Popup from './Popup';

export default function PopupWithForm(props) {
  return (
    <Popup isOpen={props.isOpen} onClose={props.onClose}>
      <form className='popup__form popup__form_edit-profile' name='edit-profile' onSubmit={props.onSubmit}>
        <h2 className='popup__heading'>{props.title}</h2>
        {props.children}
      </form>
    </Popup>
  );
}
