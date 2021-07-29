const GET_COMMENTS = 'comments/GET_COMMENTS'
const CREATE_COMMENT = 'comments/CREATE_COMMENT'


const getComments = comments => ({
    type: GET_COMMENTS,
    comments
})

const addComment = comment => ({
    type: CREATE_COMMENT,
    comment
})


export const getAllComments = () => async (dispatch) => {
    const response = await fetch("/api/comments")

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
        console.log('TO CHECK IF THE POST IS OK AND RESPONSE IS OK', newComment);
    }
    console.log('COMMENT MAKING IT TO THE THUNK COMMENT', comment);
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
        default:
            return state
    }
}

