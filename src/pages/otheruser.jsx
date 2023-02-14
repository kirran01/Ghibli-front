import React from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { useState, useEffect, useContext } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import Preview from '../components/preview';
import Comment from '../components/comment';
import axios from 'axios';



const Otheruser = () => {
    const { userId } = useParams()
    const [showing, setShowing] = useState('favorites')
    const [extendEdit, setExtendEdit] = useState('')
    const [reqStatus, setReqStatus] = useState('')
    const [favorites, setFavorites] = useState([])
    const [userComments, setUserComments] = useState([])
    const [user, setUser] = useState()
    // const { storeToken, user, setUser, authenticateUser, logOut } = useContext(AuthContext)
    useEffect(() => {
        if (user) {
            axios.get(`${import.meta.env.VITE_API_URL}/favorites/get-favorites`)
                .then(res => {
                    const filteredFavs = res.data.filter(film => film.owner._id === userId)
                    setReqStatus('success')
                    setFavorites(filteredFavs)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [user])
    useEffect(() => {
        if (user) {
            const fetchComments = async () => {
                try {
                    const res = await axios.get(`${import.meta.env.VITE_API_URL}/comments/all-comments`)
                    let allComments = res.data
                    let filteredComments = allComments.filter(oneComment => oneComment.owner._id === userId)
                    console.log(filteredComments, 'fc')
                    setUserComments(filteredComments)
                } catch (err) {
                    console.log(err)
                }
            }
            fetchComments()
        }
    }, [user])
    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/get-another-user/${userId}`)
                setUser(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getUserInfo()
    }, [])
    return (
        <div className='bg-cyan-50 flex flex-col items-center'>
            {user && user.profileImage ?
                <img className='w-16 h-16 rounded-full m-5' src={user.profileImage} alt="profilepic" />
                :
                <AccountCircleIcon sx={{ fontSize: 80 }} />
            }
            {user && <p className='text-2xl m-2'>@{user.username}</p>}
            {extendEdit === 'open' &&
                <div className='flex'>
                    <button className='p-2 bg-red-400 m-2 rounded-lg text-white hover:bg-red-500' variant="outlined" onClick={deleteUser}>Delete</button>
                    <button className='p-2 bg-cyan-300 m-2 rounded-lg text-white hover:bg-cyan-200' onClick={() => {
                        setExtendEdit('open-input')
                        setFieldToEdit('profileImage')
                    }}>Picture
                    </button>
                    <button className='p-2 bg-cyan-300 m-2 rounded-lg text-white hover:bg-cyan-200' onClick={() => {
                        setExtendEdit('open-input')
                        setFieldToEdit('username')
                    }}>Username
                    </button>
                    <button className='p-2 bg-cyan-300 m-2 rounded-lg text-white hover:bg-cyan-200' onClick={() => {
                        setExtendEdit('open-input')
                        setFieldToEdit('email')
                    }}>Email
                    </button>
                    <div className='flex items-center'>
                        <ClearIcon style={{ cursor: 'pointer' }} onClick={() => { setExtendEdit('') }} />
                    </div>
                </div>
            }
            <div>
                <button onClick={() => { setShowing('favorites') }} className='underline m-3'>Favorites</button>
                <button onClick={() => { setShowing('comments') }} className='underline m-3'>Comments</button>
            </div>
            {showing === 'favorites' && <div className='flex flex-col flex-wrap lg:flex-row md:flex-row justify-center items-center'>
                {reqStatus === 'success' && favorites.map(film => {
                    return (
                        <Link to={'/film/' + film.showId}>
                            <Preview film={film} />
                        </Link>
                    )
                })}
                {reqStatus === '' && <p>Loading...</p>}
            </div>}
            <div>
                {showing === 'comments' && userComments.map(comment => {
                    return (
                        <Comment comment={comment} />
                    )
                })}
            </div>
            <footer className='m-5'>
                Ghibli Archive By Kirran Kirpalani
            </footer>
        </div>
    );
}

export default Otheruser;
