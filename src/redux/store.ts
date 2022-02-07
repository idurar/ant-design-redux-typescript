import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from './rootReducer';
import storePersist from './storePersist';

import { INITIAL_STATE } from './github/reducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const logger = createLogger();
let middleware: any[] = [thunk];

let configStore = applyMiddleware(...middleware);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (process.env.NODE_ENV === 'development') {
  middleware = [logger, thunk];
  configStore = composeEnhancers(applyMiddleware(...middleware));
}

const initialState = storePersist.get('favorList')
  ? { github: { ...INITIAL_STATE, favorList: storePersist.get('favorList') } }
  : {};

const store = createStore(rootReducer, initialState, configStore);

export default store;
