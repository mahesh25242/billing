/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SET_LOGIN, REMOVE_LOGIN, 
CHOOSE_PRODUCT, CART_PRODUCTS } from "../constants/action-types";


const initialState = {
    token: {}, 
    product: {},
    cart: []   
  };
  
  const  rootReducer = (state = initialState, action) => {
    if (action.type === SET_LOGIN) {      
        return Object.assign({}, state, {
          token: {...state.token, ...action.payload}
        });
    }    
    if (action.type === REMOVE_LOGIN) {      
      return Object.assign({}, state, {
        token: action.payload
      });
    }   
    if (action.type === CHOOSE_PRODUCT) {      
      return Object.assign({}, state, {
        product: {...state.product, ...action.payload}
      });
    }   
    if (action.type === CART_PRODUCTS) {      
      return Object.assign({}, state, {
        cart: [...state.cart, action.payload]
      });
    }  
  
    return state;
  };
  
  export default rootReducer;
  