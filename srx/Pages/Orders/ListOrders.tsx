/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';
import { OrderService } from '../../services';
import { Button, Modal, PageHeader, Spin, Table } from 'antd';


import { ViewOrder } from './ViewOrder';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

import { MyBreadcrumb } from '../../SharedComponents';
import { Subscription } from 'rxjs';

import { remote } from 'electron';
import { connect } from 'react-redux';
const { Menu, MenuItem } = remote;


const mapStateToProps = (state: { product: any;billingTab: any, billingTabs:any  }) => {
  return { product: state.product[state.billingTab], billingTabs: state.billingTabs, billingTab: state.billingTab };
};


    
const ListOrdersComponent = (props:any) => {   
  const history = useHistory(); 
    const orderService = new OrderService();
    const [orders, SetOrders] = React.useState(null);
    const [totalPage, SetTotalPage] = React.useState(0);
    const [order, SetOrder] = React.useState(null);

console.log(props)
    
    const { path, url } = useRouteMatch();    
    let  prodSubscr:Subscription;
    React.useEffect(() => {

      // const menu = new Menu()
      // menu.append(new MenuItem({ label: 'MenuItem1', click(evt) { console.log('item 1 clicked', evt) } }))
      // menu.append(new MenuItem({ type: 'separator' }))
      // menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }))

      // window.addEventListener('contextmenu', (e) => {
      //   e.preventDefault()
      //   menu.popup({ window: remote.getCurrentWindow() })
      // }, false)


        prodSubscr = orderService.orders().subscribe(res=>{
          SetOrders(res.response.data);
          SetTotalPage(res.response.total)
        })
        return () => {
          prodSubscr.unsubscribe();
        };
      
    }, []);

   
    
    const columns = [
        {
          title: 'Customer',
          dataIndex: 'customer_name',
          key: 'id',
          ellipsis: true,
          render: (text: string, record:any, index:number) => <a onClick={() => SetOrder(record)}>{record.shop_customer.name}</a>,
        },
        {
          title: 'Status',
          dataIndex: 'status_text',
          key: 'status_text',
        },
        {
          title: 'Oreded At',
          dataIndex: 'created_at',
          key: 'created_at',
        },       
        {
          title: 'Delivery',
          dataIndex: 'delivery',
          key: 'delivery',
          render: (text: string, record: any, index: number) => <>{record.shop_delivery.name}</>,
        },
        {
          title: 'Options',
          dataIndex: 'options',
          key: 'options',
          render: (text: string, record: any, index: number) => <>
          {record.status ==2 &&
          <a onClick={() => {            
            props.dispatch({ type: 'BILLING_TABS', payload: [...props.billingTabs, `Tab ${props.billingTabs+1}`] });
            props.dispatch({ type: 'SELECTED_BILLING_TAB', payload: props.billingTabs.length });
            
            record.shop_order_item.map((res:any)=>{
              let product = res.shop_product_variant.shop_product;
              let shop_product_variant = res.shop_product_variant;
              shop_product_variant = {...shop_product_variant,...{quantity: 1} }
              product = {...product, ...{selectedVarient: shop_product_variant}, ...{shop_product_variant: [res.shop_product_variant]}}
              props.dispatch({ type: 'CART_PRODUCTS', payload: product});  
              history.push('/billing');
            });            
            
          }}>Send to Billing</a>
          }
          </>,
        },
      ];
      
      

    
    return (<>
      <PageHeader
        className="site-page-header"        
        title="Orders"
        subTitle="List all products"      
      />
        <MyBreadcrumb items={[
          {
            name: 'Home',
            to: '/'
          },
          {
            name: 'Products'            
          }
        ]}/>
       {
        <Spin spinning={orders == null}>
          <Table dataSource={orders} 
       columns={columns}  rowKey="id" scroll={{ y: 400 }} pagination={{defaultCurrent: 1, 
        total:totalPage,
        pageSize:20,
        showSizeChanger:false,
        onShowSizeChange: (current, pageSize)=>{
          console.log(current, pageSize)
        },
        onChange: (current, size) =>{
          SetOrders(null);
          prodSubscr && prodSubscr.unsubscribe();
          prodSubscr = orderService.orders(current).subscribe(res=>{
            SetOrders(res.response.data);
            SetTotalPage(res.response.total)
          })
        }
      }} /></Spin>
      }
       <Modal
          visible={order}
          title={order?.shop_customer?.name}
          //onOk={}
          onCancel={()=>SetOrder(null)}
          footer={[
            <Button key="back" onClick={()=>SetOrder(null)}>
              Cancel
            </Button>,            
          ]}
        >
         <ViewOrder order={order}/>
        </Modal>
    </>);
};


const ListOrders = connect(mapStateToProps)(ListOrdersComponent);

export default ListOrders;
