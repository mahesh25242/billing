/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';
import { ProductService } from '../../services';
import { Button, Form, Input, InputNumber, PageHeader, Select, Table } from 'antd';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { AutoComplete } from 'antd';
import { ProductAutoSuggest } from './components';

const { Option } = AutoComplete;


const Billing:React.FC = () => {
    const productService = new ProductService();
    const [products, setProducts] = React.useState<any>(null);
    const [product, setProduct] = React.useState<any>(null);
    
    const [form] = Form.useForm();

    React.useEffect(() => {
        const prodSubscr = productService.products().subscribe(res=>{
          setProducts(res.response.data);                    
        });

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
          render: (text: string, record:any, index:number) => <a>{ record.shop_product_variant && record.shop_product_variant.length} </a>,
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

      

      
     

      function onChange(value: any) {
        console.log(`selected ${value}`);
      }
      
      function onBlur() {
        console.log('blur');
      }
      
      function onFocus() {
        console.log('focus');
      }
      
      function onSearch(val: any) {
        console.log('search:', val);
      }

      const selectedProduct = (product:any) =>{
        setProduct(product);
        form.setFieldsValue({
          varient: product && product.shop_product_primary_variant.id
        });
    

      }
      console.log(product)
    
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
        form={form}       
        name="basic"
        initialValues={{ quantity: 1 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
      <Row>
        <Col span={ (product && product.shop_product_variant && product.shop_product_variant.length > 1)  ? 12 : 24 }>
            
            <ProductAutoSuggest products={products} 
           // form={form}
            setProduct={selectedProduct}></ProductAutoSuggest>
          
        </Col>
        {
          product && product.shop_product_variant && product.shop_product_variant.length > 1 && 
          <Col span={12}>
            <Form.Item
            label="Varient"
            name="varient"
            rules={[{ required: true, message: 'Please choose a varient!' }]}
            >
              <Select
              size="large" 
                showSearch  
                allowClear          
                placeholder="Select a Varient"
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >{
                product.shop_product_variant.map((spv: any) => <Option key={spv.id} value={spv.id}>{spv.name}</Option>)
              }            
              </Select>
            </Form.Item>
        </Col>
        }
        
      </Row>
      {
          product && product.shop_product_variant && 
      <Row>
        <Col span="12">
          <Form.Item label="Quantity"
          name="quantity" 
          rules={[{ required: true, message: 'Please enter quantity' }]}>
            <InputNumber size="large" />
          </Form.Item>                    
        </Col>
        <Col span="12">
          <Form.Item name="message" label="Message">
            <Input.TextArea showCount maxLength={250} size="large" />
          </Form.Item>
        </Col>
      </Row>
      }
      <Form.Item>
          <Button type="primary" htmlType="submit" loading={false}>
            Add
          </Button>
      </Form.Item>

      </Form>
       {
       products &&   <Table dataSource={products} 
       columns={columns}  rowKey="id" scroll={{ y: 400 }} loading={products === null} />
      }
    </>);
};

export default Billing;
