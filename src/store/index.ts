import { categoryReducer } from './Reducers/Category/index';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
	categoryReducer
});

export const store = createStore(rootReducer,
	composeWithDevTools(applyMiddleware(thunk)));