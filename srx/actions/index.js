/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { SET_LOGIN, REMOVE_LOGIN,
    CHOOSE_PRODUCT, CART_PRODUCTS,
    REMOVE_FROM_CART, UPDATE_CART, 
    EMPTY_CART} from "../constants/action-types";

export const  setLogin = (payload) => {
    return { type: SET_LOGIN, payload }
}
export const  RemoveLogin = (payload) => {
    return { type: REMOVE_LOGIN, payload }
}
export const  ChooseProduct = (payload) => {
    return { type: CHOOSE_PRODUCT, payload }
}
export const  CartProducts = (payload) => {
    return { type: CART_PRODUCTS, payload }
}
export const  RemoveFromCart = (payload) => {
    return { type: REMOVE_FROM_CART, payload }
}
export const  UpdateCart = (payload) => {
    return { type: UPDATE_CART, payload }
}
export const  EmptyCart = (payload) => {
    return { type: EMPTY_CART, payload }
}




  