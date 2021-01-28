import * as React from 'react';
import { Modal, Button, Form, Row, Col, Input, Descriptions } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import { getTimeProps } from 'antd/lib/date-picker/generatePicker';
import { connect } from 'react-redux';

const mapStateToProps = (state: { cart: any;  }) => {
  return {  cart: state.cart };
};

const PrintBillComponent = (props: any) =>{
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    
    const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
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