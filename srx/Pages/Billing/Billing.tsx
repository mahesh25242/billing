/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';
import { ProductService } from '../../services';
import { Button, Form, PageHeader, AutoComplete, Tabs, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { BillingContent  } from './components';

const { TabPane } = Tabs;

const { confirm } = Modal;

const mapStateToProps = (state: { product: any, cart: any; shop: any,billingTab: any, billingTabs: any }) => {
  return { 
    product: state.product[state.billingTab], 
    cart: state.cart[state.billingTab], 
    shop: state.shop, 
    billingTab: state.billingTab,
    billingTabs: state.billingTabs,
    fullCart: state.cart
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
        const remobeTab = () =>{
          tbs = tabs.filter((tab: any, idx: number) => {              
            return `${idx}` !== targetKey
          });
          setTabs(tbs);
          props.dispatch({ type: 'SELECTED_BILLING_TAB', payload: (tbs.length - 1) });
          props.dispatch({ type: 'BILLING_TABS', payload: tbs });
          props.dispatch({ type: 'EMPTY_CART', payload: targetKey}); 
          props.dispatch({ type: 'CHOOSE_PRODUCT', payload: null}); 

              
        }
        switch(action){
          case 'add':
            setTabs((tab:any) => {
              props.dispatch({ type: 'BILLING_TABS', payload: [...tab, `Tab ${tab.length+1}`] });
              return [...tab, `Tab ${tab.length+1}`];
            });   
            props.dispatch({ type: 'SELECTED_BILLING_TAB', payload: tabs.length });               
          break;
          case 'remove':
            
            if(props.fullCart[targetKey] && props.fullCart[targetKey].length){
              confirm({
                title: 'Are you sure you want close this?',
                icon: <ExclamationCircleOutlined />,
                content: `${props.fullCart[targetKey].length} product was in bag and not took print`,
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk() {
                  remobeTab();
                },
                onCancel() {
                  console.log('Cancel');
                },
              });
            }else{
              remobeTab()
            }
            
          break;
        }
        
      }
      
      const onTabChange = (key:string) =>{
        props.dispatch({ type: 'SELECTED_BILLING_TAB', payload: key });                
      }
      
    return (<>
      <PageHeader
        className="site-page-header"        
        title={`Billing [ Tab ${parseInt(props.billingTab)+1} ]`}
        subTitle={props.shop.name}
        extra={[
          <Button key="1"><Link to="/orders">List Orders</Link></Button>,          
        ]}
      />
{
  props.billingTab >= 0 &&
  <Tabs activeKey={`${props.billingTab}`} type="editable-card" 
onEdit={onEdit} onChange={onTabChange} >
        {
          props.billingTabs.map((tab: string, idx: number) => <TabPane tab={`Tab ${idx+1}  ${ (props.fullCart[idx] && props.fullCart[idx].length) ? `( ${props.fullCart[idx].length} )`:`` } `} key={idx} closable={idx > 0}>
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

