import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import { getAllComments, createComment, updateComment, deleteComment } from '../../store/comment'
import { getAllPosts } from '../../store/post';
import SendIcon from '@material-ui/icons/Send';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


function Comments({post_id}) {
    const dispatch = useDispatch()
    // const { post_id } = useParams()
    const [errors, setErrors] = useState([])
    const user = useSelector(state => state.session.user)
    const comments = useSelector(state => state.comments)
    const posts = useSelector(state => state.posts)
    const [body, setBody] = useState('')
    const [newComment, setNewComment] = useState('')
    const [showForm, setShowForm] = useState('')
    const [formId, setFormId] = useState(null)
    const comment = Object.values(comments)

    useEffect(() => {
        dispatch(getAllComments())
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    const userComment = async (e) => {
        e.preventDefault()
        dispatch(createComment({
            user_id: user.id,
            post_id: post_id,
            body: newComment
        }))
        window.location.reload(true)
    }


    const editAComment = async (comment_id, body, e) => {
        e.preventDefault()
        const data = await dispatch(updateComment(user.id, post_id, body, comment_id))
        setShowForm(false)
        window.location.reload(true)

    }

    const deleteAComment = (comment_id) => {
        let alert = window.confirm('Are you sure you want to delete your comment?')
        if (alert) {
            dispatch(deleteComment(comment_id))
        }
    }

    const openForm = (comment) => {
        setShowForm(true)
        setBody(comment.body)
        setFormId(comment.id)

    } 

    // console.log('{{{{{{{{{{{{{{{{{{{', post_id);

    return (
        <div>
            {Object.values(comments).map(comment => (
                <div>
                    {/* <button onClick={() => console.log('fpierjhfdwondjlwhjfewij', post_id)}>CLOIJCOJND</button> */}
                    {post_id === comment.post_id && (
                        <div>
                            <p>{comment.username}</p>
                            <p>{comment.body}</p>
                            {user.id === comment.user_id && (
                                <div>
                                    <button onClick={() => openForm(comment)}>Edit Comment</button>
    
                                    {showForm&& comment.id === formId ? 
                                    <form onSubmit={(e) => editAComment(comment.id, body, e)} key={comment.id}>
                                        <textarea value={body} onChange={(e) => setBody(e.target.value)} ></textarea>
                                        <button type="submit" onSubmit={(e) => editAComment(comment.id, body, e)} >
                                                <SendIcon></SendIcon>
                                        </button>
                                        <button onClick={() => deleteAComment(comment.id)}>
                                            <DeleteForeverIcon></DeleteForeverIcon>
                                        </button>
                                    </form>
                                
                                
                                :null}
                                </div>
                            )}

                        </div>
                    )}
                    <div>
                        
                    </div>
                </div>
            ))}
            <form onSubmit={userComment}>
                <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} cols="30" rows="10" ></textarea>
            <div>
                <button type="submit">Submit</button>
            </div>
            </form>
        </div>
    )
}

export default Comments
