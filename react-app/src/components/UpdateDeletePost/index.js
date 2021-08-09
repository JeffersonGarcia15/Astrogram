import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { editPost, deletePost } from '../../store/post'
import { getUserInfo } from '../../store/profile'

function UpdateDeletePost({ postId, setDeleteSwitch, username, setShowModal }) {

    const dispatch = useDispatch()
    const post = useSelector(state => state.posts[postId])
    const user = useSelector(state => state.session.user)
    const [description, setDescription] = useState(post?.description)

    const updateUserPost = async (e) => {
        e.preventDefault()
        dispatch(editPost({ description, postId }))
        setShowModal(false)
    }

    const deleteSinglePost = async (e) => {
        e.preventDefault()
        let alert = window.confirm("Are you sure you want to delete you post?")
        if (alert) {
            await dispatch(deletePost(postId))
            await dispatch(getUserInfo(username))
            setDeleteSwitch((prev) => !prev)
        }

    }


    return (
        <div>
            {user?.id === post?.user_id && (
                <div key={post.id}>

                    <div key={post.id}>

                        <form onSubmit={updateUserPost} className="modal-edit">
                            <h3>Edit your description</h3>
                            <div className="input-edit">
                                <input type='text'
                                    placeholder="Enter a new description..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}></input>
                                <button type='submit'>Save Updates</button>
                            </div>
                            <button onClick={deleteSinglePost}>Delete Post</button>
                        </form>
                    </div>


                </div>
            )}
        </div>
    )
}

export default UpdateDeletePost
