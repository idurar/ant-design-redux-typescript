import React, { useEffect, useState } from 'react';
import './App.css';
import { DefaultLayout } from './layout';

import { useSelector, useDispatch } from 'react-redux';
import { github } from '@/redux/github/actions';
import { selectSearchedItems, selectFavorList } from '@/redux/github/selectors';

import { List, Card, Typography, Button, PageHeader, Divider, Radio, RadioChangeEvent } from 'antd';

import { HeartOutlined, StarOutlined, GithubOutlined } from '@ant-design/icons';
import { formatDate } from './utils';

const { Paragraph } = Typography;

const lastWeek = formatDate(new Date(new Date().setDate(new Date().getDate() - 7)));

const Action = ({ text, icon }: { text: string; icon: React.ReactNode }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {icon}
        <div style={{ paddingLeft: '10px' }}>{text}</div>
      </div>
    </div>
  );
};

const FavorIcon = ({ repoId, favorList }: { repoId: any; favorList: string[] }) => {
  const dispatch = useDispatch();
  const favorToggle = () => {
    dispatch(
      github.favorToggle({
        repoId,
      })
    );
  };

  return (
    <Button
      type="text"
      icon={
        <HeartOutlined
          style={{
            color: favorList.includes(repoId) ? 'red' : 'grey',
            fontSize: '16px',
          }}
        />
      }
      onClick={favorToggle}
    />
  );
};

const FavorFilter = ({
  handleFavorChange,
  favorState,
}: {
  handleFavorChange: (e: RadioChangeEvent) => void;
  favorState: string;
}) => {
  return (
    <Radio.Group value={favorState} onChange={handleFavorChange}>
      <Radio.Button value="all">All</Radio.Button>
      <Radio.Button value="favored">Favored</Radio.Button>
      <Radio.Button value="unfavored">Unfavored</Radio.Button>
    </Radio.Group>
  );
};

function App() {
  const dispatch = useDispatch();
  const [githubStateList, setGithubList] = useState<any[any]>([]);
  const [favorState, setFavorState] = useState<'all' | 'favored' | 'unfavored'>('all');

  const { result: searchResult, isLoading } = useSelector(selectSearchedItems);
  const favorList = useSelector(selectFavorList);
  console.log('🚀 ~ file: App.tsx ~ line 38 ~ App ~ searchResult', searchResult);

  useEffect(() => {
    dispatch(
      github.search({
        entity: 'repositories',
        options: { q: `created:%3E${lastWeek}`, sort: 'stars', order: 'desc' },
      })
    );
  }, []);

  const handleFavorChange = (e: RadioChangeEvent) => {
    setFavorState(e.target.value);
  };

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
        style={{ borderRadius: 12, border: '1px solid #edf0f5' }}
      />
      <Divider />
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
        renderItem={(item: any) => (
          <List.Item>
            <Card
              title={item.full_name}
              extra={<FavorIcon repoId={item.id} favorList={favorList} />}
              style={{ height: 280, position: 'relative' }}
              actions={[
                <Action
                  text={item.stargazers_count + (item.stargazers_count > 1 ? ' stars' : ' stars')}
                  key="star"
                  icon={<StarOutlined />}
                />,
                <Action
                  text={item.language || 'Unknow'}
                  key="language"
                  icon={<GithubOutlined />}
                />,
              ]}
            >
              <Paragraph ellipsis={{ rows: 2 }}>
                Link : <a href={item.html_url}>{item.html_url}</a>
              </Paragraph>
              <Paragraph ellipsis={{ rows: 3 }}>description : {item.description}</Paragraph>
            </Card>
          </List.Item>
        )}
      />
    </DefaultLayout>
  );
}

export default App;
