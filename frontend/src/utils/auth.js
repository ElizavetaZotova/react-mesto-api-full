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
      credentials: 'include',
    })
    .then(this._checkResponse)
    .then((res) => {
      return res.data;
    })
  }

  logout() {
    return fetch(`${this._baseUrl}/signout`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
    .then(this._checkResponse)
    .then((res) => {
      return res.data;
    })
  }
}

const api = new AuthApi({
  baseUrl: authBaseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
