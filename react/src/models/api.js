import { apiUrl } from './config';

export class Api {
  static getAllTransactions() {
    return fetch(apiUrl + '/transactions')
      .then(res => res.json())
      .catch(err => err);
  }
}

export default Api;