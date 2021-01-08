/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useState } from "react";
import {    
  HashRouter,
  Redirect,
    Route    
  } from "react-router-dom";


import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import ForgotPassword from '../Pages/ForgotPassword/ForgotPassword';
import { connect } from "react-redux";

const mapStateToProps = (state: { token: any;  }) => {
  return { token: state.token };
};


const MyRouters = () => {
    return (<> <HashRouter>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/forgotPassword">
          <ForgotPassword />
        </Route>
        <PrivateRoute path="/home">
          <Home />
        </PrivateRoute>        
      </HashRouter></>);
}

const PrivateRouteFn:React.FC<any>   = ({ children, ...rest }) => {
  
  return (
    <Route
      {...rest}
      render={({ location }) =>
      {        
        return rest.token.access_token ? (
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