interface optionsType {
  q?: string;
  sort?: string;
  order?: string;
}

export interface searchOptionsType extends optionsType {
  [key: string]: any;
}

export interface repoType {
  id: string;
  full_name: string;
  stargazers_count: number;
  language: string;
  html_url: string;
  description: string;
}

export interface githubStateType {
  favorList: string[];
  search: {
    result: { items: repoType[] };
    isLoading: boolean;
    isSuccess: boolean;
  };
  [key: string]: any;
}
