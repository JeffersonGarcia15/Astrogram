import React, { useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../store/post';
import Grid from '@material-ui/core/Grid'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
function Feed() {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const posts = useSelector(state => state.posts)

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    console.log('THis is the user info', user);
    console.log('THis is the posttttttssss', posts);
    return (
        <div>
            <Grid container align='center'>
                <Grid item md={2}>Hi</Grid>
                <Grid item md={5}>
                    <input className="bg-gray-200 focus:bg-red-300 md:bg-yellow-200 md:focus:bg-green-300">
                        {/* Hey */}
                    </input>
                    <div className="pb-5">
                        <Grid style={{backgroundColor: 'red', paddingTop: '25px', paddingBottom: '25px'}} container align='center'>
                            <Grid item md={2}>Hi</Grid>
                            <Grid item md={2}>Hi</Grid>
                            <Grid item md={2}>Hi</Grid>
                            <Grid item md={2}>Hi</Grid>
                            <Grid item md={2}>Hi</Grid>
                            <Grid item md={2}>Hi</Grid>

                        </Grid>
                    </div>
                    <div>
                        {Object.values(posts)?.map((post) => (
                            <div key={post.id}>
                                {/* <button onClick={() => console.log('AQUI POST', post)}>CLICK</button> */}
                                <div>
                                    <div>
                                        <img src={post.user.profile_image} />
                                    </div>
                                    <div>
                                        <strong>{post.user.username}</strong>
                                        <p>{post.location.city}, {post.location.state}</p>
                                    </div>
                                    <div>
                                        <img src={post.picture_url}></img>
                                    </div>
                                    <div className="bg-white">
                                        <div>
                                            <FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon>
                                            <ChatBubbleOutlineOutlinedIcon></ChatBubbleOutlineOutlinedIcon>
                                            <SendOutlinedIcon></SendOutlinedIcon>
                                        </div>
                                        <div>
                                            Liked by {post.user.username} and others
                                        </div>
                                        <div>
                                            <strong>{post.user.username}</strong> {post.description}
                                        </div>
                                        <div className="text-gray-300">
                                            View all 21 comments
                                        </div>
                                        <div>
                                            <p>Comments will go here</p>
                                        </div>
                                        <div>
                                            <p>Just realized I forgot the created at...</p>
                                        </div>
                                        <hr></hr>
                                        <div>
                                            <label>This will be replaced with a "Comment Component"</label>
                                            <input placeholder="Add a comment" type="text"></input>
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
