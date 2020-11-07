import React from 'react';

import PopupWithForm from './PopupWithForm';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  // const [name, setName] = React.useState('');
  // const [description, setDescription] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const [inputValues, setInputValues] = React.useState({
    name: { value: '', validationMessage: true },
    about: { value: '', validationMessage: true },
    isFormValid: false,
  });

  React.useEffect(() => {
    // setName(currentUser.name);
    // setDescription(currentUser.about);

    setInputValues({
      ...inputValues,
      name: {
        value: currentUser.name,
        validationMessage: '',
        isValid: true,
      },
      about: {
        value: currentUser.about,
        validationMessage: '',
        isValid: true,
      },
      isFormValid: true,
    });
  }, [currentUser]);

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

    props.onUpdateUser(
      {
        name: inputValues.name.value,
        about: inputValues.about.value,
      },
      setIsLoading
    );
  }

  return (
    <PopupWithForm title='Редактировать профиль' name='edit-profile' {...props} onSubmit={handleSubmit}>
      <label htmlFor='input-profile-name' className='popup__field'>
        <input
          type='text'
          name='name'
          id='input-profile-name'
          className='popup__input popup__input_field_name'
          required
          minLength='2'
          maxLength='40'
          value={inputValues.name.value}
          onChange={handleInputChange}
        />
        <span className='popup__input-error' id='input-profile-name-error'>
          {inputValues.name.validationMessage}
        </span>
      </label>
      <label htmlFor='input-profile-about' className='popup__field'>
        <input
          type='text'
          name='about'
          id='input-profile-about'
          className='popup__input popup__input_field_about'
          required
          minLength='2'
          maxLength='200'
          value={inputValues.about.value}
          onChange={handleInputChange}
        />
        <span className='popup__input-error' id='input-profile-about-error'>
          {inputValues.about.validationMessage}
        </span>
      </label>
      <button type='submit' className='popup__save' disabled={!inputValues.isFormValid}>
        {isLoading ? 'Сохранение...' : 'Сохранить'}
      </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
