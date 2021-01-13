/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';
import { ProductService } from '../../services';
import { Button, PageHeader, Table } from 'antd';


import { DeleteProduct } from './components';
import { Link, useRouteMatch } from 'react-router-dom';

import { EditProduct } from './EditProduct';
import { MyBreadcrumb } from '../../SharedComponents';

const ListProducts = () => {    
    const productService = new ProductService();
    const [products, SetProducts] = React.useState(null);
    const { path, url } = useRouteMatch();    
    
    React.useEffect(() => {
        const prodSubscr = productService.products().subscribe(res=>{
            SetProducts(res.response.data);
        })
        return () => {
          prodSubscr.unsubscribe();
        };
      
    }, []);

   

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'id',
          ellipsis: true,
          render: (text: string, record:any, index:number) => <Link to={`/products/create/${record.id}`}>{text}</Link>,
        },
        {
          title: 'Status',
          dataIndex: 'status_text',
          key: 'status_text',
        },
        {
          title: 'Created At',
          dataIndex: 'created_at',
          key: 'created_at',
        },
        {
          title: 'Varients',
          dataIndex: 'shop_product_variant',
          key: 'shop_product_variant',
          render: (text: string, record:any, index:number) => <a>{record.shop_product_variant.length} </a>,
        },
        {
          title: 'Options',
          dataIndex: 'id',
          key: 'id',
          render: (text: string, record: any, index: number) => <DeleteProduct item={record}>Delete</DeleteProduct>,
        },
      ];
      
      

    
    return (<>
      <PageHeader
        className="site-page-header"        
        title="Products"
        subTitle="List all products"
        extra={[
          <Button key="1"><Link to={`${path}/create/`}>Create New Product</Link></Button>,          
        ]}
      />
        <MyBreadcrumb items={[
          {
            name: 'Home',
            to: '/'
          },
          {
            name: 'Products'            
          }
        ]}/>
       {
       products &&   <Table dataSource={products} 
       columns={columns}  rowKey="id" scroll={{ y: 400 }} />
      }
    </>);
};

export default ListProducts;
