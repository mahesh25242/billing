/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState} from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import { Link } from "react-router-dom";

import { Form, Input, Button, Checkbox, message } from 'antd';
import { signIn, isLoggedIn } from '../../services';
import { connect } from "react-redux";


const mapStateToProps = (state: { token: any;  }) => {
    return { token: state.token };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const LoginComponent = (props : any) => {
    const history = useHistory();
    const [loading, SetLoading ] = useState(false);
    const storageCredentials = localStorage.getItem("credentials");    
    const credentials = (storageCredentials) ?  JSON.parse(storageCredentials) : {};
    

   
    
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    
    const onFinish = (values: any) => {
        
        SetLoading(true);
       
        
        signIn(values).subscribe(res=> {
            isLoggedIn().next(true);
            SetLoading(false)
            if(values.remember){
                localStorage.setItem("credentials", JSON.stringify(values));
            }else{
                localStorage.removeItem("credentials");
            }    
            
            props.dispatch({ type: 'SET_LOGIN', payload: res.response });   
            
            localStorage.setItem("token", JSON.stringify(res.response));

            history.replace('/home');
          }, error=>{
            isLoggedIn().next(false);
            SetLoading(false)
            message.error('Sorry login credential was wrong');
          })
        
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    return (<Form
        {...layout}
        style={{ margin: '16px 0' }}
        name="basic"
        initialValues={{ ...credentials, remember: true }}
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
        
            <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password placeholder="Please enter password" />
            </Form.Item>
        
            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
            </Form.Item>
        
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Sign In
                </Button>
            </Form.Item>
            <Link to="/forgotPassword">Forgot password</Link>
        </Form>);


};


const Login = connect(mapStateToProps)(LoginComponent);
export default Login;
