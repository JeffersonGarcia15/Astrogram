const GET_COMMENTS = 'comments/GET_COMMENTS'
const CREATE_COMMENT = 'comments/CREATE_COMMENT'
const UPDATE_COMMENT = 'comments/UPDATE_COMMENT'
const DELETE_COMMENT = 'comments/DELETE_COMMENT'


const getComments = comments => ({
    type: GET_COMMENTS,
    comments
})

const addComment = comment => ({
    type: CREATE_COMMENT,
    comment
})

const editComment = comment => ({
    type: UPDATE_COMMENT,
    comment
})

const deleteSingleComment = comment => ({
    type: DELETE_COMMENT,
    comment
})


export const getAllComments = () => async (dispatch) => {
    const response = await fetch("/api/comments/")

    if (response.ok) {
        const comments = await response.json()
        await dispatch(getComments(comments))
        return response
    }
}

export const createComment = comment => async (dispatch) => {
    const response = await fetch(`/api/comments/post/${comment.post_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    })
    if (response.ok) {
        const newComment = await response.json()
        dispatch(addComment(newComment))
    }
}

export const updateComment = (user_id, post_id, body, comment_id) => async (dispatch) => {
    const response = await fetch(`/api/comments/${comment_id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_id, post_id, body})
    })
    if (response.ok) {
        const updatedComment = await response.json()
        dispatch(editComment(updatedComment))

    }
}


export const deleteComment = comment_id => async (dispatch) => {
    const response = await fetch(`/api/comments/${comment_id}`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(deleteSingleComment(comment_id))
    }
}



const initialState = {}

export default function comments(state = initialState, action) {
    let updatedState = { ...state }
    switch (action.type) {
        case GET_COMMENTS: {
            const allComments = {}
            action.comments.comments.forEach(comment => {
                allComments[comment.id] = comment
            })
            const newState = { ...allComments }
            return newState
        }
        case CREATE_COMMENT: {
            updatedState[action.comment.id] = action.comment
            return updatedState
        }
        case UPDATE_COMMENT: {
            updatedState[action.comment.id] = action.comment
            return updatedState
        }
        case DELETE_COMMENT: {
            delete updatedState[action.comment]
            return updatedState
        }
        default:
            return state
    }
}

