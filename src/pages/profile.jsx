import React from 'react';
import { AuthContext } from '../context/auth.context';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const Profile = () => {
    const [extendEdit, setExtendEdit] = useState('')
    const navigate = useNavigate();
    const { storeToken, user, setUser, authenticateUser, logOut } = useContext(AuthContext)
    return (
        <div className='bg-cyan-50 flex flex-col items-center'>
            <img className='w-16 h-16 rounded-full m-5' src="https://images.pexels.com/photos/15465414/pexels-photo-15465414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="profilepic" />
            {user && <p className='text-2xl m-2'>@{user.username}</p>}
            {extendEdit === '' && <button onClick={() => { setExtendEdit('open') }} className='p-2 bg-cyan-300 m-2 rounded-lg text-white'>Edit Profile</button>}
            {extendEdit === 'open' && <>
                <div className='flex'>
                    <button className='p-2 bg-red-700 m-2 rounded-lg text-white'>Delete</button>
                    <button className='p-2 bg-cyan-300 m-2 rounded-lg text-white'>Picture</button>
                    <button className='p-2 bg-cyan-300 m-2 rounded-lg text-white'>Username</button>
                    <button className='p-2 bg-cyan-300 m-2 rounded-lg text-white'>Email</button>
                    <button className='p-2 bg-cyan-100 m-2 rounded-lg text-white' onClick={()=>{setExtendEdit('')}}>X</button>
                </div>
            </>}
        </div>
    );
}

export default Profile;
