import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { getOwnPosts, getAllPosts } from '../../store/post';
import Grid from '@material-ui/core/Grid'
import UpdateDeletePost from '../UpdateDeletePost'


function Profile() {
    const history = useHistory()
    const dispatch = useDispatch()
    // const { userId } = useParams()
    const user = useSelector(state => state.session.user)
    const userId = useSelector((state) => { if (state.session.user) return state.session.user.id })
    const posts = useSelector(state => state.posts)
    const postInfo = Object.values(posts)
    const filter = postInfo.filter(post => post.user_id == user.id)

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])


    return (
        <div>
            <Grid container align="center">
                <Grid item md={3}></Grid>
                <Grid item md={6}>
                    <div className="w-1/12 rounded-full">
                        <img src={user.profile_image} className="rounded-full" />
                    </div>
                    <div className="flex space-x-4">
                        <div>
                            <p>{user.username}</p>
                        </div>
                        <div>
                            <p>{filter.length} posts</p>
                        </div>
                        <div># of followers</div>
                        <div># following</div>
                    </div>
                    <div>

                    </div>
                    <hr />
                    {Object.values(posts)?.map(post => {
                        return (
                            <div>

                                <div key={post?.id}>
                                    {post.user_id == userId && (
                                        <div key={post?.id}>
                                            <div>
                                                <img src={post.picture_url} />
                                            </div>
                                            <UpdateDeletePost postId={post.id}></UpdateDeletePost>
                                        </div>
                                    )}
                                </div>

                            </div>
                        )
                    })}
                </Grid>
                <Grid item md={3}></Grid>
            </Grid>
        </div>
    )
}

export default Profile
