import * as React from 'react';
import { AutoComplete, Form, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';

const { Option } = AutoComplete;

interface PAS {
  products?: any,
  //form?: FormInstance,
  setProduct?: any
}


export const ProductAutoSuggest:React.FC<PAS> = (props: PAS) => {
console.log(props)    
  const [options, setOptions] = React.useState<any>(null);

  function onChange(value:any) {

    const res = props.products.filter( (product:any) => product.id == value );
        

    props.setProduct(res[0]);
    
    console.log(`selected ${value}`);
  }
  
  function onBlur() {
    console.log('blur');
  }
  
  function onFocus() {
    console.log('focus');
  }
  
  function onSearch(val:any) {
    console.log('search:', val);
  }
  
  
    return (<Form.Item name="product" label="Product" rules={[{ required: true }]}>
    <Select
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