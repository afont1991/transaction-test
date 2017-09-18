import rootReducer from './root-reducer';
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux';

export default () => {
  return createStore(
    rootReducer,
    undefined,
    compose(
      applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
      ),
    ),
  );
};
