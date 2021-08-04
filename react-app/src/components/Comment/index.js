import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import { getAllComments, createComment, updateComment, deleteComment } from '../../store/comment'
import { getAllPosts } from '../../store/post';
import { getAllCommentLikes, createCommentLike, deleteACommentLike, unloadCommentLikes } from '../../store/commentlike';
import SendIcon from '@material-ui/icons/Send';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FavoriteIcon from '@material-ui/icons/Favorite';



function Comments({post_id}) {
    const dispatch = useDispatch()
    // const { post_id } = useParams()
    const [errors, setErrors] = useState([])
    const user = useSelector(state => state.session.user)
    const comments = useSelector(state => state.comments)
    const posts = useSelector(state => state.posts)
    const commentLikes = useSelector(state => state.commentLikes)
    const [comment_id, setCommentId] = useState(0)
    const [body, setBody] = useState('')
    const [newComment, setNewComment] = useState('')
    const [showForm, setShowForm] = useState('')
    const [formId, setFormId] = useState(null)
    const comment = Object.values(comments)
    const [commentLike, setCommentLike] = useState(false)
    const likesInCommentFunction = Object.values(commentLikes)?.filter(like => like?.comment_id == comment_id) // in this case this has comment_id and user_id
    const isCommentLikedFunction = likesInCommentFunction?.some(like => like.user_id == user.id)
    const [deleteSwitch, setDeleteSwitch] = useState(false)


    useEffect(() => {
        if (isCommentLikedFunction) {
            setCommentLike(true)
        }
        else {
            setCommentLike(false)
        }
        dispatch(getAllComments())
        dispatch(getAllCommentLikes())
        dispatch(getAllPosts())
        return () => dispatch(unloadCommentLikes)
    }, [dispatch, deleteSwitch])

    // useEffect(() => {
    // }, [dispatch])

    const userComment = async (e) => {
        e.preventDefault()
        await dispatch(createComment({
            user_id: user.id,
            post_id: post_id,
            body: newComment
        }))
        setNewComment('')
        // window.location.reload(true)
    }


    const editAComment = async (comment_id, body, e) => {
        e.preventDefault()
        const data = await dispatch(updateComment(user.id, post_id, body, comment_id))
        setShowForm(false)
        // window.location.reload(true)

    }

    const deleteAComment = async (comment_id) => {
        let alert = window.confirm('Are you sure you want to delete your comment?')
        if (alert) {
            await dispatch(deleteComment(comment_id))
            setDeleteSwitch((prev) => !prev)
        }
    }

    const openForm = (comment) => {
        setShowForm(true)
        setBody(comment.body)
        setFormId(comment.id)

    } 

    const handleCommentLike = (comment) => async (e) => {
        const likesInComment = Object.values(commentLikes)?.filter(like => like?.comment_id == comment.id) // in this case this has comment_id and user_id
        const isCommentLiked = likesInComment?.some(like => like.user_id == user.id)
        setCommentId(comment?.id)
        if(isCommentLiked) {
            let singleCommentLike = likesInComment.find(like => like.user_id == user.id && like.comment_id == comment.id)

            await dispatch(deleteACommentLike(singleCommentLike?.id))
            setDeleteSwitch((prev) => !prev)
            setCommentLike(false)
            // window.location.reload(true)

        }
        else {
            await dispatch(createCommentLike({user_id: user.id, comment_id: comment?.id}))
            setCommentLike(true)
            // window.location.reload(true)
        }
    }

    function heartColor(commentId) {
        const likesInComment = Object.values(commentLikes)?.filter(like => like?.comment_id == commentId) // in this case this has comment_id and user_id
        const isCommentLiked = likesInComment?.some(like => like.user_id == user.id)
        // if (e.target.value.length > 0) {
        //     if (isPostLikedFunction) {
        //         e?.target?.classList?.add('liked')
        //     }
        //  else {
        //     e?.target?.classList?.remove('liked')
        // }
        return isCommentLiked
        // console.log('Q3b0M mamdam foto hila', post_id)
    }

    // console.log('{{{{{{{{{{{{{{{{{{{', commentLikes);

    return (
        <div>
            {Object.values(comments)?.map(comment => (
                <div key={comment.id}>
                    <button onClick={() => console.log('fpierjhfdwondjlwhjfewij', comment)}>Comment</button>
                    {post_id === comment.post_id && (
                        <div key={comment.id}>
                            <a className="username" href={`/users/${comment?.username}`}>{comment.username}</a>
                            <p className="comment">{comment.body}</p>
                            <div onClick={handleCommentLike(comment)} style={{ color: heartColor(comment.id) ? 'red' : 'gray' }}>
                            <FavoriteIcon></FavoriteIcon>

                            </div>
                            {user.id === comment.user_id && (
                                <div key={comment.id}>
                                    <button onClick={() => openForm(comment)}>Edit Comment</button>
    
                                    {showForm&& comment.id === formId ? 
                                    <form onSubmit={(e) => editAComment(comment.id, body, e)} key={comment.id}>
                                        <textarea value={body} onChange={(e) => setBody(e.target.value)} ></textarea>
                                        <button type="submit" onSubmit={(e) => editAComment(comment.id, body, e)} >
                                                <SendIcon></SendIcon>
                                        </button>
                                        <button onClick={(e) => { 
                                                e.preventDefault()
                                                deleteAComment(comment.id)
                                        }
                                            }>
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
