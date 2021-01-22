import * as React from 'react';
import { AutoComplete, Form, Select } from 'antd';
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

const mapStateToProps = (state: { product: any;  }) => {
  return { product: state.product };
};

const ProductAutoSuggestComponent:React.FC<any> = (props: any) => {
  const [options, setOptions] = React.useState<any>(null);

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
  
  
    return (<Form.Item name="product" label="Product" rules={[{ required: true }]} initialValue={props.product.id}>
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
  </Form.Item>);
}


export const ProductAutoSuggest = connect(mapStateToProps)(ProductAutoSuggestComponent);

