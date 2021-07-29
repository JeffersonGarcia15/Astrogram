import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import { getAllComments, createComment } from '../../store/comment'


function Comments({post_id}) {
    const dispatch = useDispatch()
    // const { } = useParams()
    const user = useSelector(state => state.session.user)
    const comments = useSelector(state => state.comments)
    const [body, setBody] = useState('')
    const [newComment, setNewComment] = useState('')
    const [showForm, setShowForm] = useState('')
    const comment = Object.values(comments)

    useEffect(() => {
        dispatch(getAllComments())
    }, [dispatch])

    const userComment = async (e) => {
        e.preventDefault()
        dispatch(createComment({
            user_id: user.id,
            post_id: post_id,
            body: newComment
        }))
    }

    return (
        <div>
            {Object.values(comments).map(comment => (
                <div>
                    <div>
                        <p>{comment.username}</p>
                        <p>{comment.body}</p>
                        
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
