/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';
import { ProductService } from '../../services';
import { Button, Form, PageHeader, AutoComplete, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { BillingContent  } from './components';

const { TabPane } = Tabs;


const mapStateToProps = (state: { product: any, cart: any; shop: any,billingTab: any, billingTabs: any }) => {
  return { 
    product: state.product[state.billingTab], 
    cart: state.cart[state.billingTab], 
    shop: state.shop, 
    billingTab: state.billingTab,
    billingTabs: state.billingTabs
   };
};



const BillingComponent:React.FC = (props:any) => {
    const productService = new ProductService();
    const [products, setProducts] = React.useState<any>(null);
    const [tabs, setTabs] = React.useState<string[]>(["Tab 1"]);
    
    const [form] = Form.useForm();
    
    React.useEffect(() => {
      setTabs(props.billingTabs);
      
      const prodSubscr = productService.products().subscribe(res=>{
        setProducts(res.response.data);                    
      });

      
      return () => {
        prodSubscr.unsubscribe();
      };

    }, []);
  
  
      const onEdit = (targetKey:any, action:any) =>{
        let tbs;
        switch(action){
          case 'add':
            setTabs((tab:any) => {
              props.dispatch({ type: 'BILLING_TABS', payload: [...tab, `Tab ${tab.length+1}`] });
              return [...tab, `Tab ${tab.length+1}`];
            });   
                   
          break;
          case 'remove':
            tbs = tabs.filter((tab: any, idx: number) => {              
              return `${idx}` !== targetKey
            });
            setTabs(tbs);
            props.dispatch({ type: 'BILLING_TABS', payload: tbs });
          break;
        }
        
      }
      
      const onTabChange = (key:string) =>{
        props.dispatch({ type: 'SELECTED_BILLING_TAB', payload: key });                
      }
      
    return (<>
      <PageHeader
        className="site-page-header"        
        title={`Billing`}
        subTitle={props.shop.name}
        extra={[
          <Button key="1"><Link to="/products">List Product</Link></Button>,          
        ]}
      />
{
  props.billingTab >= 0 &&
  <Tabs defaultActiveKey={`${props.billingTab}`} type="editable-card" 
onEdit={onEdit} onChange={onTabChange} >
        {
          props.billingTabs.map((tab: string, idx: number) => <TabPane tab={`Tab ${idx+1}`} key={idx} closable={idx > 0}>
            <BillingContent products={products} tabKey={idx}/>
            </TabPane>
          )
        }    
  </Tabs>
}

  
      
      
    </>);
};


const Billing = connect(mapStateToProps)(BillingComponent);
export default Billing;

