import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { editPost, deletePost } from '../../store/post'

function UpdateDeletePost({postId}) {

    const dispatch = useDispatch()
    const history = useHistory()
    // const { postId } = useParams()
    const post = useSelector(state => state.posts[postId])
    const user = useSelector(state => state.session.user)
    const [description, setDescription] = useState(post?.description)
    console.log('%%%%%%%FROM UPDATEDELETE', user);
    // console.log('@@@@@FROM POSTID', post.description);

    const updateUserPost = async (e) => {
        e.preventDefault()
        dispatch(editPost({description, postId}))
        // history.push('/')
    }

    const deleteSinglePost = async () => {
        // e.preventDefault()
        let alert = window.confirm("Are you sure you want to delete you post?")
        if (alert) {
            await dispatch(deletePost(postId))
        }
        // history.push('/')
    }

    return (
        <div>
            {user.id === post.user_id && (
                <form onSubmit={updateUserPost}>
                    <input type='text' value={description} onChange={(e) => setDescription(e.target.value)}></input>
                    <button type='submit'>Save Updates</button>
                    <button onClick={deleteSinglePost}>Delete</button>
                </form>
            )}
        </div>
    )
}

export default UpdateDeletePost
