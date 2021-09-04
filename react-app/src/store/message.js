const GET_MESSAGES = "messages/GET_MESSAGES";
const CREATE_MESSAGE = 'messages/CREATE_MESSAGE'
const DELETE_MESSAGE = 'messages/DELETE_MESSAGE'

const getMessages = (messages) => ({
    type: GET_MESSAGES,
    messages
})

const addMessage = (message) => ({
    type: CREATE_MESSAGE,
    message
})

const removeMessage = (message) => ({
    type: DELETE_MESSAGE,
    message
})

export const getAllMessages = (userId, otherUserId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/messages/${otherUserId}`)
    if (response.ok) {
        const messages = await response.json()
        await dispatch(getMessages(messages))
        return messages

    }
}

export const getMessage = (messageId) => async (dispatch) => {
    const response = await fetch(`/api/messages/${messageId}`)
    if (response.ok) {
        const message = await response.json()
        await dispatch(addMessage(message))
        return message
    }
}

export const receiveMessage = (message) => async (dispatch) => {

    if (message) {
        dispatch(addMessage(message))
    }
}

export const deleteMessage = (messageId) => async (dispatch) => {
    const response = await fetch(`/api/messages/${messageId}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        dispatch(removeMessage(messageId))
        return response

    }
}

const initialState = {}

export default function messages(state = initialState, action) {
    let updatedState = { ...state }
    switch (action.type) {
        case GET_MESSAGES:
            return {...action.messages}
        case CREATE_MESSAGE:
            updatedState[action.message.id] = action.message
            return updatedState
        case DELETE_MESSAGE:
            delete updatedState[action.message.id]
            return updatedState
        default:
            return state;
    }
}