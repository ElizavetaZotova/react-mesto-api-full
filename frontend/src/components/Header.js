import { Link, useLocation } from 'react-router-dom';

function Header({ loggedIn, email, onSignOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__logo"></div>

      {
        loggedIn ?
        (
          <div className='header__info'>
            <p className='header__email'>{email}</p>

            <Link
              to='sign-up'
              className={`header__link ${loggedIn && 'header__link_active'}`}
              onClick={onSignOut}
            >Выйти</Link>
          </div>
        ) :
        (<>
          {
            location.pathname === '/sign-up' ?
              <Link className='header__link' to='/sign-in'>Регистрация</Link> :
              <Link className='header__link' to='/sign-up'>Войти</Link>
          }
        </>)
      }
    </header>
  )
}

export default Header;
