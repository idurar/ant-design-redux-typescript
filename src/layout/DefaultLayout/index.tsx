import React from 'react';

import { Layout } from 'antd';

const { Content } = Layout;

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <Layout className="site-layout">
      <Content className="contentLayout">{children}</Content>
    </Layout>
  );
};

export default DefaultLayout;
