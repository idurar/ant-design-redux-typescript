export type optionsType = {
  q: string;
  sort: string;
  order: string;
};

export type keyOptionsType = keyof optionsType;

export type searchOptionsType = {
  [key in keyof optionsType]?: optionsType[key];
};

export interface repoType {
  id: string;
  full_name: string;
  stargazers_count: number;
  language: string;
  html_url: string;
  description: string;
}

export interface githubStateType {
  languageList: string[];
  favorList: string[];
  search: {
    result: { items: repoType[] };
    isLoading: boolean;
    isSuccess: boolean;
  };
  [key: string]: any;
}

export type favorType = 'all' | 'favored' | 'unfavored';
