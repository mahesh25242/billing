/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';
import {  Route, Switch, useRouteMatch } from 'react-router-dom';
import { EditProduct } from './EditProduct';
import ListProducts from './ListProducts';

const Products = () => {
    const { path, url } = useRouteMatch();    
      
      
    
    return (<>
      <Switch>
      <Route path={`${path}`} exact>
          <ListProducts />
        </Route>
        <Route path={`${path}/create/:id?`}>
          <EditProduct />
        </Route>
      </Switch>  
    </>);
};

export default Products;
