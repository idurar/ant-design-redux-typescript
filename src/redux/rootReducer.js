import { combineReducers } from "redux"

import { reducer as githubReducer } from "./github"

// Combine all reducers.

const appReducer = combineReducers({
  github: githubReducer,
})

const rootReducer = (state, action) => {
  // if (action.type === actionTypes.LOGOUT_SUCCESS) {
  //   state = undefined
  // }
  return appReducer(state, action)
}

export default rootReducer
