import * as React from 'react';
import { AutoComplete, Form, Select, Spin } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { connect } from 'react-redux';

const { Option } = AutoComplete;

// interface PAS {
//   products?: any,
//   //form?: FormInstance,
//   setProduct?: any,
//   dispatch: any,
//   product: any
// }

const mapStateToProps = (state: { product: any;billingTab: any  }) => {
  return { product: state.product[state.billingTab] };
};

const ProductAutoSuggestComponent:React.FC<any> = (props: any) => {
  
    

  React.useEffect(() => {
    
    props.form.setFieldsValue({
      product: props.product?.id
    })

  }, [props.product]);


  const onChange = (value:any) => {

    const res = props.products.filter( (product:any) => product.id == value );
        
    const product = res[0] ?? null;
    
    
    if(product)
      product.selectedVarient = {...product.shop_product_primary_variant, quantity: 1};    
      props.dispatch({ type: 'CHOOSE_PRODUCT', payload: product });     
  }
  
  const onBlur =() => {
    //console.log('blur');
  }
  
  const  onFocus = () => {
    //console.log('focus');
  }
  
  const onSearch = (val:any) => {
    //console.log('search:', val);
  }
  
  
    return (
      <Spin spinning={!props.products}>
    <Form.Item name="product" label="Product" rules={[{ required: true }]}>
    <Select
      autoFocus
      showSearch      
      placeholder="Select a option and change input text above"
      // onChange={onGenderChange}      
      allowClear
      optionFilterProp="children"
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onSearch={onSearch}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }

    >
      {
        props.products && props.products.map((product:any) => <Option key={product.id} value={product.id}>{product.name}</Option>)
      }
      
    </Select>
  </Form.Item></Spin>);
}


export const ProductAutoSuggest = connect(mapStateToProps)(ProductAutoSuggestComponent);

