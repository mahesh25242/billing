/* eslint-disable import/no-unresolved */
import { AutoComplete, InputNumber, Select, Table } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { RemoveProduct, PrintBill } from './index';

const mapStateToProps = (state: { cart: any; billingTab: any  }) => {
    return {  cart: state.cart[state.billingTab] };
};
  

const { Option } = AutoComplete;

const ProductCartGridComponent = (props: any) =>{
    const columns = [
        {
          title: 'No.',
          dataIndex: 'no',
          key: 'id',
          ellipsis: true,
          render: (text: string, record:any, index:number) => index+1,
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'id',
          ellipsis: true,
          // render: (text: string, record:any, index:number) => text,
        },
        {
          title: 'Varient',
          dataIndex: 'shop_product_variant',
          key: 'shop_product_variant',
          render: (text: string, record:any, index:number) =>  <>
          {
            record.shop_product_variant && record.shop_product_variant.length > 1 &&
            <Select
              showSearch              
              placeholder="Select a Varient"
              optionFilterProp="children"
              value={record.selectedVarient.id}
              onChange={(evt) => {              
                const selectedVarient = record.shop_product_variant.find((spv:any) => spv.id === evt) ;
                props.dispatch({ type: 'REMOVE_FROM_CART', payload: record});                

                selectedVarient.quantity = record.selectedVarient.quantity;
                record.selectedVarient = selectedVarient;
                props.dispatch({ type: 'CART_PRODUCTS', payload: record});                

                  
              }}
              // onFocus={onFocus}
              // onBlur={onBlur}
              // onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {
                record.shop_product_variant.map((vrnt: any, idx:number) => <Option value={vrnt.id} key={idx}>{vrnt.name}</Option>)
              }            
            </Select>
          }
          {
            !record.shop_product_variant || record.shop_product_variant.length <= 1 &&
            record.selectedVarient.name
          }
          </>        
        },
        {
          title: 'Quantity',
          dataIndex: 'quantity',
          key: 'quantity',
          render: (text: string, record:any, index:number) => <InputNumber value={record.selectedVarient.quantity} size="large" onChange={(evt) => {     
            record.selectedVarient.quantity = evt;
            props.dispatch({ type: 'UPDATE_CART', payload: record });                
          }}/>,
        },
        {
          title: 'Unit Price',
          dataIndex: 'price',
          key: 'price',
          render: (text: string, record:any, index:number) => <> ₹ { record.selectedVarient && record.selectedVarient.price} </>,
        },
        {
          title: 'Total',
          dataIndex: 'total',
          key: 'total',
          render: (text: string, record:any, index:number) => <> ₹ { record.selectedVarient && (record.selectedVarient.quantity * record.selectedVarient.price)} </>,
        },
        {
          title: 'Options',
          dataIndex: 'id',
          key: 'id',
          render: (text: string, record: any, index: number) => <RemoveProduct item={record}>Delete</RemoveProduct>,
        },
      ];

      return <><Table dataSource={props.cart} 
      columns={columns}  rowKey={record => `${record.id}-${record.selectedVarient.id}`}  scroll={{ y: 400 }} />          
      <PrintBill/>
      </>
}

export const ProductCartGrid = connect(mapStateToProps)(ProductCartGridComponent);

