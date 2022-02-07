import { useEffect, useState } from 'react';
import { List } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { github } from '@/redux/github/actions';
import { selectSearchedItems, selectFavorList } from '@/redux/github/selectors';

import RepoCard from '@/components/RepoCard';
import { formatDate } from '@/utils';

import { favorType, repoType } from '@/types';

const lastWeek = formatDate(new Date(new Date().setDate(new Date().getDate() - 7)));

const RepoList = ({ favorState }: { favorState: favorType }) => {
  const dispatch = useDispatch();
  const [githubStateList, setGithubList] = useState<repoType[]>([]);

  const { result: searchResult, isLoading } = useSelector(selectSearchedItems);
  const favorList = useSelector(selectFavorList);

  useEffect(() => {
    dispatch(
      github.search({
        entity: 'repositories',
        options: { q: `created:%3E${lastWeek}`, sort: 'stars', order: 'desc' },
      })
    );
  }, []);

  useEffect(() => {
    if (favorState === 'all') setGithubList(searchResult.items);
    if (favorState === 'favored') {
      const filtredList = searchResult.items.filter((item: any) => {
        return favorList.includes(item.id);
      });
      setGithubList(filtredList);
    }
    if (favorState === 'unfavored') {
      const filtredList = searchResult.items.filter((item: any) => {
        return !favorList.includes(item.id);
      });
      setGithubList(filtredList);
    }
  }, [favorList, favorState, searchResult]);

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
