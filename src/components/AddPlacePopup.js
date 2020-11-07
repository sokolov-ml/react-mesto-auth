import React from 'react';

import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [inputValues, setInputValues] = React.useState({
    location: { value: '', validationMessage: true },
    image: { value: '', validationMessage: true },
    isFormValid: false,
  });

  const handleInputChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: {
        value: e.target.value,
        validationMessage: e.target.validationMessage,
        isValid: !e.target.validationMessage,
      },
      isFormValid:
        !e.target.validationMessage &&
        !Object.keys(inputValues).some((key) => {
          if (key !== e.target.name && key !== 'isFormValid') {
            return inputValues[key].validationMessage;
          }
          return false;
        }),
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace(
      {
        name: inputValues.location.value,
        link: inputValues.image.value,
      },
      setIsLoading
    );
  }

  return (
    <PopupWithForm title='Новое место' name='add-card' {...props} onSubmit={handleSubmit}>
      <label htmlFor='input-addcard-location' className='popup__field'>
        <input
          type='text'
          name='location'
          id='input-addcard-location'
          placeholder='Название'
          className='popup__input popup__input_field_location'
          required
          minLength='1'
          maxLength='30'
          value={inputValues.location.value}
          onChange={handleInputChange}
        />
        <span className='popup__input-error' id='input-addcard-location-error'>
          {inputValues.location.validationMessage}
        </span>
      </label>
      <label htmlFor='input-addcard-image' className='popup__field'>
        <input
          type='url'
          name='image'
          id='input-addcard-image'
          placeholder='Ссылка на картинку'
          className='popup__input popup__input_field_image'
          value={inputValues.image.value}
          onChange={handleInputChange}
          required
        />
        <span className='popup__input-error' id='input-addcard-image-error'>
          {inputValues.image.validationMessage}
        </span>
      </label>
      <button type='submit' className='popup__save' disabled={!inputValues.isFormValid}>
        {isLoading ? 'Создание...' : 'Создать'}
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
