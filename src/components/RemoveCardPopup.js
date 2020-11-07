import React from 'react';

import PopupWithForm from './PopupWithForm';

function RemoveCardPopup(props) {
  const [isLoading, setIsLoading] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    props.onDeleteCard(setIsLoading);
  }

  return (
    <PopupWithForm title='Вы уверены?' name='remove-card' {...props} onSubmit={handleSubmit}>
      <button type='submit' className='popup__save'>
        {isLoading ? 'Удаление...' : 'Да'}
      </button>
    </PopupWithForm>
  );
}

export default RemoveCardPopup;
