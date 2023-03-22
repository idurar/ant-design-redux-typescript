import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { PageHeader, Divider } from 'antd';

import { selectSearchedItems } from '@/redux/github/selectors';

import { DefaultLayout } from '@/layout';
import RepoCard from '@/components/RepoCard';

import { repoType } from '@/types';

const Repository = () => {
  let { repositoryId = '' } = useParams();
  const [repo, setRepo] = useState<repoType>();
  let navigate = useNavigate();
  const repoList = useSelector(selectSearchedItems);

  useEffect(() => {
    const current = repoList.result.items.find(({ id }: { id: string }) => id == repositoryId);
    setRepo(current);
  }, [repoList]);

  return (
    <DefaultLayout>
      <PageHeader
        ghost={false}
        onBack={() => navigate('/')}
        title="Github App"
        subTitle="Repository Search"
        className="appHeader"
      />
      <Divider />
      <RepoCard item={repo} />
    </DefaultLayout>
  );
};

export default Repository;
