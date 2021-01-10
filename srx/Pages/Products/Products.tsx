/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';
import { ProductService } from '../../services';

const Products = () => {
    const productService = new ProductService();
    productService.products().subscribe(res=>{
        console.log(res)
    })
    return (<div>Products Page</div>);
};

export default Products;
