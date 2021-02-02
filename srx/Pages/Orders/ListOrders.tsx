/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';
import { OrderService } from '../../services';
import { Button, PageHeader, Table } from 'antd';



import { Link, useRouteMatch } from 'react-router-dom';

import { EditProduct } from './EditProduct';
import { MyBreadcrumb } from '../../SharedComponents';
import { Subscription } from 'rxjs';

const ListOrders = () => {    
    const orderService = new OrderService();
    const [orders, SetOrders] = React.useState(null);
    const [totalPage, SetTotalPage] = React.useState(0);

    const { path, url } = useRouteMatch();    
    let  prodSubscr:Subscription;
    React.useEffect(() => {
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
          render: (text: string, record:any, index:number) => <Link to={`/products/create/${record.id}`}>{record.shop_customer.name}</Link>,
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
       orders &&   <Table dataSource={orders} 
       columns={columns}  rowKey="id" scroll={{ y: 400 }} pagination={{defaultCurrent: 1, 
        total:totalPage,
        pageSize:20,
        showSizeChanger:false,
        onShowSizeChange: (current, pageSize)=>{
          console.log(current, pageSize)
        },
        onChange: (current, size) =>{
          prodSubscr && prodSubscr.unsubscribe();
          prodSubscr = orderService.orders(current).subscribe(res=>{
            SetOrders(res.response.data);
            SetTotalPage(res.response.total)
          })
        }
      }} />
      }
    </>);
};

export default ListOrders;
