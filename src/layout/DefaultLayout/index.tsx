import React from 'react';

import { Layout } from 'antd';

const { Content } = Layout;

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <Layout className="site-layout">
      <Content
        style={{
          padding: '20px',
          margin: '0 auto',
          width: '100%',
          minHeight: '100vh',
          maxWidth: '1100px',
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default DefaultLayout;
