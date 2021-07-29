import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import { getAllComments } from '../../store/comment'


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
        </div>
    )
}

export default Comments
