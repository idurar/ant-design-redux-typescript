export const storePersist = {
  set: (key: string, state: any) => {
    window.localStorage.setItem(key, JSON.stringify(state));
  },
  get: (key: string) => {
    const result: any = window.localStorage.getItem(key);
    return JSON.parse(result);
  },
  remove: (key: string) => {
    window.localStorage.removeItem(key);
  },
  getAll: () => {
    return window.localStorage;
  },
  clear: () => {
    window.localStorage.clear();
  },
};

export default storePersist;
