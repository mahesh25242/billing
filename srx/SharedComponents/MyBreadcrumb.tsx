/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';
import {   Breadcrumb } from 'antd';

import { remote } from 'electron';
import Item from 'antd/lib/list/Item';
import { Link } from 'react-router-dom';

export const MyBreadcrumb = (props: any) => {
    return (<Breadcrumb style={{ margin: '16px 0' }}>{
        props.items && props.items.map((itm :any, index:number) => <Breadcrumb.Item key={index}>
            {
                itm.to && <Link to={itm.to}>{itm.name}</Link> ||
                !itm.to && itm.name
            }            
            </Breadcrumb.Item>)
    }
                </Breadcrumb>);
};
