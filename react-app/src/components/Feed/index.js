import React, { useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, unloadPosts} from '../../store/post';
import Grid from '@material-ui/core/Grid'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import Comments from '../Comment'
import { getAllLikes, createPostLike, deleteAPostLike, getASingleLike, unloadPostLikes } from '../../store/postlike';
import './Feed.css'

function Feed() {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const posts = useSelector(state => state.posts)
    const postLikes = useSelector(state => state.postLikes)
    const postLikesArray = Object.values(postLikes)
    const [post_id, setPostId] = useState(0)
    const postLike2 = useSelector(state => state.postLikes.like)
    const likesInPost = Object.values(postLikes)?.filter(like => like?.post_id == post_id) // likes => postLikes has user_id, post_id
    const isPostLiked = likesInPost?.some(like => like.user_id == sessionUser.id)
    const[postLike, setPostLike] = useState(false)

    useEffect(() => {
        if (isPostLiked) {
            setPostLike(true)
        }
        else {
            setPostLike(false)
        }
        dispatch(getAllPosts());
        dispatch(getAllLikes())
        // return () => dispatch(unloadPosts(), unloadPostLikes())
    }, [dispatch, isPostLiked])


    
    const handlePostLike = (post) => async (e) => {
        const likesInPostFunction = Object.values(postLikes)?.filter(like => like?.post_id == post.id) // likes => postLikes has user_id, post_id
        const isPostLikedFunction = likesInPostFunction?.some(like => like.user_id == sessionUser.id)
        setPostId(post?.id)
        if (isPostLikedFunction) {
            let singlePostLike = likesInPostFunction.find(like => like.user_id == sessionUser.id && like.post_id == post.id)

            await dispatch(deleteAPostLike(singlePostLike?.id))
            setPostLike(false)
            // window.location.reload(true)
        }
        else {
            await dispatch(createPostLike({user_id: sessionUser.id, post_id: post?.id}))
            setPostLike(true)
        }
    }

    const info = useEffect(() => {
        dispatch(getASingleLike(sessionUser.id, post_id))
    }, [dispatch, post_id])


    console.log('####################', postLike2)
    function heartColor(postId) {
        const likesInPostFunction = Object.values(postLikes)?.filter(like => like?.post_id == postId) // likes => postLikes has user_id, post_id
        const isPostLikedFunction = likesInPostFunction?.some(like => like.user_id == sessionUser.id)
        // if (e.target.value.length > 0) {
        //     if (isPostLikedFunction) {
        //         e?.target?.classList?.add('liked')
        //     }
        //  else {
        //     e?.target?.classList?.remove('liked')
        // }
        return isPostLikedFunction
        // console.log('Q3b0M mamdam foto hila', post_id)
    }
    return (
        <div>
            <Grid container align='left'>
                <Grid item md={2}></Grid>
                <Grid item md={5}>
                    <input placeholder='This might be the search bar?'>
                        {/* Hey */}
                    </input>
                    <div className="pb-5">
                        <Grid style={{ paddingBottom: '25px' }} container align='center'>
                            <Grid item md={2} placeholder='This is here for user stories'>This is here for user stories</Grid>
                            <Grid item md={2}>This is here for user stories</Grid>
                            <Grid item md={2}>This is here for user stories</Grid>
                            <Grid item md={2}>This is here for user stories</Grid>
                            <Grid item md={2}>This is here for user stories</Grid>
                            <Grid item md={2}>This is here for user stories</Grid>

                        </Grid>
                    </div>
                    <div>
                        {Object.values(posts)?.map((post) => (
                            <div key={post.id}>
                                <button onClick={() => console.log('HACKER WIRON', postLike2)}>JONAS</button>
                                <div className="post">
                                    <div className="user-info">
                                        <img className="userphoto" style={{ width: '50px', borderRadius: '50px' }} src={post?.user?.profile_image} />
                                        <a className="username" href={`/users/${post?.user?.username}`} >{post?.user?.username}</a>
                                <button onClick={() => console.log('POSTLIKEEEEEEEEESSSSSSS', postLikesArray)}>CLICK MEEEEEEERRRR</button>
                                    </div>
                                    {/* <div> */}
                                    {/* <strong>{post?.user?.username}</strong> */}
                                    {/* <p>{post.location.city}, {post.location.state}</p> */}
                                    {/* </div> */}
                                    <div>
                                        <img className="post-img" src={post?.picture_url}></img>
                                    </div>
                                    <div className=" post-description">
                                        <div className="icons">
                                            <div onClick={handlePostLike(post)} style={{ color: heartColor(post.id) ? 'red' : 'gray'}}>
                                                <FavoriteIcon className="icon"></FavoriteIcon>

                                            </div>
                                            <div>
                                            <ChatBubbleOutlineOutlinedIcon className="icon"></ChatBubbleOutlineOutlinedIcon>

                                            </div>
                                            <div>

                                            <SendOutlinedIcon className="icon"></SendOutlinedIcon>
                                            </div>
                                        </div>
                                        <div className="comments">
                                            <p style={{ display: "block" }}> Liked by {post?.user?.username} and others </p>
                                            <div>
                                                <a className="username" href={`/users/${post?.user?.username}`}>{post?.user?.username}</a>
                                                <p className="comment">{post.description}</p>
                                            </div>
                                            <hr></hr>
                                            {}
                                <Comments post_id={post.id}></Comments>
                                            <div>
                                                {/* <label>This will be replaced with a "Comment Component"</label> */}
                                                {/* <input placeholder="Add a comment" type="text"></input> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                </Grid>
                <Grid item md={3}></Grid>
                <Grid item md={2}></Grid>

            </Grid>
        </div>
    )
}

export default Feed
