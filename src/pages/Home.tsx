import { useState } from 'react';
import { PageHeader, Divider, RadioChangeEvent } from 'antd';

import { DefaultLayout } from '@/layout';

import FavorFilter from '@/components/FavorFilter';
import RepoList from '@/components/RepoList';
import LanguageSelect from '@/components/LanguageSelect';
import SortSelect from '@/components/SortSelect';

import { favorType } from '@/types';

const Home = () => {
  const [favorState, setFavorState] = useState<favorType>('all');
  const [languageState, setLanguageState] = useState('all');
  const [sortState, setSortState] = useState('desc');
  const handleFavorChange = (e: RadioChangeEvent) => {
    setFavorState(e.target.value);
  };

  const handleLanguageChange = (value: string) => {
    setLanguageState(value);
  };

  const handleSortChange = (value: string) => {
    setSortState(value);
  };

  return (
    <DefaultLayout>
      <PageHeader
        ghost={false}
        title="Github App"
        subTitle="Repository Search"
        extra={[
          <FavorFilter
            key="FavorFilter"
            favorState={favorState}
            handleFavorChange={handleFavorChange}
          />,
          <SortSelect key="sortSelect" handleSortChange={handleSortChange} />,
          <LanguageSelect key="LanguageSelect" handleLanguageChange={handleLanguageChange} />,
        ]}
        className="appHeader"
      />
      <Divider />
      <RepoList favorState={favorState} sortState={sortState} languageState={languageState} />
    </DefaultLayout>
  );
};

export default Home;
