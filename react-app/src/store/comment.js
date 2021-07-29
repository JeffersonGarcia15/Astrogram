const GET_COMMENTS = 'comments/GET_COMMENTS'


const getComments = comments => ({
    type: GET_COMMENTS,
    comments
})


export const getAllComments = () => async (dispatch) => {
    const response = await fetch("/api/comments")

    if (response.ok) {
        const comments = await response.json()
        await dispatch(getComments(comments))
        return response
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
        default:
            return state
    }
}

