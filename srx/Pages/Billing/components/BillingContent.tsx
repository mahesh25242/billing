/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';
import { ProductService } from '../../../services';
import { Button, Form, Input, InputNumber, PageHeader, Select,  Row, Col, AutoComplete } from 'antd';
import { Link } from 'react-router-dom';
import { ProductAutoSuggest,  ProductCartGrid } from '../components';
import { connect } from 'react-redux';

import { PlusCircleOutlined } from '@ant-design/icons';


const { Option } = AutoComplete;



const mapStateToProps = (state: { product: any, cart: any; shop: any; billingTab:any }) => {
  return { product: state.product[state.billingTab], cart: state.cart[state.billingTab], shop: state.shop };
};



const BillingContentComponent = (props:any) => {
    const productService = new ProductService();
    
    const [cart, setCart] = React.useState<any>(null);
    
    const [form] = Form.useForm();
    

    

        
        console.log(props.cart)

      
      const onFinish = (values: any) => {        
        props.dispatch({ type: 'CART_PRODUCTS', payload: props.product});                
        props.dispatch({ type: 'CHOOSE_PRODUCT', payload: null });                        
        form.resetFields();
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };

      

      
     console.log(props.cart)

      const chooseVarient = (value: any) => {
        let varient:any;
        if(value){
          varient = props.product.shop_product_variant.filter( (varnt:any) => varnt.id == value);
        }

       // form.getFieldValue();
        varient = varient[0];
        varient = {...varient, quantity: 1};

        props.dispatch({ type: 'CHOOSE_PRODUCT', payload: {...props.product, ...{selectedVarient: varient }} });                
        form.setFieldsValue({
          quantity: 1
        })      
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


      
    return (<>
        
            <Form  
                form={form}       
                name="basic"
                initialValues={{  }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
              <Row>
                <Col span={ (props.product && props.product.shop_product_variant && props.product.shop_product_variant.length > 1)  ? 12 : 24 }>
                    
                    <ProductAutoSuggest products={props.products} 
                    form={form}
                    ></ProductAutoSuggest>    
                          
                </Col>
                {
                  props.product && props.product.shop_product_variant && props.product.shop_product_variant.length > 1 && 
                  <Col span={12}>
                    <Form.Item
                    label="Varient"
                    name="varient"
                    rules={[{ required: true, message: 'Please choose a varient!' }]}
                    initialValue={props.product.selectedVarient.id}
                    >
                      <Select
                      size="large" 
                        showSearch  
                        allowClear   
                        
                        placeholder="Select a Varient"
                        optionFilterProp="children"
                        onChange={chooseVarient}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >{
                        props.product.shop_product_variant.map((spv: any) => <Option key={spv.id} value={spv.id}>{spv.name}</Option>)
                      }            
                      </Select>
                    </Form.Item>
                </Col>
                }
                
              </Row>
              {
                  props.product && props.product.selectedVarient && 
              <Row>
                <Col span="4">
                  <Form.Item label="Quantity"
                  name="quantity" 
                  rules={[{ required: true, message: 'Please enter quantity' }]}
                  initialValue={props.product.selectedVarient?.quantity}>
                    <InputNumber size="large" onChange={(evt) => {
                      props.dispatch({ type: 'CHOOSE_PRODUCT', payload: {...props.product, ...{selectedVarient: { ...props.product.selectedVarient, ...{quantity: evt}  } }} });                
                    }}/>
                  </Form.Item>                    
                </Col>
                
                
                  <Col span="4">
                    {props.product.selectedVarient.type.name}
                  </Col>
                  <Col span="4">          
                  ₹ {props.product.selectedVarient.quantity * props.product.selectedVarient.price}
                  </Col>
                
               
                
                <Col span="12">
                  <Form.Item name="message" label="Message">
                    <Input.TextArea showCount maxLength={250} size="large" />
                  </Form.Item>
                </Col>
              </Row>
              }
              <Form.Item>
                  <Button type="primary" htmlType="submit" loading={false} disabled={!props.product || !props.product.selectedVarient || props.product.selectedVarient.quantity <=0 }>
                    Add             
                  </Button>
                  {
                    props.product?.id && 
                    <Button type="primary" htmlType="submit" onClick={()=>{
                      props.dispatch({ type: 'CHOOSE_PRODUCT', payload: null });     
                    }}>
                    Clear             
                  </Button>
                  }
              </Form.Item>
        
              </Form>
               {
                 props.cart && props.cart.length > 0 &&
                 <ProductCartGrid/>
               }
            
  
      
      
    </>);
};


export const BillingContent = connect(mapStateToProps)(BillingContentComponent);

