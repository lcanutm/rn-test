import { SET_PROFILE ,DESTROY_SESSION} from "./actionTypes"

export const onLogout = () => {
    return {
        type: DESTROY_SESSION
    }
}

export const setProfile = (profile) => {
    return {
        type: SET_PROFILE,
        payload: profile
    }
}

