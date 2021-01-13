/* eslint-disable import/no-unresolved */
import * as React from 'react';
import { ProductService } from '../../services';
import { Modal, Button, Space, PageHeader } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { MyBreadcrumb } from '../../SharedComponents';


interface ProductRouteParm {
    id?: any;    
}


export const EditProduct = (props: any) =>{   
    const { id } = useParams<ProductRouteParm>();

    return <>  
    <PageHeader
        className="site-page-header"        
        title="View / Edit Product"        
        extra={[
          <Button key="1"><Link to="/products">Back To List Products</Link></Button>,          
        ]}
      />
      <MyBreadcrumb items={[
          {
            name: 'Home',
            to: '/'
          },
          {
            name: 'Products',
            to: '/products'            
          },
          {
            name: 'Create Or Edit Product',
            to: '/products/create'            
          }
        ]}/>
    {id}          
         <a>asassas</a>
    </>;
}