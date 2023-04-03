import { accountReducer } from './Reducers/Account/index';
import { productReducer } from './Reducers/Product/index';
import { categoryReducer } from './Reducers/Category/index';
import { combineReducers } from 'redux';
import thunk from "redux-thunk";
import { configureStore } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
	categoryReducer, productReducer, accountReducer
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: [thunk],
	devTools: true
});
