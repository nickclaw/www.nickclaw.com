import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux'

const reducer = combineReducers({
  routing: routerReducer,
});

export default (state, history) => {
  const middleware = [
    thunk,
    routerMiddleware(history),
  ];

  if (process.env.NODE_ENV !== 'production' && typeof window !== "undefined") {
    middleware.push(createLogger());
  }

  return applyMiddleware(...middleware)(createStore)(reducer, state);
}
