/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';
import { ProductService } from '../../services';
import { Button, Form, Input, PageHeader, Table } from 'antd';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';

const Billing = () => {
    const productService = new ProductService();
    const [products, SetProducts] = React.useState(null);

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
          render: (text: string, record:any, index:number) => <a>{text}</a>,
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
          render: (text: string, record: any, index: number) => <a>Delete</a>,
        },
      ];
      
      
      const onFinish = (values: any) => {
        console.log('Success:', values);
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };

      

    console.log(products)
    return (<>
      <PageHeader
        className="site-page-header"        
        title="Billing"
        subTitle="Product Billing"
        extra={[
          <Button key="1"><Link to="/products">List Product</Link></Button>,          
        ]}
      />
      <Form        
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
      <Row>
        <Col span={24}>
            <Form.Item
            label="Product"
            name="product"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      </Form>
       {
       products &&   <Table dataSource={products} 
       columns={columns}  rowKey="id" scroll={{ y: 400 }} loading={products === null} />
      }
    </>);
};

export default Billing;
