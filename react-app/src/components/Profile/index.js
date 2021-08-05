import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { getOwnPosts, getAllPosts, unloadPosts } from '../../store/post';
import { getUserInfo } from '../../store/profile'
import Grid from '@material-ui/core/Grid'
import UpdateDeletePost from '../UpdateDeletePost'
import EditProfileModal from '../Profile/EditProfileModal';
import PostUploadModal from '../../context/PostUploadModal'
import { Tooltip } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';



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

    const HtmlTooltip = withStyles((theme) => ({
        tooltip: {
            backgroundColor: 'black',
            color: 'rgba(255, 255, 255, 1)',
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
        },
    }))(Tooltip);

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
                            <h4>{profiles?.user?.username}</h4>
                        </div>
                        <div>
                            <HtmlTooltip title="Click here to change profile picture and extra information. You must change profile image to change other info.">
                                <div>
                                    {user.username === profiles?.user?.username && (
                                        <>
                                        <EditProfileModal usernameInfo={username}></EditProfileModal>
                                        
                                        </>
                                    )}


                                </div>
                            </HtmlTooltip>
                        </div>
                        <div>
                            <h4>{Object.values(profiles)?.map((profile, ind) => (
                                <div key={ind}>
                                    {Object.values(profile?.posts)?.length}
                                </div>
                            ))} posts</h4>
                        </div>
                        <div># of followers</div>
                        <div># following</div>
                    </div>
                    <div>

                    </div>
                    <hr />
                    {Object.values(profiles)?.map((profile, ind) => {
                        return (
                            <div key={ind}>
                                {Object.values(profile?.posts).map((post, ind) => (
                                    <div key={ind}>
                                        <div>

                                        <img src={post.picture_url}></img>
                                        </div>
                                        <p>{post.id}</p>
                                        <UpdateDeletePost username={username} postId={post?.id} setDeleteSwitch={setDeleteSwitch}></UpdateDeletePost>
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
