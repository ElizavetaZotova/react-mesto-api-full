import React from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = (
    `elements__button-remove ${isOwn ? 'elements__button-remove_visible' : 'elements__button-remove_hidden'}`
  );

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__button-like ${isLiked ? 'elements__button-like_active' : ''}`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <li className="elements__item">
      <img
        className="elements__item-image"
        alt={card.name}
        src={card.link}
        onClick={handleClick}
      />
      <button type="button" className={cardDeleteButtonClassName} onClick={handleCardDelete}></button>
      <div className="elements__title-wrapper">
        <h2 className="elements__title">{card.name}</h2>

        <div className="elements__like-container">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <span className="elements__like-counter">{card ? card.likes.length : 0}</span>
        </div>
      </div>
    </li>
  )
}

export default Card;
