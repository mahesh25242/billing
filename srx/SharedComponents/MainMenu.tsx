/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect } from 'react';
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
        props.dispatch({ type: 'REMOVE_LOGIN', payload: null });                 
        

       //setTimeout( () => history.push("/"), 1000)
        
    }

      

    return ( <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1"><Link to="/home">Home</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/products">Products</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/billing">Billings</Link></Menu.Item>
                <Menu.Item key="4" onClick={() => signOut() }>Sign Out</Menu.Item>
            </Menu>);
};




export const MainMenu = connect(mapStateToProps)(MainMenuComponent);


