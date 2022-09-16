import React from 'react';

import Card from './Card';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext)

  function handleCardClick(card) {
    props.onCardClick(card);
  }

  function handleCardLike(card) {
    props.onCardLike(card);
  }

  function handleCardDelete(card) {
    props.onCardDelete(card);
  }

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <img src={currentUser.avatar} alt="Изображение профиля" className="profile__avatar" />
          <div className="profile__avatar-edit-button" onClick={props.onEditAvatar}></div>
        </div>

        <div className="profile__info">
          <div className="profile__name-block">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" onClick={props.onEditProfile} className="profile__edit-button"></button>
          </div>
          <h2 className="profile__discription">{currentUser.about}</h2>
        </div>

        <button type="button" onClick={props.onAddPlace} className="profile__add-button"></button>
      </section>

      <section className="elements">
        <ul className="elements__container">

          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          ))}

        </ul>
      </section>
    </main>
  )
}

export default Main;
