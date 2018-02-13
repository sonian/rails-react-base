import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducer';

const loggerMiddleware = createLogger();
const reducers = combineReducers({ todos: reducer });

export default function configureStore(preloadedState) {
  return createStore(
    reducers,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
    ),
  );
}
