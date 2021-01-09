/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SET_LOGIN, REMOVE_LOGIN } from "../constants/action-types";


const initialState = {
    token: {},    
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
  
    return state;
  };
  
  export default rootReducer;
  