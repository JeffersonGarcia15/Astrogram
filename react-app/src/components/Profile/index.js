import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { getOwnPosts, getAllPosts, unloadPosts } from '../../store/post';
import { getUserInfo } from '../../store/profile'
import Grid from '@material-ui/core/Grid'
import UpdateDeletePost from '../UpdateDeletePost'
import EditProfileModal from '../Profile/EditProfileModal';
import PostUploadModal from '../../context/PostUploadModal'


function Profile() {
    const history = useHistory()
    const dispatch = useDispatch()
    // const { userId } = useParams()
    const user = useSelector(state => state.session.user)
    const { username } = useParams()
    const userId = useSelector((state) => { if (state.session.user) return state.session.user.id })
    const posts = useSelector(state => state.posts)
    const postInfo = Object.values(posts)
    const filter = postInfo.filter(post => post.user_id == user.id)
    const profiles = useSelector(state => state.profile)
    const profileArray = Object.values(profiles)
    const lengthPosts = profileArray['0']
    const [deleteSwitch, setDeleteSwitch] = useState(false)
    // const lengthPostsArray = lengthPosts['posts']
    // const arrayOfPosts = Object.values(lengthPostsArray)

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch, deleteSwitch])

    useEffect(() => {
        dispatch(getAllPosts())
        dispatch(getUserInfo(username))
        return () => dispatch(unloadPosts())
    }, [dispatch, username])

    // useEffect(() => {
    // }, [dispatch, username])

    console.log('HERE IS THE USERNAME SPECIFIED', profiles)
    // console.log('HERE IS THE ARRAY THING', filter)
    // console.log('lengthththththt', lengthPosts)



    return (
        <div>
            <Grid container align="center">
                <Grid item md={3}></Grid>
                <Grid item md={6}>
                    <div className="w-1/12 rounded-full">
                        <img src={profiles?.user?.profile_image} className="rounded-full" />
                    </div>
                    <div className="flex space-x-4">
                        <div>
                            <p>{profiles?.user?.username}</p>
                        </div>
                        <div>
                            <EditProfileModal></EditProfileModal>
                        </div>
                        <div>
                            <p>{Object.values(profiles)?.map(profile => (
                                <div>
                                    {Object.values(profile?.posts)?.length}
                                </div>
                            ))} posts</p>
                        </div>
                        <div># of followers</div>
                        <div># following</div>
                    </div>
                    <div>

                    </div>
                    <hr />
                    {Object.values(profiles)?.map(profile => {
                        return (
                            <div>
                                {Object.values(profile?.posts).map(post => (
                                    <div>
                                        <div>

                                        <img src={post.picture_url}></img>
                                        </div>
                                        <p>{post.id}</p>
                                        <UpdateDeletePost username={username} postId={post?.id} setDeleteSwitch={setDeleteSwitch}></UpdateDeletePost>
                                        <button onClick={() => console.log('HEEEEEEYY$$$$$$$$', post?.id)}>HEY THERE CLICK</button>
                                    </div>
                                ))}

                                <div >
                                    {/* {profile?.user_id == userId && ( */}
                                        {/* <div key={profile?.id}> */}
                                            {/* <div>
                                                <img src={post?.picture_url} />
                                            </div>
                                            <UpdateDeletePost postId={post?.id}></UpdateDeletePost> */}
                                        {/* </div> */}
                                    {/* )} */}
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
