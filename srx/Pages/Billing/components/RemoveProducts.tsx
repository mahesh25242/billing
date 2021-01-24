import * as React from 'react';
import { ProductService } from '../../../services';
import {  message, Popconfirm } from 'antd';
import { connect } from 'react-redux';


const mapStateToProps = (state: { product: any, cart: any;  }) => {
    return { product: state.product, cart: state.cart };
};
  



  

const RemoveProductComponent = (props :any) =>{  

    const confirm = ({ event, item}: any) =>{
        console.log(props)  
        // console.log(event, item)
         //console.log(item)
         message.success(`successfully removed ${item.name}`);         
        props.dispatch({ type: 'REMOVE_FROM_CART', payload: item});                
     }
     
    

    
    return <>
        <Popconfirm
            title="Are you sure to delete this?"
            onConfirm={(event) => confirm({ event, item: props.item})}            
            okText="Yes"
            cancelText="No"
        >
            <a href="#">{ props.children }</a>
        </Popconfirm>    
    </>;
}

export const RemoveProduct = connect(mapStateToProps)(RemoveProductComponent);