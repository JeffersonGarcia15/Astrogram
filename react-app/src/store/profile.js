const USER_INFO = 'profile/USER_INFO'

const userInfo = user => ({
    type: USER_INFO,
    payload: user
})

export const getUserInfo = username => async (dispatch) => {
    const response = await fetch(`/api/users/${username}`)
    const user = await response.json()
    dispatch(userInfo(user))
}

const initialState = {}

export default function profile(state = initialState, action) {
    let updatedState = { ...state }
    let newState;
    switch (action.type) {
        case USER_INFO: {
            // updatedState[action.user.id] = action.user
            // return updatedState
            newState = Object.assign({}, state)
            newState.user = action.payload
            return newState
        }
        default:
            return state;
    }
}

