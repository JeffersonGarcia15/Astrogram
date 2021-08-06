const USER_INFO = 'profile/USER_INFO'
const ALL_USERS = 'profile/ALL_USERS'

const userInfo = user => ({
    type: USER_INFO,
    payload: user
})

const allUsers = users => ({
    type: ALL_USERS,
    users
})


export const getAllUsers = () => async (dispatch) => {
    const response = await fetch("api/users")

    if (response.ok) {
        const users = await response.json()
        await dispatch(allUsers(users))
        return response
    }
}

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
        case ALL_USERS: {
            const allUsers = {}
            action.users.users.forEach(user => {
                allUsers[user.id] = user
            })
            const newState = { ...allUsers }
            return newState
        }

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

