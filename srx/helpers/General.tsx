/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';

export const useFocus = () => {
    const htmlElRef = React.useRef(null)
    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}

    return [ htmlElRef, setFocus ] 
}

