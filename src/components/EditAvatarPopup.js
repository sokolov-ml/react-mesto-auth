import React from 'react';
import PopupWithForm from './PopupWithForm';

// import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditAvatarPopup({ onUpdateAvatar, ...props }) {
  // const currentUser = React.useContext(CurrentUserContext);

  const inputAvatar = React.useRef();
  const [isLoading, setIsLoading] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(
      {
        avatar: inputAvatar.current.value,
      },
      setIsLoading
    );
  }

  return (
    <PopupWithForm title='Обновить аватар' name='update-avatar' {...props} onSubmit={handleSubmit}>
      <label htmlFor='input-update-avatar' className='popup__field'>
        <input
          ref={inputAvatar}
          type='url'
          name='avatar'
          id='input-update-avatar'
          placeholder='Ссылка на картинку'
          className='popup__input popup__input_field_avatar'
          required
        />
        <span className='popup__input-error' id='input-update-avatar-error'>
          {inputAvatar.current && inputAvatar.current.validationMessage}
        </span>
      </label>
      <button type='submit' className='popup__save'>
        {isLoading ? 'Сохранение...' : 'Сохранить'}
      </button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
