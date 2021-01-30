/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useState } from "react";
import {    
  HashRouter,
  Redirect,
    Route   ,
    Switch 
  } from "react-router-dom";


import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import ForgotPassword from '../Pages/ForgotPassword/ForgotPassword';
import Products from '../Pages/Products/Products';
import Billing from '../Pages/Billing/Billing';

import { connect } from "react-redux";
import { remote, ipcRenderer } from 'electron';

const mapStateToProps = (state: { token: any;  }) => {
  return { token: state.token };
};


const MyRouters = () => {
    return (<> <Switch>
        <Route path="/" exact>
          <Login />
        </Route>      
        <Route path="/forgotPassword">
          <ForgotPassword />
        </Route>
        <PrivateRoute path="/home">
          <Home />
        </PrivateRoute>        
        <PrivateRoute path="/products">
          <Products />
        </PrivateRoute>        
        <PrivateRoute path="/billing">
          <Billing />
        </PrivateRoute>        
      </Switch></>);
}

const PrivateRouteFn:React.FC<any>   = ({ children, ...rest }) => {
  if(rest.token && rest.token.access_token)  
    remote.getCurrentWindow().setMenuBarVisibility(true)

  return (
    <Route
      {...rest}
      render={({ location }) =>
      {                
        return rest.token && rest.token.access_token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
      }
    />
  );
}

const PrivateRoute = connect(mapStateToProps)(PrivateRouteFn);


export default MyRouters;