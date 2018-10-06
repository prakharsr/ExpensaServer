import { apiUrl } from './config';

const authTokenKey = 'auth_token';

export class ApiService {
  static get authToken() {
    return localStorage.getItem(authTokenKey);
  }

  static set authToken(authToken) {
    localStorage.setItem(authTokenKey, authToken);
  }

  static logout() {
    localStorage.removeItem(authTokenKey);
  }

  static get(url) {
    return fetch(apiUrl + url, {
      headers: {
        Authorization: this.authToken
      }
    }).then(res => res.json())
      .catch(err => console.log(err));
  }

  static post(url, data = {}) {
    return fetch(apiUrl + url, {
      method: 'POST',
      body: data,
      headers: {
        Authorization: this.authToken
      }
    }).then(res => res.json())
      .catch(err => console.log(err));
  }
}

export class Api {
  static getAllTransactions() {
    return ApiService.get('/transactions');
  }
}

export default Api;