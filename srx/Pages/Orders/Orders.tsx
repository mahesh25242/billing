/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';
import {  Route, Switch, useRouteMatch } from 'react-router-dom';

import ListProducts from './ListOrders';

const Orders = () => {
    const { path, url } = useRouteMatch();    
      
    return (<ListProducts />);
    
    // return (<>
    //   <Switch>
    //   <Route path={`${path}`} exact>
    //       <ListProducts />
    //     </Route>
    //     <Route path={`${path}/view/:id?`}>
    //       <ViewOrder />
    //     </Route>
    //   </Switch>  
    // </>);
};

export default Orders;
