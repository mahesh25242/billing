/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { useHistory } from 'react-router-dom';


import { Form, Input, Button, Checkbox, message } from 'antd';

import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import config from '../../Config/config';

import {    
    Link   
  } from "react-router-dom";

  
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ForgotPassword = () => {
    const history = useHistory();

    
    
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    
    const onFinish = (values: any) => {
        

        const users$ = ajax({
            url: 'http://localhost/cart/api/public/v1/oauth/token',
            method: 'POST',
            headers: config.ajax.header,
            body: {                 
                ...config.ajax.signBody,
                ...{ 
                    "password":values.password,    
                    "username":values.username,
                }
            }
          }).pipe(            
            catchError(error => {
                message.error('Sorry login credential was wrong');

              console.log('error: ', error);
              return of(error);
            })
          );

          
        
          users$.subscribe(res=> {
            if(values.remember){
                localStorage.setItem("credentials", JSON.stringify(values));
            }else{
                localStorage.removeItem("credentials");
            }              
            history.push('/home');
          })
        
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


return (<Form
{...layout}
style={{ margin: '16px 0' }}
name="basic"
initialValues={{ remember: true }}
onFinish={onFinish}
onFinishFailed={onFinishFailed}
>
    <Form.Item
    label="Username"
    name="username"
    rules={[{ required: true, message: 'Please input your username!' }]}
    >
        <Input autoFocus={true} placeholder="Please enter username" />
    </Form.Item>


    <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
            Submit
        </Button>
    </Form.Item>
    <Link to="/">Back to Login</Link>
</Form>);
};

export default ForgotPassword;