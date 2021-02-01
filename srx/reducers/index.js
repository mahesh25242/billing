/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SET_LOGIN, REMOVE_LOGIN, 
CHOOSE_PRODUCT, CART_PRODUCTS,
REMOVE_FROM_CART, UPDATE_CART, 
EMPTY_CART, SET_SHOP, BILLING_TABS, 
SELECTED_BILLING_TAB} from "../constants/action-types";


const initialState = {
    token: {}, 
    shop:{},
    billingTab:0,
    billingTabs:["Tab 1"],
    product: {},
    cart: {}   
  };
  
  const  rootReducer = (state = initialState, action) => {
    if (action.type === SET_LOGIN) {      
        return Object.assign({}, state, {
          token: {...state.token, ...action.payload}
        });
    }    
    if (action.type === SET_SHOP) {      
        return Object.assign({}, state, {
          shop: {...state.shop, ...action.payload}
        });
    }    
    if (action.type === REMOVE_LOGIN) {      
      return Object.assign({}, state, {
        token: action.payload
      });
    }   
    if (action.type === BILLING_TABS) {      
        return Object.assign({}, state, {
          billingTabs:  action.payload
        });
    }
    if (action.type === SELECTED_BILLING_TAB) {      
        return Object.assign({}, state, {
          billingTab: action.payload
        });
    }
    
    if (action.type === CHOOSE_PRODUCT) { 
      
      if(action.payload){
        return Object.assign({}, state, {
          product: {...state.product, ...{ [state.billingTab]: action.payload}}
        });
      }else{
        return Object.assign({}, state, {
          product: {}
        });
      }      
    }   
    if (action.type === CART_PRODUCTS) {   
        
      


        if(state.cart[state.billingTab]){

          const exists = state.cart[state.billingTab].findIndex(x => x.id === action.payload.id && x.selectedVarient.id == action.payload.selectedVarient.id);
          if(exists >= 0){
            state.cart[state.billingTab].map(x=>{
              if(x.id === action.payload.id && x.selectedVarient.id == action.payload.selectedVarient.id){
                x.selectedVarient.quantity = x.selectedVarient.quantity+action.payload.selectedVarient.quantity ;                
              }
            })
          }else{
            state.cart[state.billingTab] = [...state.cart[state.billingTab], ...[action.payload]]
          }
          

          return Object.assign({}, state, {
            cart: {...state.cart,  ...{ [state.billingTab]: [...state.cart[state.billingTab]]  }   }
          });
        }else{
          return Object.assign({}, state, {
            cart: {...state.cart,  ...{ [state.billingTab]: [...[action.payload]]  }   }
          });
        }

          
 
      
    }  
    if (action.type === REMOVE_FROM_CART) {       
      const cart = state.cart[state.billingTab].filter((product) => product.id != action.payload.id || ( product.id == action.payload.id && product.selectedVarient.id != action.payload.selectedVarient.id))        
      return Object.assign({}, state, {
        cart: {...state.cart,  ...{ [state.billingTab]: cart  }   }
      });
    }   
    if (action.type === UPDATE_CART) {             
      state.cart[state.billingTab].map(x=>{
        if(x.id === action.payload.id && x.selectedVarient.id == action.payload.selectedVarient.id){
          x.selectedVarient.quantity = action.payload.selectedVarient.quantity ;
        }
      })
      return Object.assign({}, state, {
        cart: {...state.cart,  ...{ [state.billingTab]: [...state.cart[state.billingTab]]  }   }
      });      
      
    }   
    if (action.type === EMPTY_CART) {             
      return Object.assign({}, state, {
        cart: []
      });            
    }   
      
    return state;
  };
  
  export default rootReducer;
  