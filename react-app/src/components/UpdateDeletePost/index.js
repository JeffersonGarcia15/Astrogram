import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { editPost, deletePost } from '../../store/post'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CreateIcon from '@material-ui/icons/Create';
import { getUserInfo } from '../../store/profile'
// import Tippy from '@tippyjs/react'
import { Tooltip } from '@material-ui/core'

function UpdateDeletePost({ postId, setDeleteSwitch, username }) {

    const dispatch = useDispatch()
    const history = useHistory()
    // const { postId } = useParams()
    const post = useSelector(state => state.posts[postId])
    const user = useSelector(state => state.session.user)
    const profiles = useSelector(state => state.profile)
    const [description, setDescription] = useState(post?.description)
    const [showForm, setShowForm] = useState('')
    const [formId, setFormId] = useState(null)

    const updateUserPost = async (e) => {
        e.preventDefault()
        dispatch(editPost({ description, postId }))
        setShowForm(false)
        // history.push('/')
    }
    // useEffect(() => {

    // })

    const deleteSinglePost = async (e) => {
        e.preventDefault()
        let alert = window.confirm("Are you sure you want to delete you post?")
        if (alert) {
            await dispatch(deletePost(postId))
            await dispatch(getUserInfo(username))
            setDeleteSwitch((prev) => !prev)
        }
        // history.push('/')
        // window.location.reload(true)

    }

    const openForm = (post) => {
        setShowForm(true)
        setDescription(post?.description)
        setFormId(post?.id)
    }

    return (
        <div>
            {user?.id === post?.user_id && (
                <div key={post.id}>
                    {/* <button onClick={() => }>FORMID AND POSTIF</button> */}
                    <button onClick={() => openForm(post)}><MoreHorizIcon></MoreHorizIcon></button>
                    {showForm && post.id === formId ? 
                    <div key={post.id}>

                    <form onSubmit={updateUserPost} >
                        <input type='text' value={description} onChange={(e) => setDescription(e.target.value)}></input>
                        <button type='submit'>Save Updates</button>
                        <button onClick={deleteSinglePost}>Delete</button>
                    </form>
                    </div>
                
                : null}

                </div>
            )}
        </div>
    )
}

export default UpdateDeletePost
