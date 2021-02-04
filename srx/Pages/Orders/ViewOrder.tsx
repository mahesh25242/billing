/* eslint-disable import/no-unresolved */
import * as React from 'react';
import { ProductService } from '../../services';
import { Modal, Button, Space, PageHeader, Descriptions, Table } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { MyBreadcrumb } from '../../SharedComponents';
import { connect } from 'react-redux';


interface ProductRouteParm {
  order?: any;    
}

const mapStateToProps = (state: {  cart: any; shop: any }) => {
  return {  cart: state.cart, shop: state.shop };
};


export const ViewOrderComponent = (props: any) =>{   


 
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',      
      render: (text: string, record:any, index:number) => <>{`${record.shop_product_variant.shop_product.name} - ${record.shop_product_variant.name}`}</>,
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
      key: 'qty',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
  ];
  
  

    return <>   
      <Descriptions layout="vertical" bordered>
        <Descriptions.Item label="Customer Name">{props.order.shop_customer.name}</Descriptions.Item>
        <Descriptions.Item label="Customer Phone">{props.order.shop_customer.phone}</Descriptions.Item>
        {
          props.order.address &&
          <Descriptions.Item label="Address">{props.order.address}</Descriptions.Item>
        }
        {
          props.order.pin &&
          <Descriptions.Item label="Pin">{props.order.pin}</Descriptions.Item>
        }
        
        <Descriptions.Item label="Delivery Point / Charge">{props.order.shop_delivery.name} / {props.order.shop_delivery.charge}</Descriptions.Item>
        <Descriptions.Item label="Total">
          {props.order.total}
        </Descriptions.Item> 
        <Descriptions.Item label="Status">
          {props.order.status_text}
        </Descriptions.Item> 
      </Descriptions>
      <h3>Products</h3>
      <Table dataSource={props.order.shop_order_item} columns={columns}
      rowKey={record => `${record.id}`} />         
    </>;
}

export const ViewOrder = connect(mapStateToProps)(ViewOrderComponent);