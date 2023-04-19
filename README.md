# Starter Project built with React Redux Typescript Ant Design

This is an open source Github project called "Github Repos React App with Typescript" that is built using React, Redux and Ant Design UI library. The purpose of the application is to show GitHub repositories that have the most stars, based on data fetched from the Github API.

The app has several features such as the ability for a user to mark a repository as a favorite by clicking on a heart icon which will store the details locally for future use. Additionally, the user can filter the list of repositories by programming language.

The project serves as a starter boilerplate for anyone interested in building a similar application using React, Redux, and TypeScript. It comes with basic functionalities already implemented, that can be used as a foundation to build other features.

The project is open source and can be accessed via Github. Users are free to modify, distribute, and use the code for their personal or commercial projects, under the terms of the MIT License.
#
Demo : [https://github-repos-react-typescript.vercel.app/](https://github-repos-react-typescript.vercel.app/)

#
![starter-react-typescript-redux-ant-design](https://user-images.githubusercontent.com/50052356/233078447-edef486d-0008-46c2-b07b-859530d4e559.jpeg)

Sure! Here are some code snippets from the Github Repos React App with Typescript project:

**Fetching data from Github API**
```typescript
export const fetchRepositories = async (language: string): Promise<Repository[]> => {
  const response = await axios.get(
    `https://api.github.com/search/repositories?q=stars:%3E1+language:${language}&sort=stars&order=desc&type=Repositories`
  );
  return response.data.items;
};
```

**Redux action for marking a repo as favorite**
```typescript
export const toggleFavoriteRepo = (repo: Repository): AppActions => ({
  type: TOGGLE_FAVORITE_REPO,
  payload: { repo },
});
```

**Rendering the list of repositories**
```tsx
const RepoList: React.FC<RepoListProps> = ({ repos, toggleFavorite }) => {
  if (repos.length === 0) {
    return <Empty />;
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={repos}
      renderItem={(repo) => (
        <List.Item
          actions={[
            <Button
              icon={<HeartOutlined />}
              onClick={() => toggleFavorite(repo)}
              style={{ color: repo.isFavorite ? "red" : "grey" }}
            />,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={repo.owner.avatar_url} />}
            title={<a href={repo.html_url}>{repo.full_name}</a>}
            description={<>{repo.description || "No description available"}</>}
          />
        </List.Item>
      )}
    />
  );
};
``` 

These are just a few examples of the codebase in this project. The full source code is available on the Github repository linked earlier.


### install App 
yarn install

### start App 
yarn start


