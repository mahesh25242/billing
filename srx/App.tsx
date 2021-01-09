/* eslint-disable import/no-unresolved */
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Layout } from 'antd';
import 'antd/dist/antd.css'; 
import {  HashRouter } from "react-router-dom";


import { Provider } from 'react-redux'
import store from './store'

import MyHeader from './Layout/Header/MyHeader';
import MyFooter from './Layout/Footer/MyFooter';
import MyRouters from './Routers/MyRouters';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const App = () => {    
    const { Header, Footer,  Content } = Layout;

    return ( <Provider store={store}>
        <Layout className="layout">
            <HashRouter  >
                <Header>
                    
                    <MyHeader />
                </Header>
                <Content style={{ padding: '0 50px' }}>                
                
                    <div className="site-layout-content">
                        <MyRouters />
                    </div>                    
               
                </Content>
                </HashRouter >
                <Footer style={{ textAlign: 'center' }}>
                    <MyFooter></MyFooter>
                </Footer>            
        </Layout></Provider>);
};

//export default App;
export default hot(module)(App);
