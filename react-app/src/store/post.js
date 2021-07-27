const GET_POSTS = 'posts/GET_POSTS'
const GET_USER_POSTS = 'posts/GET_USER_POSTS'
const CREATE_POST = 'posts/CREATE_POST'
const UPDATE_POST = 'posts/UPDATE_POST'
const DELETE_POST = 'posts/DELETE_POST'

const getPosts = posts => ({
    type: GET_POSTS,
    posts
})

const getUserPosts = posts => ({
    type: GET_USER_POSTS,
    posts
})

const addPost = post => ({
    type: CREATE_POST,
    post
})

const updateSinglePost = post => ({
    type: UPDATE_POST,
    post
})

const deleteSinglePost = post => ({
    type: DELETE_POST,
    post
})

export const getAllPosts = () => async (dispatch) => {
    const response = await fetch("/api/posts")

    if (response.ok) {
        const posts = await response.json()
        await dispatch(getPosts(posts))
        return response
    }
}

export const getOwnPosts = (id) => async (dispatch) => {
    const response = await fetch(`/api/posts/user/${id}`)
    if (response.ok) {
        const posts = await response.json()
        dispatch(getUserPosts(posts))
    }
}

export const createPost = (user_id, location_id, description, album_id, picture_url) => async (dispatch) => {
    const formData = new FormData()

    formData.append('user_id', user_id)
    formData.append('location_id', location_id)
    formData.append('description', description)
    formData.append('album_id', album_id)

    if (picture_url) formData.append("image", picture_url)

    const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
            'enctype': 'multipart/form-data'
        },
        body: formData
    })
    const data = await response.json()
    if (data.errors) {
        return data
    }
    dispatch(addPost(data))
    return data

}


export const editPost = post => async (dispatch) => {
    const response = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    if (response.ok) {
        const edit_post = await response.json()
        dispatch(updateSinglePost(edit_post))
    }
}


export const deletePost = postId => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(deleteSinglePost(postId))
    }
}

const initialState = {}

export default function posts(state = initialState, action) {
    let updatedState = {...state}
    switch (action.type) {
        case GET_POSTS: {
            const allPosts = {}
            action.posts.posts.forEach(post => {
                allPosts[post.id] = post
            })
            const newState = {...allPosts }
            return newState
        }
        case GET_USER_POSTS: {
            updatedState[action.post.id] = action.post
            return updatedState
        }
        case CREATE_POST: {
            updatedState[action.post.id] = action.post
            return updatedState
        }
        case UPDATE_POST: {
            updatedState[action.post.id] = action.post
            return updatedState
        }
        case DELETE_POST: {
            delete updatedState[action.post]
            return updatedState
        }
        default:
            return state
    }
}
