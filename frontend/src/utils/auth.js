import { authBaseUrl } from './constants';
import BaseApi from './base-api';

class AuthApi extends BaseApi {
  register(password, email) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({password, email}),
    })
    .then(this._checkResponse);
  }

  authorize(password, email) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({password, email}),
    })
    .then(this._checkResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);

        return data.token;
      }
    })
  }

  getUserByToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        ...this._headers,
      }
    })
    .then(this._checkResponse);
  }
}

const api = new AuthApi({
  baseUrl: authBaseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
