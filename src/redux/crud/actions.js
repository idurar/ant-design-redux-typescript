import * as actionTypes from "./types"
import { request } from "@/request"

export const crud = {
  currentItem:
    ({ data }) =>
    async (dispatch) => {
      dispatch({
        type: actionTypes.CURRENT_ITEM,
        payload: { ...data },
      })
    },
  search:
    ({ entity, options = {} }) =>
    async (dispatch) => {
      dispatch({
        type: actionTypes.REQUEST_LOADING,
        keyState: "search",
        payload: null,
      })

      let data = await request.search({ entity, options })

      if (data.success === true) {
        dispatch({
          type: actionTypes.REQUEST_SUCCESS,
          keyState: "search",
          payload: { items: data.result.items },
        })
      } else {
        dispatch({
          type: actionTypes.REQUEST_FAILED,
          keyState: "search",
          payload: null,
        })
      }
    },
}
