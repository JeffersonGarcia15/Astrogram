const GET_LIKES = "likes/GET_LIKES"
const ADD_POSTLIKE = "likes/ADD_POSTLIKE"
const DELETE_POSTLIKE = "likes/DELETE_POSTLIKE"
const GET_SINGLE_LIKE = "likes/GET_SINGLE_LIKE"
const UNLOAD_POSTLIKES = "likes/UNLOAD_POSTLIKES"

const getLikes = likes => ({
    type: GET_LIKES,
    likes
})

const addPostLike = like => ({
    type: ADD_POSTLIKE,
    like
})

const deletePostLike = like => ({
    type: DELETE_POSTLIKE,
    like
})

const getSingleLike = like => ({
    type: GET_SINGLE_LIKE,
    like
})

export const unloadPostLikes = () => ({
    type: UNLOAD_POSTLIKES
})


export const getASingleLike = (user_id, post_id) => async (dispatch) => {
    const response = await fetch(`/api/likes/${user_id}/post/${post_id}`)
    if (response.ok){
        const like = await response.json()
        dispatch(getSingleLike(like))
        return response
    }
}

export const getAllLikes = () => async (dispatch) => {
    const response = await fetch("/api/likes/")

    if (response.ok) {
        const likes = await response.json()
        await dispatch(getLikes(likes))
        return response
    }
}

export const createPostLike = like => async (dispatch) => {
    const response = await fetch("/api/likes/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(like)
    })
    if (response.ok) {
        const newLike = await response.json()
        dispatch(addPostLike(newLike))
        console.log('WE MADE IT AFTER POSTLIKE DISPATCH', newLike)
    }
    console.log('ARE WE MAKING IT TO CREATEPOSTLIKE THUNK???', like)
}

export const deleteAPostLike = (like_id) => async (dispatch) => {
    const response = await fetch(`api/likes/${like_id}`, {
        method: "DELETE",
    })
    if (response.ok) {
        dispatch(deletePostLike(like_id))
        console.log('If this prints then it deleted the like', like_id)

    }
    console.log('Made it to the delete thunk')

}

const initialState = {}

export default function postLikes(state = initialState, action) {
    let updatedState = { ...state }
    switch (action.type) {
        case GET_LIKES: {
            const allLikes = {}
            action.likes.likes.forEach(like => {
                allLikes[like.id] = like
            })
            const newState = { ...allLikes }
            return newState
        }
        case GET_SINGLE_LIKE: {
            updatedState[action.like.id] = action.like
            return updatedState
        }
        case ADD_POSTLIKE:
            updatedState[action.like.id] = action.like
            return updatedState
        case DELETE_POSTLIKE:
            delete updatedState[action.like.id]
            return updatedState
        default:
            return state
    }
}

