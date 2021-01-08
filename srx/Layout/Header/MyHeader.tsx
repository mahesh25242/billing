/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import MainMenu from '../../SharedComponents/MainMenu';
import { connect } from "react-redux";

const mapStateToProps = (state: { token: any;  }) => {
    return { token: state.token };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const MyHeaderComponent = (props: any) => {

    useEffect(() => {
        const token = localStorage.getItem('token');        
        props.dispatch({ type: 'SET_LOGIN', payload: JSON.parse(token) });   

    }, []);

        
    return (<>
    <div className="logo" />
    {
        props.token.access_token && 
        <MainMenu />
    }    
    </>)
};

const MyHeader = connect(mapStateToProps)(MyHeaderComponent);
export default MyHeader;