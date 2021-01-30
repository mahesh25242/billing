/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import { MainMenu } from '../../SharedComponents';
import { connect } from "react-redux";

import { remote, ipcRenderer } from 'electron';
import { useHistory } from 'react-router';
import { ShopService } from '../../services';
import { Subscription } from 'rxjs';
         


const mapStateToProps = (state: { token: any;  }) => {
    return { token: state.token };
};



// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const MyHeaderComponent = (props: any) => {
    
    const shopService = new ShopService();
    const history = useHistory();
    
    
    useEffect(() => {

        ipcRenderer.on('list-product', (event) => {
            history.push('/products');
        });

        ipcRenderer.on('new-billing', (event) => {
            history.push('/billing');
        });
        
        ipcRenderer.on('create-product', (event) => {
            history.push('/products/create');
        });

        ipcRenderer.on('sign-out', (event) => {
            localStorage.removeItem('token');
            props.dispatch({ type: 'REMOVE_LOGIN', payload: null });                         
            const win = remote.getCurrentWindow();
            win.close();
            
        });

        ipcRenderer.on('sign-out-only', (event) => {
            localStorage.removeItem('token');
            props.dispatch({ type: 'REMOVE_LOGIN', payload: null });
            remote.getCurrentWindow().setMenuBarVisibility(false)                                     
            
        });
        

        const token = localStorage.getItem('token');        
        props.dispatch({ type: 'SET_LOGIN', payload: JSON.parse(token) });   

       
    }, []);

    
    useEffect(() => {
        let shopSubscr:Subscription;
        if(props.token){
            shopSubscr = shopService.shop().subscribe((shop: any)=>{                
                props.dispatch({ type: 'SET_SHOP', payload: shop.response });   
            });
        }
        
        return () => {
            shopSubscr && shopSubscr.unsubscribe();
          };

    }, [props.token]);
        
    return (<>
    {/* <div className="logo" />
    {
        props.token && props.token.access_token && 
        <MainMenu />
    }     */}
    </>)
};

const MyHeader = connect(mapStateToProps)(MyHeaderComponent);
export default MyHeader;