import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  function onEmailChange(event) {
    setEmail(event.target.value)
  }

  function onPasswordChange(event) {
    setPassword(event.target.value)
  }

  function onRegistration(event) {
    event.preventDefault();

    props.onRegistration(password, email);
  }

  return (
    <div className="auth">
      <form className="popup__form auth__form" name="loginForm" onSubmit={onRegistration}>
          <h2 className="popup__header auth__header">Регистрация</h2>

          <input
            name="Email"
            type="email"
            className="popup__input auth__input"
            id="email"
            placeholder="Email"
            minLength="6"
            maxLength="40"
            required
            value={email || ''}
            onChange={onEmailChange}
          />

          <input
            name="Password"
            type="password"
            className="popup__input auth__input"
            id="password"
            placeholder="Пароль"
            minLength="6"
            maxLength="40"
            required
            value={password || ''}
            onChange={onPasswordChange}
          />

          <button type="submit" className="auth__button">
            {props.isLoading ? '' : 'Зарегистрироваться'}
          </button>

          <Link className='auth__link' to='/sign-up'>Уже зарегистрированы? Войти</Link>
        </form>
    </div>
  )
}

export default Register;
