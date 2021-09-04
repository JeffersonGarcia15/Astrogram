const CREATE_FOLLOWER = 'followers/CREATE_FOLLOWER'
const DELETE_FOLLOWER = 'followers/DELETE_FOLLOWER'

const addFollower = follower => ({
    type: CREATE_FOLLOWER,
    follower
})

const deleteSingleFollower = follower => ({
    type: DELETE_FOLLOWER,
    follower
})



export const createFollower = (follower_id, followed_id) => async (dispatch) => {
    const response = await fetch(`/api/follows/user/${followed_id}/follower`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({follower_id, followed_id})
    })
    if (response.ok) {
        const newFollower = await response.json()
        dispatch(addFollower(newFollower))
    }

}

export const deleteFollower = (follower_id, followed_id) => async (dispatch) => {
    const response = await fetch(`/api/follows/user/${followed_id}/follower/delete`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( {follower_id, followed_id} )

    })
    if (response.ok) {
        dispatch(deleteSingleFollower(follower_id, followed_id ))
        return response

    }

}

const initialState = {}

export default function followers(state = initialState, action) {
    let updatedState = { ...state }
    switch (action.type) {
        case CREATE_FOLLOWER: {
            updatedState[action.follower.id] = action.follower
            return updatedState
        }
        case DELETE_FOLLOWER: {
            const newState = {}
            Object.values(state).forEach(follower => {
                if (follower.followed_id !== action.follower) {
                    newState[follower.followed_id] = follower
                }
            })
            return newState
        }
        default:
            return state
    }
}