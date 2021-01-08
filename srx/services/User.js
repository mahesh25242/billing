/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ajax } from 'rxjs/ajax';
import { map, catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, of, throwError } from 'rxjs';
import config from '../Config/config';

export const isLoggedIn = () =>new BehaviorSubject(null)

export const signIn = (values) => ajax({
    url: `${config.apiUrl}/oauth/token`,
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
      return throwError(error);
    })
  );