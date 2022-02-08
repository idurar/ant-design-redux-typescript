import { useEffect, useState } from 'react';
import { List } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { github } from '@/redux/github/actions';
import { selectSearchedItems, selectFavorList } from '@/redux/github/selectors';

import RepoCard from '@/components/RepoCard';
import { formatDate } from '@/utils';

import { favorType, repoType } from '@/types';

const lastWeek = formatDate(new Date(new Date().setDate(new Date().getDate() - 7)));

function filterState(
  items: repoType[],
  favorState: string,
  favorList: string[],
  languageState: string
): repoType[] {
  let filtredList: repoType[] | [] = [];
  if (favorState === 'all') filtredList = [...items];

  if (favorState === 'favored') {
    filtredList = items.filter((item: repoType) => {
      return favorList.includes(item.id);
    });
  }
  if (favorState === 'unfavored') {
    filtredList = items.filter((item: repoType) => {
      return !favorList.includes(item.id);
    });
  }
  if (languageState !== 'all') {
    filtredList = filtredList.filter((item: repoType) => {
      return item.language === languageState;
    });
  }
  return filtredList;
}

const RepoList = ({
  favorState,
  sortState,
  languageState,
}: {
  favorState: favorType;
  sortState: string;
  languageState: string;
}) => {
  const dispatch = useDispatch();
  const [githubStateList, setGithubList] = useState<repoType[]>([]);

  const { result: searchResult, isLoading } = useSelector(selectSearchedItems);
  const favorList = useSelector(selectFavorList);

  useEffect(() => {
    dispatch(
      github.search({
        entity: 'repositories',
        options: { q: `created:%3E${lastWeek}`, sort: 'stars', order: sortState },
      })
    );
  }, [sortState]);

  useEffect(() => {
    let filtredList = filterState(searchResult.items, favorState, favorList, languageState);

    setGithubList(filtredList);
  }, [favorList, languageState, favorState, searchResult]);

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 2,
        lg: 3,
        xl: 3,
        xxl: 3,
      }}
      dataSource={githubStateList}
      loading={isLoading}
      renderItem={(item: repoType) => (
        <List.Item>
          <RepoCard item={item} />
        </List.Item>
      )}
    />
  );
};

export default RepoList;
