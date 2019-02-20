import {
    ENABLE_BUTTON,
    DISABLE_BUTTON
} from './types'

export const enableButton = (list) => {
    return {
        type: ENABLE_BUTTON,
        payload: list
    }
}

export const disableButton = (list) => {
    return {
        type: DISABLE_BUTTON,
        payload: list
    }
}