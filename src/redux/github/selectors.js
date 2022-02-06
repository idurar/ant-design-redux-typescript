import { createSelector } from "reselect"

const selectGithub = (state) => state.github

export const selectCurrentItem = createSelector(
  [selectGithub],
  (github) => github.current
)

export const selectSearchedItems = createSelector(
  [selectGithub],
  (github) => github.search
)
export const selectItemById = (itemId) =>
  createSelector(selectSearchedItems, (search) =>
    search.result.items.find((item) => item._id === itemId)
  )

export const selectFavorList = createSelector(
  [selectGithub],
  (github) => github.favorList
)
