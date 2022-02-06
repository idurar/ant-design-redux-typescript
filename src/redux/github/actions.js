import * as actionTypes from "./types"
import { request } from "@/request"
import storePersist from "@/redux/storePersist"

export const github = {
  currentItem:
    ({ data }) =>
    async (dispatch) => {
      dispatch({
        type: actionTypes.CURRENT_ITEM,
        payload: data,
      })
    },
  favorToggle:
    ({ repoId }) =>
    async (dispatch, getState) => {
      let favorList = getState().github.favorList

      const exist = favorList.includes(repoId)

      if (exist) {
        dispatch({
          type: actionTypes.DISFAVOR,
          payload: repoId,
        })
      } else {
        dispatch({
          type: actionTypes.FAVOR,
          payload: repoId,
        })
      }

      favorList = getState().github.favorList
      storePersist.set("favorList", favorList)
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
