// import Login from './Platform/Login/Reducer';
import App from './App/Reducer'

import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  App,
});

export default rootReducer;
