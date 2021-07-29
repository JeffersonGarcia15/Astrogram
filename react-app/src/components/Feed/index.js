import React, { useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../store/post';
import Grid from '@material-ui/core/Grid'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import Comments from '../Comment'
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
            <Grid container align='center'>
                <Grid item md={2}>Hi</Grid>
                <Grid item md={5}>
                    <input placeholder='This might be the search bar?'>
                        {/* Hey */}
                    </input>
                    <div className="pb-5">
                        <Grid  style={{paddingBottom: '25px' }} container align='center'>
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
                                {/* <button onClick={() => console.log('AQUI POST', post)}>CLICK</button> */}
                                <div>
                                    <div>
                                        <img style={{width: '50px', borderRadius: '50px'}} src={post?.user?.profile_image} />
                                    </div>
                                    <div>
                                        <strong>{post?.user?.username}</strong>
                                        {/* <p>{post.location.city}, {post.location.state}</p> */}
                                    </div>
                                    <div>
                                        <img src={post?.picture_url}></img>
                                    </div>
                                    <div className="bg-white">
                                        <div>
                                            <FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon>
                                            <ChatBubbleOutlineOutlinedIcon></ChatBubbleOutlineOutlinedIcon>
                                            <SendOutlinedIcon></SendOutlinedIcon>
                                        </div>
                                        <div>
                                            Liked by {post?.user?.username} and others
                                        </div>
                                        <div>
                                            <strong>{post?.user?.username}</strong> {post.description}
                                        </div>
                                        <hr></hr>
                                        <div>
                                            {/* <label>This will be replaced with a "Comment Component"</label> */}
                                            <Comments post_id={post.id}></Comments>
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
