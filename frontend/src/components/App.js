import React from 'react';

import { Route, Switch, useHistory } from 'react-router-dom'

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';

import api from '../utils/api';
import auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

import successImage from '../images/success.svg';
import failImage from '../images/fail.svg';

function App() {
  const history = useHistory();

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const [message, setMessage] = React.useState({ img: '', text: '' });

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const [isEditProfileLoading, setIsEditProfileLoading] = React.useState(false);
  const [isAddPlaceLoading, setIsAddPlaceLoading] = React.useState(false);
  const [isEditAvatarLoading, setIsEditAvatarLoading] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])
  const [selectedCard, setSelectedCard] = React.useState(null);


  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  function resetLoadingStates() {
    setIsAddPlaceLoading(false);
    setIsEditProfileLoading(false);
    setIsEditAvatarLoading(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(userId => userId === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((res) => {
        const newCard = res.data;

        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch((err) => console.log(err));
  }

  function handleUpdateUser(userInfo) {
    setIsEditProfileLoading(true);

    api.updateUserInfo(userInfo)
      .then((res) => {
        setCurrentUser(res.data);
        resetLoadingStates();
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar({ avatar }) {
    setIsEditAvatarLoading(true);

    api.updateUserAvatar(avatar)
      .then((res) => {
        setCurrentUser(res.data);
        resetLoadingStates();
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(placeData) {
    setIsAddPlaceLoading(true);

    api.addCard(placeData)
      .then((res) => {
        const newCard = res.data;

        setCards([newCard, ...cards]);
        resetLoadingStates();
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }


  React.useEffect(() => {
    checkAuth();
  }, []);

  function loadUserData() {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((err) => console.log(err));

    api.getInitialCards()
      .then((res) => {
        setCards(res.data);
      })
      .catch((err) => console.log(err));
  }

  function checkAuth() {
    api.getUserInfo()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(res.data.email);
          loadUserData();

          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
      });
  }

  function onSignOut() {
    auth.logout()
      .then(() => {
        setLoggedIn(false);
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
      });
  }

  function onRegistration(password, email) {
    auth.register(password, email)
      .then(() => {
        setMessage({ img: successImage, text: 'Вы успешно зарегистрировались!' });
        setTimeout(() => onLogin(password, email), 500);
      })
      .catch(() => setMessage({ img: failImage, text: 'Что-то пошло не так! Попробуйте ещё раз.' }))
      .finally(() => setIsInfoTooltipOpen(true));
  }

  function onLogin(password, email) {
    auth.authorize(password, email)
      .then(() => checkAuth())
      .catch(() => {
        setMessage({ img: failImage, text: 'Неверный логин или пароль.' });
        setIsInfoTooltipOpen(true);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          email={email}
          onSignOut={onSignOut}
        />

        <Switch>
          <ProtectedRoute
            exact path='/'
            loggedIn={loggedIn}
            component={Main}
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <Route path='/sign-in'>
            <Register
              isOpen={isEditProfilePopupOpen}
              onRegistration={onRegistration}
              isInfoTooltipOpen={isInfoTooltipOpen}
            />
          </Route>

          <Route path='/sign-up'>
            <Login
              isOpen={isEditProfilePopupOpen}
              onLogin={onLogin}
            />
          </Route>
        </Switch>

        <Footer />

        <InfoTooltip
          name='tooltip'
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          title={message.text}
          img={message.img}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          isLoading={isEditProfileLoading}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          isLoading={isAddPlaceLoading}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          isLoading={isEditAvatarLoading}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={!!selectedCard}
          onClose={closeAllPopups}
        />

        <PopupWithForm
          isOpen={isDeletePlacePopupOpen}
          name="deletePlace"
          title="Вы уверены?"
          submitText="Да"
          onClose={closeAllPopups}
        >
          <input
            name="avatarImageLink"
            type="url"
            className="popup__input"
            id="avatarImageLinkInput"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__input-error avatarImageLinkInput-error"></span>
        </PopupWithForm>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
