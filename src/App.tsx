import { useState } from 'react';
import { PageHeader, Divider, RadioChangeEvent } from 'antd';

import { DefaultLayout } from '@/layout';

import FavorFilter from '@/components/FavorFilter';
import RepoList from '@/components/RepoList';
import LanguageSelect from '@/components/LanguageSelect';

import { favorType } from '@/types';

function App() {
  const [favorState, setFavorState] = useState<favorType>('all');
  const [languageState, setLanguageState] = useState('all');
  const handleFavorChange = (e: RadioChangeEvent) => {
    setFavorState(e.target.value);
  };

  const handleLanguageChange = (value: string) => {
    setLanguageState(value);
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
          <LanguageSelect key="LanguageSelect" handleLanguageChange={handleLanguageChange} />,
        ]}
        className="appHeader"
      />
      <Divider />
      <RepoList favorState={favorState} languageState={languageState} />
    </DefaultLayout>
  );
}

export default App;
