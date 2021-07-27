import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { createPost } from '../../store/post'

function PhotoUpload() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [description, setDescription] = useState('')
    const [picture_url, setPictureUrl] = useState(null)
    const [showMenu, setShowMenu] = useState(false)

    


    return (
        <div>
            
        </div>
    )
}

export default PhotoUpload
