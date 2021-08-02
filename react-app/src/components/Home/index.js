import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getAllPosts } from '../../store/post';
import Feed from '../Feed'

function Home() {
    const posts = useSelector(state => state.posts)
    const dispatch = useDispatch()
    

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])


    return (
        <div>
                <div>
                    <Feed></Feed>
                </div>
        </div>
    )
}

export default Home
