import React, { useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../store/post';
import Grid from '@material-ui/core/Grid'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import Comments from '../Comment'
import './Feed.css'

function Feed() {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const posts = useSelector(state => state.posts)

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])


    return (
        <div>
            <Grid container align='left'>
                <Grid item md={2}>Hi</Grid>
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
                                <button onClick={() => console.log('AQUI POST', post)}>CLICK</button>
                                <div className="post">
                                    <div className="user-info">
                                        <img className="userphoto" style={{ width: '50px', borderRadius: '50px' }} src={post?.user?.profile_image} />
                                        <a className="username" href={`/users/${user.id}`} >{post?.user?.username}</a>
                                    </div>
                                    {/* <div> */}
                                    {/* <strong>{post?.user?.username}</strong> */}
                                    {/* <p>{post.location.city}, {post.location.state}</p> */}
                                    {/* </div> */}
                                    <div>
                                        <img className="post-img" src={post?.picture_url}></img>
                                    </div>
                                    <div className="bg-white post-description">
                                        <div className="icons">
                                            <FavoriteBorderOutlinedIcon className="icon"></FavoriteBorderOutlinedIcon>
                                            <ChatBubbleOutlineOutlinedIcon className="icon"></ChatBubbleOutlineOutlinedIcon>
                                            <SendOutlinedIcon className="icon"></SendOutlinedIcon>
                                        </div>
                                        <div className="comments">
                                            <p style={{ display: "block" }}> Liked by {post?.user?.username} and others </p>
                                            <div>
                                                <a className="username" href={`/users/${user.id}`}>{post?.user?.username}</a>
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
                <Grid item md={3}>Yo</Grid>
                <Grid item md={2}>HEEHHEE</Grid>

            </Grid>
        </div>
    )
}

export default Feed
