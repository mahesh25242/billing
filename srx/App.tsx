/* eslint-disable import/no-unresolved */
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Layout } from 'antd';
import 'antd/dist/antd.css'; 


import MyHeader from './Layout/Header/MyHeader';
import MyFooter from './Layout/Footer/MyFooter';
import Login from './components/Login/Login';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const App = () => {
    const { Header, Footer,  Content } = Layout;

    return (<Layout className="layout">
            <Header>
                
                <MyHeader />
            </Header>
            <Content style={{ padding: '0 50px' }}>                
                <div className="site-layout-content">
                    <Login />
                </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    <MyFooter></MyFooter>
                </Footer>            
        </Layout>);
};

//export default App;
export default hot(module)(App);
