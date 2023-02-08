import React from 'react';
import { AuthContext } from '../context/auth.context';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';


const Profile = () => {
    const [extendEdit, setExtendEdit] = useState('')
    const [fieldToEdit, setFieldToEdit] = useState('')
    const [userEditInput, setUserEditInput] = useState('')
    console.log(userEditInput, 'uei')
    console.log(fieldToEdit, 'fte')
    const navigate = useNavigate();
    const { storeToken, user, setUser, authenticateUser, logOut } = useContext(AuthContext)
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
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className='bg-cyan-50 flex flex-col items-center'>
            <img className='w-16 h-16 rounded-full m-5' src="https://images.pexels.com/photos/15465414/pexels-photo-15465414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="profilepic" />
            {user && <p className='text-2xl m-2'>@{user.username}</p>}
            {extendEdit === '' && <button className='p-2 bg-cyan-300 m-2 rounded-lg text-white hover:bg-cyan-200' onClick={() => { setExtendEdit('open') }}>Edit Profile</button>}
            {extendEdit === 'open' &&
                <div className='flex'>
                    <button className='p-2 bg-red-400 m-2 rounded-lg text-white hover:bg-cyan-200' variant="outlined">Delete</button>
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
        </div>
    );
}

export default Profile;
