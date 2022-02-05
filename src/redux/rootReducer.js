import { combineReducers } from "redux"

import { reducer as crudReducer } from "./crud"

// Combine all reducers.

const appReducer = combineReducers({
  crud: crudReducer,
})

const rootReducer = (state, action) => {
  // if (action.type === actionTypes.LOGOUT_SUCCESS) {
  //   state = undefined
  // }
  return appReducer(state, action)
}

export default rootReducer
