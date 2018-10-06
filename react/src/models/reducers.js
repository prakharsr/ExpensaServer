import * as actionTypes from './action-types';

export const balance = (state = 0, action) => {
  switch (action.type) {
    case actionTypes.INR_BALANCE:
      return state + action.amount;
    case actionTypes.DCR_BALANCE:
      return state - action.amount;
    case actionTypes.SET_BALANCE:
      return action.amount;
    default:
      return state;
  }
}

export const name = (state = "Anonymous", action) => {
  switch (action.type) {
    case actionTypes.SET_NAME:
      return action.name;
    default:
      return state;
  }
}

export const phone = (state = 0, action) => {
  switch (action.type) {
    case actionTypes.SET_PHONE:
      return action.phone;
    default:
      return state;
  }
}

export const transactions = (state = [], action) => {
  switch (action.type) {
    case actionTypes.LOAD_TRANSACTIONS_SUCCESS:
      return action.transactions;
    default:
      return state;
  }
}