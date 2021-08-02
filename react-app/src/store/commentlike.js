const GET_COMMENTLIKES = "commentLikes/GET_COMMENTLIKES"
const ADD_COMMENTLIKE = "commentLikes/ADD_COMMENTLIKE"
const DELETE_COMMENTLIKE = "commentLikes/DELETE_COMMENTLIKE"

const getCommentLikes = commentLikes => ({
    type: GET_COMMENTLIKES,
    commentLikes
})

const addCommentLike = commentLike => ({
    type: ADD_COMMENTLIKE,
    commentLike
})

const deleteCommentLike = commentLike => ({
    type: DELETE_COMMENTLIKE,
    commentLike
})

export const getAllCommentLikes = () => async (dispatch) => {
    const response = await fetch("/api/commentlikes/")

    if (response.ok) {
        const likes = await response.json()
        await dispatch(getCommentLikes(likes))
        return response
    }
}

export const createCommentLike = commentLike => async (dispatch) => {
    const response = await fetch("/api/commentlikes/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(commentLike)
    })
    if (response.ok) {
        const newCommentLike = await response.json()
        dispatch(addCommentLike(newCommentLike))
    }
}

export const deleteACommentLike = (commentlike_id) => async (dispatch) => {
    const response = await fetch(`api/commentlikes/${commentlike_id}`, {
        method: "DELETE",
    })
    if (response.ok) {
        dispatch(deleteCommentLike(commentlike_id))
        console.log('AFTER THE DELETE THUNK @@@@@@@@@@@@@@@@@@@@', commentlike_id)
    }
    console.log('DELETE THUNK^^^^^^^^^^^^^^^^^^^^^^^^^^', commentlike_id)
}

const initialState = {}

export default function commentLikes(state = initialState, action) {
    let updatedState = { ...state }
    switch (action.type) {
        case GET_COMMENTLIKES: {
            const allCommentLikes = {}
            action.commentLikes.commentLikes.forEach(commentlike => {
                allCommentLikes[commentlike.id] = commentlike
            })
            const newState = { ...allCommentLikes}
            return newState
        }
        case ADD_COMMENTLIKE:
            updatedState[action.commentLike.id] = action.commentLike
            return updatedState
        case DELETE_COMMENTLIKE:
            delete updatedState[action.commentLike.id]
            return updatedState
        default:
            return state
    }
}

