import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { getOwnPosts, getAllPosts } from '../../store/post';
import Grid from '@material-ui/core/Grid'



function Profile() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { userId } = useParams()
    const user = useSelector(state => state.session.user)
    const posts = useSelector(state => state.posts)
    const postInfo = Object.values(posts)

    // useEffect(() => {
    //     dispatch(getOwnPosts(userId))
    // }, [dispatch, userId])
    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    console.log('POOOOOOOST FOR USER', posts);
    console.log('postInfo#############', postInfo);
    console.log('MAYBE USE USER?', user);

    return (
        <div>
            <Grid container align="center">
                <Grid item md={3}></Grid>
                <Grid item md={6}>
                    <div>
                        <img src={user.profile_image} />
                    </div>
                    {Object.values(posts)?.map(post => {
                        return (
                        // <div key={post?.id}>
                        //     <img src={post?.user.profile_image} />
                        // </div>
                        <>
                            {post.user.id == userId && (
                                <div key={post?.id}>
                                    <div>
                                        {/* <img src={post?.user.profile_image} /> */}
                                    </div>
                                </div>
                            )}
                        
                        </>
                        )
                })}
                </Grid>
                <Grid item md={3}></Grid>
            </Grid>
        </div>
    )
}

export default Profile
