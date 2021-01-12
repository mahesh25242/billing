import * as React from 'react';
import { ProductService } from '../../../services';
import {  message, Popconfirm } from 'antd';




const confirm = ({ event, item}: any) =>{
    console.log(event, item)
    message.success(`successfully deleted ${item.name}`);

}

const cancel = (e:any) => {
    console.log(e);
    message.error('Click on No');
  }
  

export const DeleteProduct = (props :any) =>{    
    return <>
        <Popconfirm
            title="Are you sure to delete this?"
            onConfirm={(event) => confirm({ event, item: props.item})}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
        >
            <a href="#">{ props.children }</a>
        </Popconfirm>    
    </>;
}

