/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ajax } from 'rxjs/ajax';
import { map, catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, empty, of, throwError } from 'rxjs';
import config from '../Config/config';

export class ShopService {
 
  

 shop () {
  const tokenStr = localStorage.getItem('token');
  if(!tokenStr) return empty();
  const token = JSON.parse(tokenStr)  
  return ajax({
    url: `${config.apiUrl}/shop`,
    method: 'GET',
    headers: {
      ...config.ajax.header,
      ...{
          'Authorization': `${token.token_type} ${token.access_token}`
      }
  }    
  }).pipe(            
    catchError(error => {                              
      return throwError(error);
    })
  );
 } 
}