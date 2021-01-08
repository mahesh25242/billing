/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import {    
  HashRouter,
  Redirect,
    Route    
  } from "react-router-dom";


import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import ForgotPassword from '../Pages/ForgotPassword/ForgotPassword';

const MyRouters = () => {
    return (<> <HashRouter>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/forgotPassword">
          <ForgotPassword />
        </Route>
        <Route path="/home">
          <Home />
        </Route>        
      </HashRouter></>);
}



export default MyRouters;