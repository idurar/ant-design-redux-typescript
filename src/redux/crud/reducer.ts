import * as actionTypes from "./types"

const INITIAL_STATE: any = {
  current: {
    result: null,
  },
  search: {
    result: { items: [] },
    isLoading: false,
    isSuccess: false,
  },
}

const crudReducer = (
  state = INITIAL_STATE,
  action: { type?: string; payload?: any; keyState: string }
) => {
  const { payload, keyState } = action

  switch (action.type) {
    case actionTypes.RESET_STATE:
      return INITIAL_STATE
    case actionTypes.CURRENT_ITEM:
      return {
        ...state,
        current: {
          result: payload,
        },
      }
    case actionTypes.REQUEST_LOADING:
      return {
        ...state,
        [keyState]: {
          ...state[keyState],
          isLoading: true,
        },
      }
    case actionTypes.REQUEST_FAILED:
      return {
        ...state,
        [keyState]: {
          ...state[keyState],
          isLoading: false,
          isSuccess: false,
        },
      }
    case actionTypes.REQUEST_SUCCESS:
      return {
        ...state,
        [keyState]: {
          result: payload,
          isLoading: false,
          isSuccess: true,
        },
      }
    default:
      return state
  }
}

export default crudReducer
