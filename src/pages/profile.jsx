import React from 'react';
import { AuthContext } from '../context/auth.context';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Comment from '../components/comment';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import Preview from '../components/preview';


const Profile = () => {
    const [showing, setShowing] = useState('favorites')
    const [extendEdit, setExtendEdit] = useState('')
    const [fieldToEdit, setFieldToEdit] = useState('')
    const [userEditInput, setUserEditInput] = useState('')
    const [reqStatus, setReqStatus] = useState('')
    const [favorites, setFavorites] = useState([])
    const [userComments, setUserComments] = useState([])
    const navigate = useNavigate();
    const { storeToken, user, setUser, authenticateUser, logOut } = useContext(AuthContext)
    console.log(user,'u')
    const updateUser = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit-user', {
            [fieldToEdit]: userEditInput
        },
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            .then(res => {
                console.log(res.data)
                setUser(res.data.updatedUser)
                setExtendEdit('')
                setUserEditInput('')
                setFieldToEdit('')
            })
            .catch(err => {
                console.log(err)
            })
    }
    const deleteUser = (e) => {
        e.preventDefault()
        console.log('deleteUser')
    }
    useEffect(() => {
        if (user) {
            axios.get('http://localhost:3000/favorites/get-favorites')
                .then(res => {
                    const filteredFavs = res.data.filter(film => film.owner._id === user._id)
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
                    const res = await axios.get('http://localhost:3000/comments/all-comments')
                    let allComments = res.data
                    let filteredComments = allComments.filter(oneComment => oneComment.owner._id === user._id)
                    setUserComments(filteredComments)
                    
                    console.log(filteredComments,'fc')
                } catch (err) {
                    console.log(err)
                }
            }
            fetchComments()
        }
    }, [user])
    return (
        <div className='bg-cyan-50 flex flex-col items-center'>
            {user && user.profileImage ?
                <img className='w-16 h-16 rounded-full m-5' src={user.profileImage} alt="profilepic" />
                :
                <AccountCircleIcon sx={{ fontSize: 80 }} />
            }
            {user && <p className='text-2xl m-2'>@{user.username}</p>}
            {extendEdit === '' && <button className='p-2 bg-cyan-300 m-2 rounded-lg text-white hover:bg-cyan-200' onClick={() => { setExtendEdit('open') }}>Edit Profile</button>}
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
            {extendEdit === 'open-input' &&
                <form className='flex'>
                    <input value={userEditInput} onChange={(e) => { setUserEditInput(e.target.value) }} className='m-5 border-2 rounded-md' type="text" />
                    <button onClick={updateUser} className='p-2 bg-cyan-300 m-2 rounded-lg text-white hover:bg-cyan-200' type="">Submit</button>
                    <div className='flex items-center'>
                        <ClearIcon style={{ cursor: 'pointer' }} onClick={() => { setExtendEdit('') }} />
                    </div>
                </form>
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
                {userComments.map(comment => {
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

export default Profile;
