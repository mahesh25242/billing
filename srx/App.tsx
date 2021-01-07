/* eslint-disable import/no-unresolved */
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Layout,  Breadcrumb } from 'antd';
import 'antd/dist/antd.css'; 


import MyHeader from './Layout/Header/MyHeader';
import MyFooter from './Layout/Footer/MyFooter';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const App = () => {
    const { Header, Footer,  Content } = Layout;

    return (<Layout className="layout">
            <Header>
                
                <MyHeader />
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">Content</div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    <MyFooter></MyFooter>
                </Footer>            
        </Layout>);
};

//export default App;
export default hot(module)(App);
