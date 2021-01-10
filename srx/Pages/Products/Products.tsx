/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';
import { ProductService } from '../../services';
import { Table } from 'antd';

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
          key: 'name',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Created At',
          dataIndex: 'created_at',
          key: 'created_at',
        },
      ];
      
      

    console.log(products)
    return (<>
       products &&   <Table dataSource={products} columns={columns} />
    </>);
};

export default Products;
