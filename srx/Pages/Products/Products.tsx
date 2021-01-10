/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';
import { ProductService } from '../../services';
import { Button, PageHeader, Table } from 'antd';

const Products = () => {
    const productService = new ProductService();
    const [products, SetProducts] = React.useState(null);

    React.useEffect(() => {
        productService.products().subscribe(res=>{
            SetProducts(res.response.data);
        })

    }, []);

   

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'id',
          ellipsis: true,
          render: (text: string, record, index) => <a>{text}</a>,
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
          render: (text: string, record:any, index) => <a>{record.shop_product_variant.length} </a>,
        },
        {
          title: 'Options',
          dataIndex: 'id',
          key: 'id',
          render: (text: string, record, index) => <a>Delete</a>,
        },
      ];
      
      

    console.log(products)
    return (<>
      <PageHeader
        className="site-page-header"        
        title="Products"
        subTitle="List all products"
        extra={[
          <Button key="1">Create New Product</Button>,          
        ]}
      />
       {
       products &&   <Table dataSource={products} 
       columns={columns}  rowKey="id" scroll={{ y: 400 }} />
      }
    </>);
};

export default Products;
