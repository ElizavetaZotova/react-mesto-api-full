import React from 'react'

function Login(props) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  function onEmailChange(event) {
    setEmail(event.target.value)
  }

  function onPasswordChange(event) {
    setPassword(event.target.value)
  }

  function onLogin(event) {
    event.preventDefault();

    props.onLogin(password, email);
  }

  return (
    <div className="auth">
      <form className="popup__form auth__form" name="loginForm" onSubmit={onLogin}>
          <h2 className="popup__header auth__header">Вход</h2>

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
            {props.isLoading ? '' : 'Войти'}
          </button>
        </form>
    </div>
  )
}

export default Login;
