import React from 'react';

function Register(props) {
  const [isLoading, setIsLoading] = React.useState(false);

  const [inputValues, setInputValues] = React.useState({
    email: { value: '', validationMessage: true },
    password: { value: '', validationMessage: true },
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

  return (
    <section className='auth'>
      <form className='auth__form auth__form_login' name='login' onSubmit={props.onSubmit}>
        <h2 className='auth__heading'>Регистрация</h2>
        <label htmlFor='input-login-email' className='auth__field'>
          <input
            type='email'
            name='email'
            id='input-login-email'
            className='auth__input auth__input_field_email'
            required
            value={inputValues.email.value}
            onChange={handleInputChange}
            placeholder='Email'
          />
          <span className='auth__input-error' id='input-login-email-error'>
            {inputValues.email.validationMessage}
          </span>
        </label>
        <label htmlFor='input-login-password' className='auth__field'>
          <input
            type='password'
            name='password'
            id='input-login-password'
            className='auth__input auth__input_field_password'
            required
            minLength='2'
            maxLength='200'
            value={inputValues.password.value}
            onChange={handleInputChange}
            placeholder='Пароль'
          />
          <span className='auth__input-error' id='input-login-password-error'>
            {inputValues.password.validationMessage}
          </span>
        </label>
        <button type='submit' className='auth__submit' disabled={!inputValues.isFormValid}>
          {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
        <p className='auth__link'>Уже зарегистрированы? Войти</p>
      </form>
    </section>
  );
}

export default Register;
