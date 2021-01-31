/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { SET_LOGIN, SET_SHOP, 
    REMOVE_LOGIN,
    CHOOSE_PRODUCT, CART_PRODUCTS,
    REMOVE_FROM_CART, UPDATE_CART, 
    EMPTY_CART, BILLING_TABS, 
    SELECTED_BILLING_TAB} from "../constants/action-types";

export const  setLogin = (payload) => {
    return { type: SET_LOGIN, payload }
}
export const  billingTabs = (payload) => {
    return { type: BILLING_TABS, payload }
}
export const  selectedBillingTab = (payload) => {
    return { type: SELECTED_BILLING_TAB, payload }
}

export const  setShop = (payload) => {
    return { type: SET_SHOP, payload }
}
export const  removeLogin = (payload) => {
    return { type: REMOVE_LOGIN, payload }
}
export const  chooseProduct = (payload) => {
    return { type: CHOOSE_PRODUCT, payload }
}
export const  cartProducts = (payload) => {
    return { type: CART_PRODUCTS, payload }
}
export const  removeFromCart = (payload) => {
    return { type: REMOVE_FROM_CART, payload }
}
export const  updateCart = (payload) => {
    return { type: UPDATE_CART, payload }
}
export const  emptyCart = (payload) => {
    return { type: EMPTY_CART, payload }
}




  