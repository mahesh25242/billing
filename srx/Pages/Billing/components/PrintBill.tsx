/* eslint-disable @typescript-eslint/no-inferrable-types */
import * as React from 'react';
import { Modal, Button, Form, Row, Col, Input, Descriptions, message, notification } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import { getTimeProps } from 'antd/lib/date-picker/generatePicker';
import { connect } from 'react-redux';
import { ProductService } from '../../../services';

import { PosPrintData, PosPrintOptions} from "electron-pos-printer";
import * as path from "path";
import { remote } from 'electron';

const {PosPrinter} = remote.require("electron-pos-printer");



const mapStateToProps = (state: { cart: any; shop: any }) => {
  return {  cart: state.cart, shop: state.shop };
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
        let billProductArr:any[] = [];
        let grandTotal: number = 0;
        props.cart.map((pdt:any) => {
          pdt.shop_product_selected_variant = pdt.selectedVarient;
          const item = {
            message: '',
            price: pdt.selectedVarient.price,
            product: pdt,
            qty: pdt.selectedVarient.quantity
          };
          cart = [...cart, item]
          billProductArr = [...billProductArr, [`${pdt.name} - ${pdt.selectedVarient.name}`, item.qty, item.price ]];
          grandTotal +=item.price;
        })
        
        if(!props.shop.shop_delivery){
          message.error(`No shop delivery found`);
        }
        const postParm = {
          cart : cart,
          name: form.getFieldValue("name") ?? 'billing',
          phone: form.getFieldValue("mobile") ?? '1234567890',
          selectedLocation:props.shop.shop_delivery[0]
        }
        productService.createOrder(postParm).subscribe(res=>{
          console.log(res?.response);
          message.success(`successfully created bill ${form.getFieldValue(`name`) ?? ``}`);


          const options: PosPrintOptions = {
            preview: true,
            width: '170px',       
            margin: '0 0 0 0',    
            copies: 1,
            printerName: 'Deskjet-2540',
            timeOutPerLine: 400,
            silent:true,
            pageSize: { height: 301000, width: 71000 } // page size
         }
          
         const data: PosPrintData[] = [
            // {
            //   type: 'image',                                       
            //   path: path.join(__dirname, 'assets/banner.png'),     // file path
            //   position: 'center',                                  // position of image: 'left' | 'center' | 'right'
            //   width: '60px',                                           // width of image in px; default: auto
            //   height: '60px',                                          // width of image in px; default: 50 or '50px'
            // },
            {
               type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
               value: `${props.shop.name}`,
               style: `text-align:center;`,
               css: {"font-weight": "700", "font-size": "14px"}
            },
            {
              type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
              value: `${props.shop.address}`,
              style: `text-align:center;`,
              css: {"font-weight": "700", "font-size": "14px"}
           },
           
          {
            type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
            value: `${props.shop.city.name}-${props.shop.pin}`,
            style: `text-align:center;`,
            css: {"font-weight": "700", "font-size": "14px"}
          },
          {
            type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
            value: `Phone: ${props.shop.phone}`,
            style: `text-align:center;`,
            css: {"font-weight": "700", "font-size": "14px"}
          },
          {
            type: 'text',                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table'
            value: `<hr/>`,                        
          },
          {
            type: 'text',                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table'
            value: `To: ${postParm.name ?? '-'}${ (postParm.phone) ? `-${postParm.phone}` :''}`,
            style: `text-align:left;color: red;`,
            css: {"text-decoration": "underline", "font-size": "10px"}
          },
            // {
            //    type: 'barCode',
            //    value: 'HB4587896',
            //    height: '12',                     // height of barcode, applicable only to bar and QR codes
            //    width: '1',                       // width of barcode, applicable only to bar and QR codes
            //    displayValue: true,             // Display value below barcode
            //    fontsize: 8,
            // },{
            //   type: 'qrCode',
            //    value: props.shop.shop_url,
            //    height: '55',
            //    width: '55',
            //    style: 'margin: 10 20px 20 20px'
            //  },
             {
                type: 'table',
                // style the table
                style: 'border: 1px solid #ddd',
                // list of the columns to be rendered in the table header
                tableHeader: ['Item', 'Qty', 'Amount'],
                // multi dimensional array depicting the rows and columns of the table body
                tableBody: billProductArr,
                // list of columns to be rendered in the table footer
                tableFooter: ['', 'Grand Total', `${grandTotal}`],
                // custom style for the table header
                tableHeaderStyle: ' color: black;',
                // custom style for the table body
                tableBodyStyle: 'border: 0.5px solid #ddd',
                // custom style for the table footer
                tableFooterStyle: '  font-weight: bold',
             }             
         ]
         PosPrinter.print(data, options)
          .then((suc:any) => {
            
            console.log(suc)
          })
          .catch((error:any) => {
             console.error(error);
           });

           props.dispatch({ type: 'EMPTY_CART', payload: null}); 
           

        }, error=>{
          let msg:string = '';
          if(error?.response?.errors){
            for(const i in error?.response?.errors){
              msg += error?.response?.errors[i][0];              
            }            
          }

          notification.error({
            message: 'Error Messages',
            description:
              msg,
            onClick: () => {
              console.log('Notification Clicked!');
            },
          });

                    
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
    <Button type="primary" shape="round" icon={<PrinterOutlined />} size="large" onClick={(evt) => showModal()}>Save & Print</Button>
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