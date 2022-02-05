import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { createLogger } from "redux-logger"

import rootReducer from "./rootReducer"
import storePersist from "./storePersist"

const logger = createLogger()
let middleware = [thunk]

let configStore = applyMiddleware(...middleware)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

if (process.env.NODE_ENV === "development") {
  middleware = [logger, thunk]
  configStore = composeEnhancers(applyMiddleware(...middleware))
}

const initialState = storePersist.get("crud")
  ? { crud: storePersist.get("crud") }
  : {}

const store = createStore(rootReducer, initialState, configStore)

export default store
