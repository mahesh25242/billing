/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';
import { ProductService } from '../../services';
import { Button, Form, Input, InputNumber, PageHeader, Select, Table } from 'antd';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { AutoComplete } from 'antd';

const { Option } = AutoComplete;


const Billing:React.FC = () => {
    const productService = new ProductService();
    const [products, setProducts] = React.useState<any>(null);
    const [options, setOptions] = React.useState<any>(null);
    const [product, setProduct] = React.useState<any>(null);
    
    const [form] = Form.useForm();

    React.useEffect(() => {
        const prodSubscr = productService.products().subscribe(res=>{
          setProducts(res.response.data);      
          setOptions(options);                      
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

      
      const handleSearch = (value: string) => {
        let res: string[] = [];
        if (!value) {
          res = [];
        }      
        
        if(products)
          res = products.filter( (option:any) => option.name.toUpperCase().indexOf(value.toUpperCase()) !== -1);

              
        
          setOptions(res);
      };
      
      const handleSelect = (value: any, option:any) => {
        const res = products.filter( (product:any) => product.id == option.key );
        

        setProduct(res[0]); 
        
        form.setFieldsValue({
          varient: res[0] && res[0].shop_product_primary_variant.id
        });
    
      }

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
        <Col span={ (product && product.shop_product_variant)  ? 12 : 24 }>
            <Form.Item
            label="Product"
            name="product"
            rules={[{ required: true, message: 'Please enter a product!' }]}
          >
            <AutoComplete  
            allowClear
            onSearch={handleSearch} 
            placeholder="Enter the product here" 
            onSelect={handleSelect}>
            {options && options.map((option: any) => (
              <Option key={option.id} value={option.name}>
                {option.name}
              </Option>
            ))}
          </AutoComplete>
          </Form.Item>
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
      <Row>
        <Col span="4">
          <Form.Item label="Quantity"
          name="quantity" 
          rules={[{ required: true, message: 'Please enter quantity' }]}>
            <InputNumber />
          </Form.Item>

          <Form.Item name="message" label="Message">
            <Input.TextArea />
          </Form.Item>
          
        </Col>
      </Row>
      <Form.Item>
          <Button type="primary" htmlType="submit" loading={false}>
              Save & Print
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
