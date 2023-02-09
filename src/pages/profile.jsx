import React from 'react';
import { AuthContext } from '../context/auth.context';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import Preview from '../components/preview';


const Profile = () => {
    const [extendEdit, setExtendEdit] = useState('')
    const [fieldToEdit, setFieldToEdit] = useState('')
    const [userEditInput, setUserEditInput] = useState('')
    const [reqStatus, setReqStatus] = useState('')
    const [favorites, setFavorites] = useState([])
    const navigate = useNavigate();
    const { storeToken, user, setUser, authenticateUser, logOut } = useContext(AuthContext)
    console.log(user, 'u')
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
        axios.get('http://localhost:3000/favorites/get-favorites')
            .then(res => {
                console.log(res.data, 'rd')
                const filteredFavs = res.data.filter(film => film.owner === user._id)
                setReqStatus('success')
                setFavorites(filteredFavs)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
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
            <div className='flex flex-col items-center'>
                <p className='underline m-3'>Favorites</p>
                {reqStatus === 'success' && favorites.map(film => {
                    return (
                        <Link to={'/film/' + film.id}>
                            <Preview film={film} />
                        </Link>
                    )
                })}
                {reqStatus === '' && <p>Loading...</p>}
            </div>
        </div>
    );
}

export default Profile;
