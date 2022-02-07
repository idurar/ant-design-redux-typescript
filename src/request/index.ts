import { API_BASE_URL } from '@/config/serverApiConfig';
import { searchOptionsType, keyOptionsType } from '@/types';

export const request = {
  search: async ({ entity, options = {} }: { entity: string; options: searchOptionsType }) => {
    try {
      let query = '?';
      for (let key in options) {
        query += key + '=' + options[key as keyOptionsType] + '&';
      }
      query = query.slice(0, -1);
      const response = await fetch(`${API_BASE_URL}search/${entity}${query}`);
      const data = await response.json();

      return { success: true, result: data };
    } catch (error) {
      return { success: false, result: null };
    }
  },
};
