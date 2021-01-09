/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';
import {   Menu } from 'antd';
import { connect } from "react-redux";
import {  useHistory, Link } from 'react-router-dom';

const mapStateToProps = (state: { token: any;  }) => {
    return { token: state.token };
};



const MainMenuComponent = (props: any) => {
    
    const history = useHistory();
    const signOut = () => {
        
        localStorage.removeItem('token');
        props.dispatch({ type: 'SET_LOGIN', payload: {} });         
        history.push("/");
    }

      

    return ( <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">Home</Menu.Item>
                <Menu.Item key="2"><Link to="/forgotPassword">Products</Link></Menu.Item>
                <Menu.Item key="3">Billings</Menu.Item>
                <Menu.Item key="4" onClick={() => signOut() }>Sign Out</Menu.Item>
            </Menu>);
};




const MainMenu = connect(mapStateToProps)(MainMenuComponent);
export default MainMenu;


