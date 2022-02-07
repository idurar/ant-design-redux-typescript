import { createSelector } from 'reselect';

const selectGithub = (state: { github: any }) => state.github;

export const selectCurrentItem = createSelector([selectGithub], (github) => github.current);

export const selectSearchedItems = createSelector([selectGithub], (github) => github.search);

export const selectFavorList = createSelector([selectGithub], (github) => github.favorList);
