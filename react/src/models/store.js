import { combineReducers, createStore, applyMiddleware } from 'redux';
import { loadTransactions } from './actions';
import { balance, name, transactions, phone, loggedIn } from './reducers';
import thunk from 'redux-thunk';

export const store = createStore(combineReducers({
    balance,
    name,
    phone,
    transactions,
    loggedIn
}), applyMiddleware(thunk));

store.dispatch(loadTransactions());