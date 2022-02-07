import * as actionTypes from './types';
import { request } from '@/request';
import storePersist from '@/redux/storePersist';
import { githubStateType, repoType, searchOptionsType } from '@/types';
import { Dispatch } from 'redux';

export const github = {
  favorToggle:
    ({ repoId }: { repoId: string }) =>
    async (dispatch: Dispatch, getState: () => githubStateType) => {
      let favorList: string[] = getState().github.favorList;

      const exist = favorList.includes(repoId);
      if (exist) {
        dispatch({
          type: actionTypes.DISFAVOR,
          payload: repoId,
        });
      } else {
        dispatch({
          type: actionTypes.FAVOR,
          payload: repoId,
        });
      }

      favorList = getState().github.favorList;
      storePersist.set('favorList', favorList);
    },
  search:
    ({ entity, options = {} }: { entity: string; options: searchOptionsType }) =>
    async (dispatch: Dispatch) => {
      dispatch({
        type: actionTypes.REQUEST_LOADING,
        keyState: 'search',
        payload: null,
      });

      let data = await request.search({ entity, options });

      if (data.success === true) {
        const items: repoType[] = data.result.items.map(
          ({ id, full_name, stargazers_count, language, html_url, description }: repoType) => ({
            id,
            full_name,
            stargazers_count,
            language,
            html_url,
            description,
          })
        );

        dispatch({
          type: actionTypes.REQUEST_SUCCESS,
          keyState: 'search',
          payload: { items },
        });

        let languageList = new Set<string>();

        items.forEach(({ language }) => {
          languageList.add(language);
        });

        dispatch({
          type: actionTypes.UPDATE_LANGUAGE,
          payload: Array.from(languageList).sort(),
        });
      } else {
        dispatch({
          type: actionTypes.REQUEST_FAILED,
          keyState: 'search',
          payload: null,
        });
      }
    },
};
