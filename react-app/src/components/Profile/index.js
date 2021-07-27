import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { getOwnPosts } from '../../store/post';



function Profile() {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const posts = useSelector(state => state.posts)
    // const id = user?.id
    const { userId } = useParams()
    
    useEffect(() => {
        dispatch(getOwnPosts(userId))
    }, [dispatch, userId])

    console.log('POOOOOOOST FOR USER', posts);
    // console.log('USERID', userId);
    // console.log('USER.ID', userId);

    return (
        <div>
            
        </div>
    )
}

export default Profile
