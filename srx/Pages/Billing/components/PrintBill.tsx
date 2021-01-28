import * as React from 'react';
import { Modal, Button, Form, Row, Col, Input, Descriptions, message } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import { getTimeProps } from 'antd/lib/date-picker/generatePicker';
import { connect } from 'react-redux';
import { ProductService } from '../../../services';

const mapStateToProps = (state: { cart: any;  }) => {
  return {  cart: state.cart };
};

const PrintBillComponent = (props: any) =>{

  const productService = new ProductService();
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        let cart: any[] = [];
        props.cart.map((pdt:any) => {
          pdt.shop_product_selected_variant = pdt.selectedVarient;
          const item = {
            message: '',
            price: pdt.selectedVarient.price,
            product: pdt,
            qty: pdt.selectedVarient.quantity
          };
          cart = [...cart, item]
        })
        const postParm = {
          cart : cart,
          name: form.getFieldValue("name") ?? 'billing',
          phone: form.getFieldValue("mobile") ?? '1234567890',
          selectedLocation:{
            id: 1,
            name:'Kakkanad'
          }
        }
        productService.createOrder(postParm).subscribe(res=>{
          console.log(res?.response);
          message.success(`successfully created bill ${form.getFieldValue(`name`) ?? ``}`);

        }, error=>{
          console.log(error)
        })
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };

      const onFinish = (values: any) =>{
        console.log(values)
      }
      const onFinishFailed = (errorInfo: any) =>{
        console.log(errorInfo)
      }

    
      const sum:number =  props.cart.reduce((total:number,product:any)=>  total + ( product.selectedVarient.quantity * product.selectedVarient.price ) ,0 );

    return <>
    <Button type="primary" shape="round" icon={<PrinterOutlined />} size="large" onClick={(evt) => showModal()}>Print</Button>
    <Modal title="Customer Details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Form             
          name="basic"
          form={form}  
          initialValues={{  }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row>
            <Col span={24}>
              <Form.Item
              label="Name"
              name="name"
              rules={[{ required: false, message: 'Please enter customer name' }]}              
              >
                <Input  size="large" type="text"  autoFocus allowClear/>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
              label="Mobile"
              name="mobile"
              rules={[{ required: false, message: 'Please enter customer mobile' }]}              
              >
                <Input type="tel"  size="large" allowClear/>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Descriptions
          bordered
          title="Custom Size"
          size="default"          
        >
          <Descriptions.Item label="Number Of Items">{ props.cart.length }</Descriptions.Item>
          <Descriptions.Item label="Total Amount">₹ { sum }</Descriptions.Item>         
        </Descriptions>
    </Modal></>
}

export const PrintBill = connect(mapStateToProps)(PrintBillComponent);