import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './modules/reducer';

const enhacers = (window.devToolsExtension ? window.devToolsExtension() : f => f);

export default createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    enhacers,
  ),
);
