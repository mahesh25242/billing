/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { SET_LOGIN } from "../constants/action-types";

export const  setLogin = (payload) => {
    return { type: SET_LOGIN, payload }
}



  