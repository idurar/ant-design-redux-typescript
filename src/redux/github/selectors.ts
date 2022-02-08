import { repoType } from '@/types';
import { createSelector } from 'reselect';

const selectGithub = (state: { github: any }) => state.github;

export const selectCurrentItem = createSelector([selectGithub], (github) => github.current);

export const selectSearchedItems = createSelector([selectGithub], (github) => github.search);

export const selectItemById = (itemId: string) =>
  createSelector(selectSearchedItems, (search) =>
    search.result.items.find((item: repoType) => item.id === itemId)
  );

export const selectFavorList = createSelector([selectGithub], (github) => github.favorList);
export const selectLanguageList = createSelector([selectGithub], (github) => github.languageList);
