import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllPosts, unloadPosts } from "../../store/post";
import { getUserInfo } from "../../store/profile";
import { createFollower, deleteFollower } from "../../store/follow";
import Grid from "@material-ui/core/Grid";
import UpdateDeleteModal from "../UpdateDeletePost/UpdateDeleteModal";
import EditProfileModal from "../Profile/EditProfileModal";
import { Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import "./Profile.css";

function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const { username } = useParams();
    const posts = useSelector((state) => state.posts);
    const userPosts = Object.values(posts)?.filter(
        (post) => username === post?.user?.username
    );
    const profiles = useSelector((state) => state.profile);
    const followers = useSelector((state) => state.followers);
    const [deleteSwitch, setDeleteSwitch] = useState(false);
    const [follower_id] = useState(user?.id);


    let Following = (profiles?.user?.followers?.includes(user?.username) ? true : false);



    const HtmlTooltip = withStyles((theme) => ({
        tooltip: {
            backgroundColor: "black",
            color: "rgba(255, 255, 255, 1)",
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(12),
            border: "1px solid #dadde9",
        },
    }))(Tooltip);

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch, deleteSwitch]);

    useEffect(() => {
        dispatch(getAllPosts());
        dispatch(getUserInfo(username));
        return () => dispatch(unloadPosts());
    }, [dispatch, username, followers]);

    // useEffect(() => {
    //     if (
    //         profiles?.user?.followers &&
    //         profiles?.user?.followers?.includes(user?.username)
    //     ) {
    //         Following = true;

    //     }
    // }, [user, user?.username]);

    async function followButton() {
        if (Following === false) {
            await dispatch(createFollower(follower_id, profiles?.user?.id));
            Following = true;
        } else {
            await dispatch(deleteFollower(follower_id, profiles?.user?.id));
            Following = false;
        }
    }

    const GalleryExist = (
        <div className="gallery">
            {userPosts?.map((post, ind) => (
                <div className="img-gallery" key={ind}>
                    {user?.id === post.user_id && (
                        <UpdateDeleteModal
                            username={username}
                            postId={post?.id}
                            setDeleteSwitch={setDeleteSwitch}
                        ></UpdateDeleteModal>
                    )}
                    <img src={post.picture_url} alt=''></img>
                </div>
            )).reverse()}
        </div>
    )


    const GalleryNoExist = (
        <h1>No posts yet</h1>
    );


    return (
        <div>
            <Grid container align="center">
                <Grid item md={3}></Grid>
                <Grid item md={6}>
                    <div className="profile-container">
                        <div className="s1">
                            <img src={profiles?.user?.profile_image} alt='' />
                            <div className="info-profile">
                                <div className="s1-profile">
                                    <h4 className="username2">{profiles?.user?.username}</h4>
                                    <HtmlTooltip title="Please be respectful when choosing a profile picture.">
                                        <div>
                                            {user.username === profiles?.user?.username && (
                                                <>
                                                    <EditProfileModal
                                                        usernameInfo={username}
                                                    ></EditProfileModal>
                                                </>
                                            )}
                                        </div>
                                    </HtmlTooltip>
                                    {user?.id !== profiles?.user?.id && (
                                        <div>
                                            <button
                                                className={Following ? 'btn-unfollow' : 'btn-follow'}
                                                onClick={followButton}>{Following ? 'Unfollow' : 'Follow'}</button>
                                        </div>
                                    )}
                                </div>
                                <div className="s2-profile">
                                    <h4>{userPosts?.length} posts</h4>
                                    <h4>{profiles?.user?.followers?.length} followers</h4>

                                    <h4>{profiles?.user?.following?.length} following</h4>
                                </div>
                            </div>
                        </div>

                        <div className="m-line"></div>

                        <div className="s2">
                            {userPosts?.length > 0 ? GalleryExist : GalleryNoExist}
                        </div>
                    </div>
                </Grid>
                <Grid item md={3}></Grid>
            </Grid>
        </div>
    );
}

export default Profile;
