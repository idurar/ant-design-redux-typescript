import { combineReducers } from 'redux';

import { reducer as githubReducer } from './github';

// Combine all reducers.

const rootReducer = combineReducers({
  github: githubReducer,
});

export default rootReducer;
