import * as React from 'react';

import { Form, Input, Button, Checkbox } from 'antd';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Login = () => {

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    
    const onFinish = (values: any) => {
        console.log('Success:', true);
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
        <Button type="primary" htmlType="submit">
            Submit
        </Button>
    </Form.Item>
</Form>);
};

export default Login;