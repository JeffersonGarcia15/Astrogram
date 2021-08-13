import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllPosts} from '../../store/post';
import Grid from '@material-ui/core/Grid'
import FavoriteIcon from '@material-ui/icons/Favorite';
// import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
// import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import Comments from '../Comment'
import { getAllLikes, createPostLike, deleteAPostLike, getASingleLike } from '../../store/postlike';
import './Feed.css'

function Feed() {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const posts = useSelector(state => state.posts)
    const postLikes = useSelector(state => state.postLikes)
    const [post_id, setPostId] = useState(0)
    const likesInPost = Object.values(postLikes)?.filter(like => like?.post_id === post_id) // likes => postLikes has user_id, post_id
    const isPostLiked = likesInPost?.some(like => like.user_id === sessionUser.id)
    const[setPostLike] = useState(false)
    const [deleteSwitch, setDeleteSwitch] = useState(false)

    useEffect(() => {

        dispatch(getAllPosts());
        dispatch(getAllLikes());
    }, [dispatch, isPostLiked, deleteSwitch, setPostLike])



    const handlePostLike = (post) => async (e) => {
        const likesInPostFunction = Object.values(postLikes)?.filter(like => like?.post_id === post.id) // likes => postLikes has user_id, post_id
        const isPostLikedFunction = likesInPostFunction?.some(like => like.user_id === sessionUser.id)
        setPostId(post?.id)
        if (isPostLikedFunction) {
            let singlePostLike = likesInPostFunction.find(like => like.user_id === sessionUser.id && like.post_id === post.id)

            await dispatch(deleteAPostLike(singlePostLike?.id))
            setDeleteSwitch((prev) => !prev)
        }
        else {
            await dispatch(createPostLike({user_id: sessionUser.id, post_id: post?.id}))
        }
    }

    useEffect(() => {
        dispatch(getASingleLike(sessionUser.id, post_id))
    }, [dispatch, post_id, sessionUser?.id])


    function heartColor(postId) {
        const likesInPostFunction = Object.values(postLikes)?.filter(like => like?.post_id === postId) // likes => postLikes has user_id, post_id
        const isPostLikedFunction = likesInPostFunction?.some(like => like.user_id === sessionUser.id)

        return isPostLikedFunction
    }
    return (
        <div>
            <Grid container align='left'>
                <Grid item md={2}></Grid>
                <Grid item md={5}>
                    <div className="pb-5">
                        <Grid style={{ paddingBottom: '25px' }} container align='center'>

                        </Grid>
                    </div>
                    <div>
                        {Object.values(posts)?.map((post) => (
                            <div key={post.id}>
                                <div className="post">
                                    <div className="user-info">
                                        <img className="userphoto" alt='' src={post?.user?.profile_image} />
                                        <div className="username" onClick={e => { e.preventDefault(); history.push(`/users/${post?.user?.username}`)}} >{post?.user?.username}</div>
                                    </div>
             
                                    <div>
                                        <img className="post-img" alt='' src={post?.picture_url}></img>
                                    </div>
                                    <div className=" post-description">
                                        <div className="icons">
                                            <FavoriteIcon onClick={handlePostLike(post)} style={{ color: heartColor(post.id) ? 'red' : 'gray', cursor: 'pointer' }} className="icon"></FavoriteIcon>

                                          
                                            {/* <ChatBubbleOutlineOutlinedIcon className="icon"></ChatBubbleOutlineOutlinedIcon> */}

                                            {/* <SendOutlinedIcon className="icon"></SendOutlinedIcon> */}
                                        </div>
                                        <div className="comments">
                                            <div>
                                                <a className="username" onClick={e => { e.preventDefault(); history.push(`/users/${post?.user?.username}`)}} href={`/users/${post?.user?.username}`}>{post?.user?.username}</a>
                                                <p className="comment">{post.description}</p>
                                            </div>
                                            <hr></hr>
                                            {}
                                <Comments post_id={post.id}></Comments>
                                
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )).reverse()}
                    </div>
                    
                </Grid>
                <Grid item md={3}></Grid>
                <Grid item md={2}></Grid>

            </Grid>
        </div>
    )
}

export default Feed
