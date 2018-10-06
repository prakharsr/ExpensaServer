import { combineReducers, createStore, applyMiddleware } from 'redux';
import { loadTransactions } from './actions';
import { balance, name, transactions, phone } from './reducers';
import thunk from 'redux-thunk';

export const store = createStore(combineReducers({
    balance,
    name,
    phone,
    transactions
}), applyMiddleware(thunk));

store.dispatch(loadTransactions());