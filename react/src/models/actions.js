import Api from './api';
import * as actionTypes from './action-types';

export const inrBalance = amount => ({ type: actionTypes.INR_BALANCE, amount });

export const dcrBalance = amount => ({ type: actionTypes.DCR_BALANCE, amount });

export const setBalance = amount => ({ type: actionTypes.SET_BALANCE, amount });

export const setName = name => ({ type: actionTypes.SET_NAME, name });

export const setPhone = phone => ({ type: actionTypes.SET_PHONE, phone });

export const loadTransactionsSuccess = transactions => ({
  type: actionTypes.LOAD_TRANSACTIONS_SUCCESS,
  transactions
});

export function loadTransactions() {
  return function(dispatch) {
    return Api.getAllTransactions()
      .then(transactions => dispatch(loadTransactionsSuccess(transactions)))
      .catch(err => {
        throw(err);
      });
  }
}

export const setLoggedIn = loggedIn => ({ type: actionTypes.SET_LOGGEDIN, loggedIn });