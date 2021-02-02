/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ajax } from 'rxjs/ajax';
import { map, catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, of, throwError } from 'rxjs';
import config from '../Config/config';

export class OrderService {
 
 

 orders (page= 1, postData = null) {
     const tokenStr = localStorage.getItem('token');
     const token = JSON.parse(tokenStr)
  return ajax({
    url: `${config.apiUrl}/shop/orders${(page) ? `?page=${page}` : ''}`,
    method: 'POST',
    headers: {
        ...config.ajax.header,
        ...{
            'Authorization': `${token.token_type} ${token.access_token}`
        }
    },
    body: postData
  }).pipe(            
    catchError(error => {                              
      return throwError(error);
    })
  );
 } 

}