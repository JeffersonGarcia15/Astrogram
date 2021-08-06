import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { getOwnPosts, getAllPosts, unloadPosts } from '../../store/post';
import { getUserInfo } from '../../store/profile'
import { createFollower, deleteFollower } from '../../store/follow';
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
    const followers = useSelector(state => state.followers)
    const [deleteSwitch, setDeleteSwitch] = useState(false)
    const [follower_id, setFollowerId] = useState(user?.id)
    const [followed_id, setFollowedId] = useState(profiles?.user?.id) //person in profile meaning getUserInfo
    const [following, setFollowing] = useState("Follow")
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
    }, [dispatch, username, followers])

    



    useEffect(() => {
        if (profiles?.user?.followers && profiles?.user?.followers?.includes(user?.username)) {
            setFollowing("Unfollow")
        }
    }, [user, user?.username])

    async function followButton() {
        await dispatch(createFollower( follower_id, profiles?.user?.id))
        following === "Unfollow" ? setFollowing("Follow") : setFollowing("Unfollow")
    }

    async function unFollowButton() {
        await dispatch(deleteFollower( follower_id, profiles?.user?.id))
        // following === "Unfollow" ? setFollowing("Follow") : setFollowing("Unfollow")
    }
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
                                    {Object?.values(profile?.posts)?.length}
                                </div>
                            ))} posts</h4>
                            {user?.id !== profiles?.user?.id && (
                                <div>
                                    <button onClick={followButton} >{following}</button>
                                    <button onClick={unFollowButton} >unfollow</button>

                                </div>
                            )}

                        </div>
                        {/* <div>{Object.values(followers)?.map(follower => (
                            <div>
                                {follower.followers.length} followers
                            </div>
                        ))} </div> */}

                        <div>{profiles?.user?.followers?.length} followers</div>

                        <div>{profiles?.user?.following?.length} following</div>

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
