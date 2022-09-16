import {
  baseUrl,
  authorizationToken,
} from './constants';
import BaseApi from './base-api';

class Api extends BaseApi {
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    }).then(this._checkResponse);
  }

  addCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(card),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this._likeCard(cardId);
    }

    return this._unlikeCard(cardId);
  }

  _likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes `, {
      headers: this._headers,
      method: 'PUT',
    }).then(this._checkResponse);
  }

  _unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes `, {
      headers: this._headers,
      method: 'DELETE',
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me `, {
      headers: this._headers
    }).then(this._checkResponse);
  }

  updateUserInfo(info) {
    return fetch(`${this._baseUrl}/users/me `, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(info),
    }).then(this._checkResponse);
  }

  updateUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar `, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl,
  headers: {
    authorization: authorizationToken,
    'Content-Type': 'application/json'
  }
});

export default api;
