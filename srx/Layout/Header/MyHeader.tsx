import React from 'react';

// eslint-disable-next-line import/no-duplicates
import {  Menu } from 'antd';


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const MyHeader = () => <>
    <div className="logo" />
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
    </Menu>
</>;

export default MyHeader;