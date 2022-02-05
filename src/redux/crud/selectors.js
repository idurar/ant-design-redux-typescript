import { createSelector } from "reselect"

const selectCrud = (state) => state.crud

export const selectCurrentItem = createSelector(
  [selectCrud],
  (crud) => crud.current
)

export const selectSearchedItems = createSelector(
  [selectCrud],
  (crud) => crud.search
)
export const selectItemById = (itemId) =>
  createSelector(selectSearchedItems, (search) =>
    search.result.items.find((item) => item._id === itemId)
  )
