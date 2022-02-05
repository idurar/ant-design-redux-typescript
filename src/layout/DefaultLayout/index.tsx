import React from 'react';


import { Layout } from "antd"

const { Content } = Layout

const DefaultLayout: React.FC = ({ children } ) => {
  return (
    <Layout>
      <Content
        style={{
          padding: "0 20px",
          margin: "0 auto",
          width: "100%",
          maxWidth: "1100px",
        }}
      >
        {children}
      </Content>
    </Layout>
  )
}

export default DefaultLayout;
