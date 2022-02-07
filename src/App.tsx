import { useState } from 'react';
import { PageHeader, Divider, RadioChangeEvent } from 'antd';

import { DefaultLayout } from '@/layout';

import FavorFilter from '@/components/FavorFilter';
import RepoList from '@/components/RepoList';
import { favorType } from '@/types';

function App() {
  const [favorState, setFavorState] = useState<favorType>('all');
  const handleFavorChange = (e: RadioChangeEvent) => {
    setFavorState(e.target.value);
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
        ]}
        className="appHeader"
      />
      <Divider />
      <RepoList favorState={favorState} />
    </DefaultLayout>
  );
}

export default App;
