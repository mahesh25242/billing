/* eslint-disable import/no-unresolved */
import * as React from 'react';
import { ProductService } from '../../services';
import { Modal, Button, Space, PageHeader } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { MyBreadcrumb } from '../../SharedComponents';
import { connect } from 'react-redux';


interface ProductRouteParm {
    id?: any;    
}

const mapStateToProps = (state: {  cart: any; shop: any }) => {
  return {  cart: state.cart, shop: state.shop };
};


export const EditProductComponent = (props: any) =>{   
    const { id } = useParams<ProductRouteParm>();

  //   React.useEffect(() => {
        
      
  // }, [id]);

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

export const EditProduct = connect(mapStateToProps)(EditProductComponent);